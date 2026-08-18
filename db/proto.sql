-- Script de Base de Datos MySQL para Karisme Store
-- Archivo: db/proto.sql

CREATE DATABASE IF NOT EXISTS karisme_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE karisme_db;

-- 1. Tabla de Categorías (Géneros y Nombres de Subcategorías)
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gender VARCHAR(50) NOT NULL DEFAULT 'Mujer',
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_gender (gender),
  INDEX idx_name (name)
) ENGINE=InnoDB;

-- 2. Tabla de Productos (Atributos Generales)
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category_id INT,
  product_type ENUM('simple', 'variants') NOT NULL DEFAULT 'variants',
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) DEFAULT NULL,
  stock INT NOT NULL DEFAULT 0,
  description LONGTEXT,
  badge VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_product_type (product_type)
) ENGINE=InnoDB;

-- 3. Tabla de Variantes por Producto (Colores y Estampados)
CREATE TABLE IF NOT EXISTS product_variants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  type ENUM('color', 'pattern') NOT NULL DEFAULT 'color',
  name VARCHAR(100) NOT NULL,
  hex VARCHAR(20) DEFAULT NULL,
  pattern_image LONGTEXT DEFAULT NULL,
  variant_image LONGTEXT DEFAULT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_variants (product_id)
) ENGINE=InnoDB;

-- 4. Tabla de Galería de Imágenes por Variante (N Fotos por Variante, LONGTEXT para imágenes Base64)
CREATE TABLE IF NOT EXISTS variant_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variant_id INT NOT NULL,
  image_url LONGTEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  INDEX idx_variant_imgs (variant_id)
) ENGINE=InnoDB;

-- 5. Tabla de Stock por Talla para cada Variante
CREATE TABLE IF NOT EXISTS variant_sizes_stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  variant_id INT NOT NULL,
  size VARCHAR(20) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
  INDEX idx_variant_sizes (variant_id, size)
) ENGINE=InnoDB;

-- 6. Tabla de Galería de Imágenes General del Producto (LONGTEXT para imágenes Base64)
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url LONGTEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_imgs (product_id)
) ENGINE=InnoDB;

-- ========================================================
-- DATOS INICIALES DE PRUEBA (SEED DATA)
-- ========================================================

-- Insertar Categorías Baseline
INSERT INTO categories (id, gender, name) VALUES
(1, 'Mujer', 'Lencería de Seda'),
(2, 'Mujer', 'Ropa de Estar'),
(3, 'Mujer', 'Básicos de Algodón'),
(4, 'Mujer', 'Ediciones Limitadas'),
(5, 'Hombre', 'Pijamas de Seda'),
(6, 'Hombre', 'Ropa de Estar'),
(7, 'Hombre', 'Básicos'),
(8, 'Hombre', 'Ediciones Limitadas'),
(9, 'Niños', 'Pijamas'),
(10, 'Niños', 'Conjuntos'),
(11, 'Niños', 'Ropa de Estar'),
(12, 'Niños', 'Básicos'),
(13, 'Accesorios', 'Cuidado')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- -- Insertar Productos Baseline
-- INSERT INTO products (id, sku, name, category_id, product_type, price, original_price, stock, description, badge) VALUES
-- (1, 'KAR-W-001', 'Camisola Silk Rose', 1, 'variants', 45000.00, NULL, 46, 'Una pieza de elegancia atemporal confeccionada en seda de mora de 22 mommes.', 'Nuevo'),
-- (2, 'KAR-W-002', 'Bodysuit Midnight Lace', 4, 'variants', 55000.00, 72000.00, 25, 'Bodysuit elaborado en encaje francés de alta precisión con bordes festoneados.', 'Oferta'),
-- (3, 'KAR-M-001', 'Pijama Seda Homme Classic', 5, 'variants', 68000.00, NULL, 30, 'Pijama masculino de dos piezas en seda de mora con solapa sastre.', 'Nuevo'),
-- (4, 'KAR-ACC-001', 'Bolsa de Seda de Guardado', 13, 'simple', 6500.00, NULL, 45, 'Bolsa de seda 100% de morera para protección de prendas delicadas.', 'Popular')
-- ON DUPLICATE KEY UPDATE name=VALUES(name);

-- -- Insertar Variantes del Producto 1 (Camisola Silk Rose)
-- INSERT INTO product_variants (id, product_id, type, name, hex, pattern_image, variant_image) VALUES
-- (1, 1, 'color', 'Champán', '#F5F5DC', NULL, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop'),
-- (2, 1, 'color', 'Rosa Soft', '#E6D7D2', NULL, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop'),
-- (3, 1, 'color', 'Negro Azabache', '#2C2C2C', NULL, 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop')
-- ON DUPLICATE KEY UPDATE name=VALUES(name);

-- -- Insertar Galería de Fotos por Variante (Producto 1)
-- INSERT INTO variant_images (id, variant_id, image_url, sort_order) VALUES
-- (1, 1, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop', 1),
-- (2, 2, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop', 1),
-- (3, 3, 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop', 1)
-- ON DUPLICATE KEY UPDATE image_url=VALUES(image_url);

-- -- Insertar Tallas y Stock por Variante (Producto 1)
-- INSERT INTO variant_sizes_stock (id, variant_id, size, stock) VALUES
-- (1, 1, 'S', 12), (2, 1, 'M', 34),
-- (3, 2, 'S', 15), (4, 2, 'M', 20),
-- (5, 3, 'S', 10), (6, 3, 'M', 15)
-- ON DUPLICATE KEY UPDATE stock=VALUES(stock);
