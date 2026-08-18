import { Request, Response } from 'express';
import { PoolConnection, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { getPool } from '../config/db.js';
import { resolveCategoryId } from './categoryController.js';
import { FormattedProduct, Variant, SizeWithStock, ProductPayload } from '../types/index.js';

// 1. Obtener todos los productos formateados para el catálogo
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [products] = await getPool().query<RowDataPacket[]>(`
      SELECT p.*, c.name as category_name, c.gender as category_gender
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    const fullProducts: FormattedProduct[] = await Promise.all(
      products.map(async (prod): Promise<FormattedProduct> => {
        const [variants] = await getPool().query<RowDataPacket[]>(
          'SELECT * FROM product_variants WHERE product_id = ?',
          [prod.id]
        );

        const fullVariants: Variant[] = await Promise.all(
          variants.map(async (v): Promise<Variant> => {
            const [images] = await getPool().query<RowDataPacket[]>(
              'SELECT image_url FROM variant_images WHERE variant_id = ? ORDER BY sort_order',
              [v.id]
            );
            const [sizes] = await getPool().query<RowDataPacket[]>(
              'SELECT size, stock FROM variant_sizes_stock WHERE variant_id = ?',
              [v.id]
            );

            const variantImages = images.map((img) => img.image_url as string);
            return {
              id: v.id.toString(),
              type: v.type,
              name: v.name,
              hex: v.hex || '',
              patternImage: v.pattern_image || '',
              variantImage: variantImages[0] || v.variant_image || '',
              variantImages: variantImages.length > 0 ? variantImages : [v.variant_image].filter(Boolean),
              sizesWithStock: sizes.map((s) => ({ size: s.size, stock: s.stock })),
            };
          })
        );

        const [prodImages] = await getPool().query<RowDataPacket[]>(
          'SELECT image_url FROM product_images WHERE product_id = ? ORDER BY sort_order',
          [prod.id]
        );

        const imagesList = prodImages.map((img) => img.image_url as string);

        return {
          id: prod.id.toString(),
          sku: prod.sku,
          name: prod.name,
          productType: prod.product_type,
          price: Number(prod.price),
          originalPrice: prod.original_price ? Number(prod.original_price) : null,
          stock: prod.stock,
          badge: prod.badge,
          description: prod.description,
          category: prod.category_name ? `${prod.category_gender} / ${prod.category_name}` : 'Mujer / Lencería de Seda',
          subCategory: prod.category_name || '',
          gender: prod.category_gender || 'Mujer',
          image: imagesList[0] || fullVariants[0]?.variantImages?.[0] || fullVariants[0]?.variantImage || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop',
          images: imagesList.length > 0 ? imagesList : [fullVariants[0]?.variantImages?.[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop'],
          variants: fullVariants,
          availableSizes: prod.product_type === 'simple'
            ? ['Única']
            : Array.from(new Set(fullVariants.flatMap(v => v.sizesWithStock?.map(s => s.size) || []))),
          availableColors: fullVariants.map(v => ({
            id: v.name,
            name: v.name,
            type: v.type,
            hex: v.hex,
            patternImage: v.patternImage,
            variantImage: v.variantImage,
            variantImages: v.variantImages
          }))
        };
      })
    );

    res.json(fullProducts);
  } catch (err: any) {
    console.error('[GET /api/products ERROR]:', err);
    res.status(500).json({ error: err.message });
  }
};

// 2. Crear Producto
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  let connection: PoolConnection | undefined;
  try {
    connection = await getPool().getConnection();
    await connection.beginTransaction();

    const { sku, name, category, price, originalPrice, stock, productType, description, badge, variants, images } = req.body as ProductPayload;
    const categoryId = await resolveCategoryId(connection, category);

    const [prodResult] = await connection.query<ResultSetHeader>(
      `INSERT INTO products (sku, name, category_id, product_type, price, original_price, stock, description, badge)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sku || `KAR-${Date.now().toString().slice(-4)}`,
        name,
        categoryId,
        productType || 'variants',
        price,
        originalPrice || null,
        stock || 0,
        description || '',
        badge || 'Nuevo',
      ]
    );

    const productId = prodResult.insertId;

    // Guardar Variantes
    if (productType === 'variants' && Array.isArray(variants)) {
      for (const v of variants) {
        const [varResult] = await connection.query<ResultSetHeader>(
          `INSERT INTO product_variants (product_id, type, name, hex, pattern_image, variant_image)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [productId, v.type || 'color', v.name, v.hex || '', v.patternImage || '', v.variantImage || '']
        );
        const variantId = varResult.insertId;

        const varImgs = v.variantImages || [v.variantImage].filter((img): img is string => Boolean(img));
        for (let idx = 0; idx < varImgs.length; idx++) {
          await connection.query(
            'INSERT INTO variant_images (variant_id, image_url, sort_order) VALUES (?, ?, ?)',
            [variantId, varImgs[idx], idx]
          );
        }

        if (Array.isArray(v.sizesWithStock)) {
          for (const s of v.sizesWithStock) {
            await connection.query(
              'INSERT INTO variant_sizes_stock (variant_id, size, stock) VALUES (?, ?, ?)',
              [variantId, s.size, s.stock]
            );
          }
        }
      }
    }

    // Guardar imágenes generales del producto
    if (Array.isArray(images)) {
      for (let idx = 0; idx < images.length; idx++) {
        await connection.query(
          'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
          [productId, images[idx], idx]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ id: productId.toString(), message: 'Producto creado con éxito' });
  } catch (err: any) {
    if (connection) await connection.rollback();
    console.error('[POST /api/products ERROR]:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) connection.release();
  }
};

// 3. Actualizar Producto
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  let connection: PoolConnection | undefined;
  try {
    const { id } = req.params;
    connection = await getPool().getConnection();
    await connection.beginTransaction();

    const { sku, name, category, price, originalPrice, stock, productType, description, badge, variants, images } = req.body as ProductPayload;
    const categoryId = await resolveCategoryId(connection, category);

    await connection.query(
      `UPDATE products SET sku=?, name=?, category_id=?, product_type=?, price=?, original_price=?, stock=?, description=?, badge=? WHERE id=?`,
      [sku, name, categoryId, productType || 'variants', price, originalPrice || null, stock || 0, description || '', badge || 'Nuevo', id]
    );

    // Limpiar variantes e imágenes previas
    await connection.query('DELETE FROM product_variants WHERE product_id = ?', [id]);
    await connection.query('DELETE FROM product_images WHERE product_id = ?', [id]);

    if (productType === 'variants' && Array.isArray(variants)) {
      for (const v of variants) {
        const [varResult] = await connection.query<ResultSetHeader>(
          `INSERT INTO product_variants (product_id, type, name, hex, pattern_image, variant_image)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [id, v.type || 'color', v.name, v.hex || '', v.patternImage || '', v.variantImage || '']
        );
        const variantId = varResult.insertId;

        const varImgs = v.variantImages || [v.variantImage].filter((img): img is string => Boolean(img));
        for (let idx = 0; idx < varImgs.length; idx++) {
          await connection.query(
            'INSERT INTO variant_images (variant_id, image_url, sort_order) VALUES (?, ?, ?)',
            [variantId, varImgs[idx], idx]
          );
        }

        if (Array.isArray(v.sizesWithStock)) {
          for (const s of v.sizesWithStock) {
            await connection.query(
              'INSERT INTO variant_sizes_stock (variant_id, size, stock) VALUES (?, ?, ?)',
              [variantId, s.size, s.stock]
            );
          }
        }
      }
    }

    if (Array.isArray(images)) {
      for (let idx = 0; idx < images.length; idx++) {
        await connection.query(
          'INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)',
          [id, images[idx], idx]
        );
      }
    }

    await connection.commit();
    res.json({ id, message: 'Producto actualizado con éxito' });
  } catch (err: any) {
    if (connection) await connection.rollback();
    console.error('[PUT /api/products ERROR]:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) connection.release();
  }
};

// 4. Eliminar Producto
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await getPool().query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: `Producto ${id} eliminado correctamente` });
  } catch (err: any) {
    console.error('[DELETE /api/products ERROR]:', err);
    res.status(500).json({ error: err.message });
  }
};
