import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products as catalogProducts } from '../../data/products';
import { fetchDbCategories, getFormattedDbCategories } from '../../data/categories';
import { sortSizes } from '../../utils/sortSizes';

const defaultSizes = ['XS', 'S', 'M', 'L', 'XL', '2Y', '4Y', '6Y', '8Y', '10Y', 'Única'];

const defaultColors = [
  { id: 'Champagne', name: 'Champán', hex: '#F5F5DC' },
  { id: 'Midnight Black', name: 'Negro Azabache', hex: '#2C2C2C' },
  { id: 'Soft Rose', name: 'Rosa Soft', hex: '#E6D7D2' },
  { id: 'Pure White', name: 'Blanco Puro', hex: '#FFFFFF' },
  { id: 'Dusty Blue', name: 'Azul Polvo', hex: '#4A4E69' },
  { id: 'Carbon Black', name: 'Gris Carbón', hex: '#1A1A1A' },
  { id: 'Navy Blue', name: 'Azul Marino', hex: '#1E2A44' },
  { id: 'Sand', name: 'Arena', hex: '#D2B48C' },
];

const defaultMaterials = [
  'Seda de Morera 100%',
  'Algodón Orgánico',
  'Encaje Francés',
  'Satén de Raso',
  'Microfibra Transpirable',
  'Tul Delicado',
];

const defaultDetails = [
  'Con Encaje Floral',
  'Sin Costuras (Seamless)',
  'Con Varilla (Underwire)',
  'Sin Copa (Unlined)',
  'Broche Frontal',
  'Tirantes Ajustables',
];

const predefinedCategoriesList = [
  'Mujer / Lencería de Seda',
  'Mujer / Ropa de Estar',
  'Mujer / Básicos de Algodón',
  'Mujer / Ediciones Limitadas',
  'Hombre / Pijamas de Seda',
  'Hombre / Ropa de Estar',
  'Hombre / Básicos',
  'Hombre / Ediciones Limitadas',
  'Niños / Pijamas',
  'Niños / Conjuntos',
  'Niños / Ropa de Estar',
  'Niños / Básicos',
  'Accesorios / Cuidado',
];

const samplePatterns = [
  {
    id: 'pat-1',
    name: 'Estampado Floral Rose',
    patternImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=200&auto=format&fit=crop',
  },
  {
    id: 'pat-2',
    name: 'Leopardo Silk Print',
    patternImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop',
  },
];

const sampleVariantImages = [
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&auto=format&fit=crop',
];

// Ultra-safe normalizer for product items
const normalizeProduct = (p) => {
  if (!p) return null;
  const isSimple = p.productType === 'simple';
  
  let variants = [];
  if (!isSimple) {
    if (Array.isArray(p.variants) && p.variants.length > 0) {
      variants = p.variants.map((v, idx) => {
        if (!v) return null;
        let sizesWithStock = [];
        if (Array.isArray(v.sizesWithStock) && v.sizesWithStock.length > 0) {
          sizesWithStock = v.sizesWithStock.map((s) => ({
            size: s?.size || 'S',
            stock: Number(s?.stock !== undefined ? s.stock : 10),
          }));
        } else if (Array.isArray(v.availableSizes) && v.availableSizes.length > 0) {
          sizesWithStock = v.availableSizes.map((sz, sIdx) => ({
            size: sz,
            stock: sIdx === 0 ? 12 : 34,
          }));
        } else {
          sizesWithStock = [
            { size: 'S', stock: 12 },
            { size: 'M', stock: 34 },
          ];
        }

        const varImgs = Array.isArray(v.variantImages) && v.variantImages.length > 0
          ? v.variantImages
          : [v.variantImage || v.patternImage || sampleVariantImages[idx % sampleVariantImages.length]].filter(Boolean);

        return {
          id: v.id || `var-${idx}-${Date.now()}`,
          type: v.type || 'color',
          name: v.name || `Variante ${idx + 1}`,
          hex: v.hex || '#CCCCCC',
          patternImage: v.patternImage || '',
          variantImage: varImgs[0] || sampleVariantImages[idx % sampleVariantImages.length],
          variantImages: varImgs,
          sizesWithStock,
        };
      }).filter(Boolean);
    } else {
      const colorList = p.availableColors || [defaultColors[0], defaultColors[1]];
      variants = colorList.map((col, idx) => ({
        id: `var-${col.id || idx}-${Date.now()}`,
        type: 'color',
        name: col.name || col.id,
        hex: col.hex || '#CCCCCC',
        patternImage: '',
        variantImage: sampleVariantImages[idx % sampleVariantImages.length],
        variantImages: [sampleVariantImages[idx % sampleVariantImages.length]],
        sizesWithStock: [
          { size: 'S', stock: 12 },
          { size: 'M', stock: 34 },
        ],
      }));
    }
  }

  const calculatedStock = isSimple
    ? (p.stock !== undefined ? Number(p.stock) : 25)
    : variants.reduce((acc, v) => acc + (v.sizesWithStock || []).reduce((sub, item) => sub + (Number(item.stock) || 0), 0), 0);

  return {
    id: (p.id || Date.now()).toString(),
    productType: p.productType || 'variants',
    name: p.name || 'Producto Karisme',
    sku: p.sku || `KAR-W-${(p.id || '001').toString().padStart(3, '0')}`,
    category: p.category ? (p.category.includes('/') ? p.category : `Mujer / ${p.category}`) : 'Mujer / Lencería',
    stock: calculatedStock,
    price: Number(p.price) || 25000,
    materials: Array.isArray(p.materials) ? p.materials : ['Seda de Morera 100%'],
    details: Array.isArray(p.details) ? p.details : ['Con Encaje Floral', 'Tirantes Ajustables'],
    variants,
    availableSizes: Array.isArray(p.availableSizes) ? p.availableSizes : ['S', 'M', 'L'],
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image || sampleVariantImages[0]],
  };
};

const initialInventory = catalogProducts.map(normalizeProduct).filter(Boolean);

// Setup default standalone/simple product
initialInventory.unshift({
  id: 'simple-1',
  productType: 'simple',
  name: 'Bolsa de Seda de Guardado (Producto Individual)',
  sku: 'KAR-ACC-001',
  category: 'Accesorios / Cuidado',
  price: 6500,
  stock: 45,
  materials: ['Seda de Morera 100%'],
  details: ['Cierre de Lazo'],
  variants: [],
  availableSizes: ['Única'],
  images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop'],
});

const InventoryCopy = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_admin_inventory_variants_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProduct).filter(Boolean);
        }
      }
      return initialInventory;
    } catch {
      return initialInventory;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [toastMessage, setToastMessage] = useState('');

  // LIVE SIMULATED PURCHASE / TESTING DEDUCTION PANEL STATE
  const [simProductIndex, setSimProductIndex] = useState(0);
  const [simVariantName, setSimVariantName] = useState('');
  const [simSize, setSimSize] = useState('');

  // Add / Edit Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [formData, setFormData] = useState({
    productType: 'variants', // 'simple' | 'variants'
    name: '',
    sku: '',
    category: 'Mujer / Lencería de Seda',
    price: '',
    stock: '',
    materials: ['Seda de Morera 100%'],
    details: ['Con Encaje Floral', 'Tirantes Ajustables'],
    variants: [],
    availableSizes: ['S', 'M', 'L'],
    images: [],
  });

  // Custom attributes inside modal
  const [customMaterialInput, setCustomMaterialInput] = useState('');
  const [customDetailInput, setCustomDetailInput] = useState('');
  
  // New Variant Creator Form State
  const [newVariantType, setNewVariantType] = useState('color');
  const [newVariantName, setNewVariantName] = useState('');
  const [newVariantHex, setNewVariantHex] = useState('#C0392B');
  const [newVariantPatternUrl, setNewVariantPatternUrl] = useState('');
  const [newVariantImageUrls, setNewVariantImageUrls] = useState([]);
  const [newVariantSingleUrlInput, setNewVariantSingleUrlInput] = useState('');
  const [newVariantSizes, setNewVariantSizes] = useState(['S', 'M']);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [rawDbCategories, setRawDbCategories] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL || '';

  const refreshProductsFromDb = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (e) {
      console.warn('⚠️ No se pudo obtener de la API DB:', e.message);
    }
  };

  useEffect(() => {
    refreshProductsFromDb();
    fetchDbCategories().then(setRawDbCategories);
  }, []);

  // Save to localStorage & notify store catalog listeners
  useEffect(() => {
    try {
      localStorage.setItem('karisme_admin_inventory_variants_v4', JSON.stringify(products));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('inventoryUpdated'));
    } catch {
      // fallback
    }
  }, [products]);

  // Set default simulation selections when products load or target changes
  useEffect(() => {
    if (!products || products.length === 0) return;
    const safeIndex = (simProductIndex >= 0 && simProductIndex < products.length) ? simProductIndex : 0;
    const activeProd = products[safeIndex];
    if (activeProd) {
      if (activeProd.productType === 'variants') {
        const firstVar = activeProd.variants?.[0];
        if (firstVar) {
          if (!simVariantName || !activeProd.variants?.some((v) => v?.name === simVariantName)) {
            setSimVariantName(firstVar.name);
          }
          const activeVar = activeProd.variants?.find((v) => v?.name === simVariantName) || firstVar;
          const firstSize = activeVar?.sizesWithStock?.[0]?.size || 'S';
          if (!simSize || !activeVar?.sizesWithStock?.some((s) => s?.size === simSize)) {
            setSimSize(firstSize);
          }
        }
      } else {
        const firstSize = activeProd.availableSizes?.[0] || 'Única';
        setSimSize(firstSize);
        setSimVariantName('N/A');
      }
    }
  }, [products, simProductIndex, simVariantName, simSize]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const resetInventoryToDefault = () => {
    if (confirm('¿Seguro que deseas restaurar el inventario de prueba original? Perderás los cambios locales.')) {
      localStorage.removeItem('karisme_admin_inventory_variants_v4');
      localStorage.removeItem('karisme_admin_deleted_product_ids');
      setProducts(initialInventory);
      setSimProductIndex(0);
      setSimVariantName('');
      setSimSize('');
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('inventoryUpdated'));
      triggerToast('Inventario restaurado a valores por defecto.');
    }
  };

  // JSON IMPORT / EXPORT PERSISTENCE HELPERS
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(products, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `karisme_inventory_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('📥 Inventario descargado en formato JSON.');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map(normalizeProduct).filter(Boolean);
          setProducts(normalized);
          triggerToast('📤 Inventario cargado con éxito desde el archivo JSON.');
        } else {
          alert('El archivo JSON no tiene un formato válido de inventario.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const categoriesList = [
    'Todos',
    ...Array.from(new Set((products || []).map((p) => p?.category).filter(Boolean))),
  ];

  const filteredProducts = (products || []).filter((p) => {
    if (!p) return false;
    const matchesSearch =
      (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || p.category === categoryFilter;
    const matchesType = typeFilter === 'Todos' || p.productType === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleDelete = async (id, name) => {
    if (confirm(`¿Seguro que deseas eliminar "${name}" del inventario?`)) {
      const targetId = id.toString();
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${targetId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          triggerToast(`Producto "${name}" eliminado de la base de datos.`);
        }
      } catch (e) {
        // fallback
      }
      setProducts((prev) => prev.filter((p) => p.id.toString() !== targetId));
      window.dispatchEvent(new CustomEvent('inventoryUpdated'));
    }
  };

  // DYNAMIC LIVE STOCK DEDUCTION SIMULATION HANDLER
  const handleExecuteSimulatedPurchase = () => {
    const activeProd = products[simProductIndex];
    if (!activeProd) return;

    if (activeProd.productType === 'simple') {
      if (activeProd.stock <= 0) {
        alert(`⚠️ ¡AGOTADO! El producto individual "${activeProd.name}" no tiene stock disponible.`);
        return;
      }
      const updatedProducts = products.map((prod, idx) => {
        if (idx === simProductIndex) {
          return { ...prod, stock: prod.stock - 1 };
        }
        return prod;
      });
      setProducts(updatedProducts);
      triggerToast(`🛒 ¡Compra Exitosa! Se descontó 1 un. de "${activeProd.name}". Stock restante: ${activeProd.stock - 1} un.`);
      return;
    }

    // Matrix Sizing variant product deduction
    const targetVarIndex = activeProd.variants?.findIndex((v) => v?.name === simVariantName);
    if (targetVarIndex === undefined || targetVarIndex === -1) {
      alert(`La variante [${simVariantName}] no existe.`);
      return;
    }

    const targetVar = activeProd.variants[targetVarIndex];
    const sizeStockIndex = targetVar.sizesWithStock?.findIndex((item) => item?.size === simSize);

    if (sizeStockIndex === undefined || sizeStockIndex === -1) {
      alert(`La talla [${simSize}] no está activa para la variante [${simVariantName}].`);
      return;
    }

    const currentStock = Number(targetVar.sizesWithStock[sizeStockIndex].stock) || 0;

    if (currentStock <= 0) {
      alert(`⚠️ ¡AGOTADO! La variante [${simVariantName}] en Talla [${simSize}] tiene 0 unidades en inventario.`);
      return;
    }

    const nextVariants = [...activeProd.variants];
    const nextVar = { ...nextVariants[targetVarIndex] };
    const nextSizes = [...nextVar.sizesWithStock];
    nextSizes[sizeStockIndex] = {
      ...nextSizes[sizeStockIndex],
      stock: nextSizes[sizeStockIndex].stock - 1,
    };
    nextVar.sizesWithStock = nextSizes;
    nextVariants[targetVarIndex] = nextVar;
    
    // Recalculate total product stock
    const nextTotalStock = nextVariants.reduce((acc, v) => acc + (v.sizesWithStock || []).reduce((sub, item) => sub + (Number(item.stock) || 0), 0), 0);
    
    const updatedProducts = products.map((prod, idx) => {
      if (idx === simProductIndex) {
        return {
          ...prod,
          variants: nextVariants,
          stock: nextTotalStock,
        };
      }
      return prod;
    });

    setProducts(updatedProducts);
    triggerToast(
      `🛒 ¡Compra Exitosa! Se descontó 1 un. de [${simVariantName} / Talla ${simSize}]. Stock restante: ${currentStock - 1} un.`
    );
  };

  // Submit Save Product
  const handleSaveProductSubmit = async (e) => {
    e.preventDefault();
    const finalCategory = (formData.category || '').trim();
    if (!formData.name.trim() || !formData.price || !finalCategory) {
      alert('Debes ingresar al menos el nombre, precio y seleccionar una categoría.');
      return;
    }

    let finalVariants = formData.variants || [];
    if (formData.productType === 'variants' && finalVariants.length === 0) {
      finalVariants = [
        {
          id: `var-default-${Date.now()}`,
          type: 'color',
          name: 'Negro Azabache',
          hex: '#2C2C2C',
          patternImage: '',
          variantImage: sampleVariantImages[0],
          variantImages: [sampleVariantImages[0]],
          sizesWithStock: [
            { size: 'S', stock: 15 },
            { size: 'M', stock: 20 },
            { size: 'L', stock: 15 },
          ],
        },
      ];
    }

    const totalStock = formData.productType === 'simple'
      ? (parseInt(formData.stock) || 0)
      : finalVariants.reduce((acc, v) => acc + (v.sizesWithStock || []).reduce((sub, item) => sub + (Number(item.stock) || 0), 0), 0);

    const payload = {
      id: editingProductId || Date.now().toString(),
      productType: formData.productType,
      name: formData.name.trim(),
      sku: formData.sku.trim() || `KAR-${Date.now().toString().slice(-4)}`,
      category: finalCategory,
      price: Number(formData.price),
      stock: totalStock,
      materials: formData.materials && formData.materials.length > 0 ? formData.materials : ['Seda de Morera 100%'],
      details: formData.details && formData.details.length > 0 ? formData.details : ['Diseño Exclusivo Karisme'],
      variants: formData.productType === 'simple' ? [] : finalVariants,
      availableSizes: formData.productType === 'simple'
        ? (formData.availableSizes || ['Única'])
        : Array.from(new Set(finalVariants.flatMap(v => v.sizesWithStock?.map(s => s.size) || ['S', 'M', 'L']))),
      images: formData.images || [],
    };

    // Optimistic UI update
    if (editingProductId) {
      setProducts((prev) => prev.map((p) => (p.id.toString() === editingProductId.toString() ? payload : p)));
    } else {
      setProducts((prev) => [payload, ...prev]);
    }

    // Persist to MySQL Backend API
    try {
      const url = editingProductId
        ? `${API_BASE_URL}/api/products/${editingProductId}`
        : `${API_BASE_URL}/api/products`;
      const method = editingProductId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await refreshProductsFromDb();
        window.dispatchEvent(new CustomEvent('inventoryUpdated'));
        triggerToast(editingProductId ? `Producto "${payload.name}" guardado en la base de datos.` : `Nuevo producto "${payload.name}" guardado en la base de datos.`);
      } else {
        const errData = await res.json();
        console.warn('Backend DB Error:', errData);
      }
    } catch (err) {
      console.warn('API fetch error:', err.message);
    }

    setIsFormModalOpen(false);
  };

  // Open Add modal
  const handleOpenAddModal = (type = 'variants') => {
    setEditingProductId(null);
    setIsCustomCategory(false);
    setFormData({
      productType: type,
      name: type === 'simple' ? 'Accesorio de Seda' : 'Tanga Silk Luxury',
      sku: `KAR-${type === 'simple' ? 'ACC' : 'W'}-${(Date.now() % 1000).toString().padStart(3, '0')}`,
      category: type === 'simple' ? 'Accesorios / Cuidado' : 'Mujer / Lencería de Seda',
      price: type === 'simple' ? '8500' : '35000',
      stock: '25',
      materials: ['Seda de Morera 100%'],
      details: ['Cierre de Lazo'],
      variants: type === 'simple' ? [] : [
        {
          id: 'v1',
          type: 'color',
          name: 'Negro Azabache',
          hex: '#2C2C2C',
          patternImage: '',
          variantImage: sampleVariantImages[0],
          variantImages: [sampleVariantImages[0], sampleVariantImages[1]],
          sizesWithStock: [
            { size: 'S', stock: 12 },
            { size: 'M', stock: 34 },
          ],
        },
        {
          id: 'v2',
          type: 'pattern',
          name: 'Estampado Floral Rose',
          hex: '',
          patternImage: samplePatterns[0].patternImage,
          variantImage: sampleVariantImages[1],
          variantImages: [sampleVariantImages[1]],
          sizesWithStock: [
            { size: 'S', stock: 32 },
            { size: 'M', stock: 12 },
          ],
        },
      ],
      availableSizes: ['S', 'M', 'L'],
      images: [],
    });
    setNewVariantImageUrls([]);
    setNewVariantSingleUrlInput('');
    setNewImageUrl('');
    setIsFormModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    const cat = product.category || 'Mujer / Lencería de Seda';
    setIsCustomCategory(!predefinedCategoriesList.includes(cat));
    setFormData({
      productType: product.productType || 'variants',
      name: product.name,
      sku: product.sku,
      category: cat,
      price: product.price.toString(),
      stock: product.stock.toString(),
      materials: [...(product.materials || [])],
      details: [...(product.details || [])],
      variants: JSON.parse(JSON.stringify(product.variants || [])),
      availableSizes: [...(product.availableSizes || [])],
      images: [...(product.images || [])],
    });
    setNewVariantImageUrls([]);
    setNewVariantSingleUrlInput('');
    setNewImageUrl('');
    setIsFormModalOpen(true);
  };

  // Toggle attributes
  const handleToggleMaterial = (mat) => {
    setFormData((prev) => {
      const exists = prev.materials.includes(mat);
      return {
        ...prev,
        materials: exists ? prev.materials.filter((m) => m !== mat) : [...prev.materials, mat],
      };
    });
  };

  const handleAddCustomMaterial = (e) => {
    e.preventDefault();
    if (!customMaterialInput.trim()) return;
    const val = customMaterialInput.trim();
    if (!formData.materials.includes(val)) {
      setFormData((prev) => ({ ...prev, materials: [...prev.materials, val] }));
    }
    setCustomMaterialInput('');
  };

  const handleToggleDetail = (det) => {
    setFormData((prev) => {
      const exists = prev.details.includes(det);
      return {
        ...prev,
        details: exists ? prev.details.filter((d) => d !== det) : [...prev.details, det],
      };
    });
  };

  const handleAddCustomDetail = (e) => {
    e.preventDefault();
    if (!customDetailInput.trim()) return;
    const val = customDetailInput.trim();
    if (!formData.details.includes(val)) {
      setFormData((prev) => ({ ...prev, details: [...prev.details, val] }));
    }
    setCustomDetailInput('');
  };

  const handleToggleSimpleSize = (sz) => {
    setFormData((prev) => {
      const exists = prev.availableSizes.includes(sz);
      return {
        ...prev,
        availableSizes: exists ? prev.availableSizes.filter((s) => s !== sz) : [...prev.availableSizes, sz],
      };
    });
  };

  // Variant Add / Remove / Edit Setup
  const handleAddVariantSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const currentVariantsCount = (formData.variants || []).length;
    const defaultName = newVariantType === 'color' 
      ? `Color Sólido ${currentVariantsCount + 1}` 
      : `Estampado ${currentVariantsCount + 1}`;
      
    const varName = newVariantName.trim() || defaultName;
    const defaultFallbackImg = sampleVariantImages[currentVariantsCount % sampleVariantImages.length];

    let varImgs = [...newVariantImageUrls];
    if (varImgs.length === 0) {
      varImgs = [defaultFallbackImg];
    }

    const newVar = {
      id: `var-${Date.now()}`,
      type: newVariantType,
      name: varName,
      hex: newVariantType === 'color' ? newVariantHex : '',
      patternImage: newVariantType === 'pattern' ? (newVariantPatternUrl || samplePatterns[0].patternImage) : '',
      variantImage: varImgs[0],
      variantImages: varImgs,
      sizesWithStock: sortSizes(newVariantSizes.length > 0 ? newVariantSizes : ['S', 'M']).map((sz) => ({
        size: sz,
        stock: 10,
      })),
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...(prev.variants || []), newVar],
    }));

    setNewVariantName('');
    setNewVariantPatternUrl('');
    setNewVariantImageUrls([]);
    setNewVariantSingleUrlInput('');
    triggerToast(`Variante "${newVar.name}" registrada con ${newVar.variantImages.length} fotos.`);
  };

  // Remove a variant from form state
  const handleRemoveVariant = (variantId) => {
    setFormData((prev) => ({
      ...prev,
      variants: (prev.variants || []).filter((v) => v.id !== variantId),
    }));
    triggerToast('Variante removida.');
  };

  // Inline update of any property of an added variant card (Name, Hex, Image)
  const handleUpdateVariantField = (variantIdx, field, value) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      nextVariants[variantIdx] = {
        ...nextVariants[variantIdx],
        [field]: value,
      };
      return { ...prev, variants: nextVariants };
    });
  };

  // Dedicated multi-image handlers per variant card
  const handleAddVariantImage = (variantIdx, url) => {
    if (!url.trim()) return;
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      const targetVar = nextVariants[variantIdx];
      const currentImgs = targetVar.variantImages || (targetVar.variantImage ? [targetVar.variantImage] : []);
      const updatedImgs = [...currentImgs, url.trim()];
      targetVar.variantImages = updatedImgs;
      targetVar.variantImage = updatedImgs[0];
      return { ...prev, variants: nextVariants };
    });
  };

  const handleRemoveVariantImage = (variantIdx, imgIdx) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      const targetVar = nextVariants[variantIdx];
      const currentImgs = targetVar.variantImages || (targetVar.variantImage ? [targetVar.variantImage] : []);
      const updatedImgs = currentImgs.filter((_, idx) => idx !== imgIdx);
      targetVar.variantImages = updatedImgs;
      targetVar.variantImage = updatedImgs[0] || targetVar.patternImage || '';
      return { ...prev, variants: nextVariants };
    });
  };

  const handleVariantFileUploadMulti = (e, variantIdx = null) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        if (variantIdx !== null) {
          handleAddVariantImage(variantIdx, base64);
        } else {
          setNewVariantImageUrls((prev) => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePatternFileUpload = (e, variantIdx = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        if (variantIdx !== null) {
          handleUpdateVariantField(variantIdx, 'patternImage', base64);
        } else {
          setNewVariantPatternUrl(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleVariantSizeStock = (variantIdx, size) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      const targetVar = nextVariants[variantIdx];
      if (!targetVar.sizesWithStock) targetVar.sizesWithStock = [];
      const sizeIndex = targetVar.sizesWithStock.findIndex((item) => item.size === size);

      if (sizeIndex > -1) {
        targetVar.sizesWithStock = targetVar.sizesWithStock.filter((item) => item.size !== size);
      } else {
        targetVar.sizesWithStock.push({ size, stock: 10 });
      }

      return { ...prev, variants: nextVariants };
    });
  };

  const handleUpdateVariantSizeStockValue = (variantIdx, size, val) => {
    setFormData((prev) => {
      const nextVariants = [...prev.variants];
      const targetVar = nextVariants[variantIdx];
      if (!targetVar.sizesWithStock) targetVar.sizesWithStock = [];
      const sizeObj = targetVar.sizesWithStock.find((item) => item.size === size);
      if (sizeObj) {
        sizeObj.stock = Math.max(0, parseInt(val) || 0);
      }
      return { ...prev, variants: nextVariants };
    });
  };



  // General Gallery Helpers
  const handleAddImageLink = (e) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()],
    }));
    setNewImageUrl('');
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, base64],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const currentSimProduct = products[simProductIndex] || products[0];

  const activeSimVariantObj = currentSimProduct?.variants?.find((v) => v?.name === simVariantName);
  const activeSimImage = activeSimVariantObj?.variantImages?.[0] || activeSimVariantObj?.variantImage || currentSimProduct?.images?.[0] || sampleVariantImages[0];

  const activeSimSizeStockObj = currentSimProduct?.productType === 'simple'
    ? { stock: currentSimProduct.stock }
    : activeSimVariantObj?.sizesWithStock?.find((item) => item?.size === simSize);

  const formatColones = (val) => `₡${Number(val || 0).toLocaleString('es-CR')}`;

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm border border-outline-variant max-w-md">
          ✨ {toastMessage}
        </div>
      )}

      {/* Navigation Breadcrumb */}
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4 mb-4 font-sans">
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest font-label-sm text-on-surface-variant/60">
          <Link to="/admin" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-primary font-bold">Gestión de Inventario (CRUD Completo)</span>
        </nav>
      </div>

      {/* Main Header & Large Action Buttons */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 font-sans pb-6 border-b border-outline-variant/20">
        <div>
          <h2 className="font-headline-lg text-[clamp(1.5rem,2.2vw,2.5rem)] text-on-surface">
            Inventario de Tallas & Fotos por Variante ({products.length})
          </h2>
          <p className="font-body-md text-on-surface-variant text-sm max-w-xl mt-1">
            Módulo CRUD completo. Asigna N imágenes independientes a cada variante y gestiona stock por talla.
          </p>
        </div>

        {/* Action Buttons Row - Prominent & Styled like Inventory */}
        <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex-1 sm:flex-none border border-outline-variant text-on-surface px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider hover:bg-surface-container-high transition-all font-bold shadow-xs cursor-pointer"
            title="Exportar archivo JSON"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Exportar JSON
          </button>

          <label className="flex-1 sm:flex-none border border-outline-variant text-on-surface px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider hover:bg-surface-container-high transition-all font-bold shadow-xs cursor-pointer">
            <span className="material-symbols-outlined text-lg">upload</span>
            Importar JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => handleOpenAddModal('simple')}
            className="flex-1 sm:flex-none border border-secondary text-secondary hover:bg-secondary/10 px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider transition-all font-bold shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            + Producto Individual
          </button>

          <button
            type="button"
            onClick={() => handleOpenAddModal('variants')}
            className="flex-1 sm:flex-none bg-primary text-on-primary px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider hover:bg-primary/90 transition-all font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            + Producto con Variantes
          </button>
        </div>
      </header>


      {/* Filters & Search Bar */}
      <section className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 font-sans">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-outline-variant/40 focus:border-primary rounded-xl font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
            placeholder="Buscar por SKU, material, color, categoría..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-on-surface-variant shrink-0 uppercase tracking-wider">
              Tipo:
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-surface-bright border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none cursor-pointer"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="simple">📦 Productos Individuales</option>
              <option value="variants">⚡ Productos con Variantes</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-on-surface-variant shrink-0 uppercase tracking-wider">
              Categoría:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-surface-bright border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-bold text-on-surface outline-none cursor-pointer"
            >
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Product List Table */}
      <div className="bg-surface-bright rounded-2xl border border-outline-variant/30 shadow-xs overflow-hidden mb-12 animate-fade-in font-sans">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="py-4 px-6 font-bold">Tipo & Producto</th>
                <th className="py-4 px-4 font-bold">Categoría & SKU</th>
                <th className="py-4 px-4 font-bold">Materiales / Detalles</th>
                <th className="py-4 px-4 font-bold">Variantes, Fotos & Stock por Talla</th>
                <th className="py-4 px-4 font-bold">Precio / Stock Total</th>
                <th className="py-4 px-6 text-right font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((p) => {
                const isLowStock = p.stock < 12;
                const isSimple = p.productType === 'simple';
                return (
                  <tr key={p.id} className="hover:bg-surface-container-lowest transition-colors">
                    {/* 1. Producto */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-surface-variant border border-outline-variant/30 shrink-0">
                          <img
                            src={p.images?.[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                              isSimple
                                ? 'bg-secondary/15 text-secondary border border-secondary/30'
                                : 'bg-primary/10 text-primary border border-primary/30'
                            }`}
                          >
                            {isSimple ? '📦 Individual' : '⚡ Con Variantes'}
                          </span>
                          <p className="font-bold text-sm text-on-surface truncate mt-0.5">
                            {p.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* 2. Categoría & SKU */}
                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-on-surface truncate">
                        {p.category}
                      </p>
                      <p className="text-[11px] font-mono text-on-surface-variant">
                        {p.sku}
                      </p>
                    </td>

                    {/* 3. Materiales & Detalles */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {p.materials?.map((m) => (
                            <span
                              key={m}
                              className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold shadow-2xs"
                            >
                              🧵 {m}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.details?.map((d) => (
                            <span
                              key={d}
                              className="text-[9px] bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant font-medium"
                            >
                              ✨ {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>

                    {/* 4. Variantes, Fotos & Stock por Talla */}
                    <td className="py-4 px-4">
                      {isSimple ? (
                        <div className="flex flex-wrap gap-1">
                          {p.availableSizes?.map((sz) => (
                            <span
                              key={sz}
                              className="text-[9px] bg-secondary/15 text-secondary px-2.5 py-0.5 rounded font-mono font-bold"
                            >
                              {sz}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 max-w-[340px]">
                          {p.variants?.map((v) => (
                            <div
                              key={v.id}
                              className="flex items-center justify-between gap-3 bg-surface-container-low p-2 rounded-xl border border-outline-variant/30 text-xs shadow-2xs"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-8 h-9 rounded overflow-hidden bg-surface-container border border-outline-variant/40 shrink-0 shadow-2xs relative">
                                  <img
                                    src={v.variantImages?.[0] || v.variantImage || v.patternImage || p.images[0]}
                                    alt={v.name}
                                    className="w-full h-full object-cover"
                                  />
                                  {(v.variantImages || []).length > 1 && (
                                    <span className="absolute bottom-0 right-0 bg-black/80 text-white text-[8px] px-1 font-bold">
                                      +{(v.variantImages || []).length}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-[11px] text-on-surface truncate">
                                    {v.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1 shrink-0 justify-end">
                                {v.sizesWithStock?.map((item) => (
                                  <span
                                    key={item.size}
                                    className="text-[9px] bg-secondary/10 text-secondary border border-secondary/20 px-1.5 py-0.2 rounded font-mono font-bold"
                                    title={`Stock de ${item.size}: ${item.stock} un.`}
                                  >
                                    {item.size} ({item.stock})
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* 5. Precio & Stock */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-secondary text-sm">
                        {formatColones(p.price)}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-bold text-on-surface">
                          {p.stock} un. total
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                            isLowStock ? 'bg-error/15 text-error' : 'bg-secondary/15 text-secondary'
                          }`}
                        >
                          {isLowStock ? 'Bajo' : 'Disponible'}
                        </span>
                      </div>
                    </td>

                    {/* 6. Acciones */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-lg transition-colors cursor-pointer"
                          title="Editar producto"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar producto"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-3xl w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-6 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {editingProductId ? 'edit_square' : 'add_box'}
                </span>
                <h3 className="font-headline-md text-headline-md font-bold">
                  {editingProductId ? 'Editar Ficha de Producto' : 'Crear Producto'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* PRODUCT TYPE SELECTOR */}
            <div className="bg-surface-container-low p-2 rounded-xl border border-outline-variant/40 mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, productType: 'simple' })}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.productType === 'simple'
                    ? 'bg-secondary text-white shadow-xs'
                    : 'bg-surface-bright text-on-surface-variant border border-outline-variant/30'
                }`}
              >
                📦 Producto Individual / Simple (Sin Variantes)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, productType: 'variants' })}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  formData.productType === 'variants'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-bright text-on-surface-variant border border-outline-variant/30'
                }`}
              >
                ⚡ Producto con Tallas e Imágenes por Variante
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bralette Silk Noire"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold text-on-surface"
                  />
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Código SKU *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. KAR-W-001"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-mono text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Categoría *
                  </label>
                  <select
                    value={isCustomCategory ? 'custom' : formData.category}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setIsCustomCategory(true);
                        setFormData({ ...formData, category: '' });
                      } else {
                        setIsCustomCategory(false);
                        setFormData({ ...formData, category: e.target.value });
                      }
                    }}
                    className="w-full bg-surface-container-low px-3 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-bold text-on-surface cursor-pointer"
                  >
                    {(() => {
                      const allFormatted = getFormattedDbCategories(rawDbCategories);
                      const genderIcons = {
                        Mujer: '👩 Colección Femenina',
                        Hombre: '👨 Colección Masculina',
                        Niños: '🧒 Colección Infantil',
                        Accesorios: '🛍️ Accesorios & Cuidado',
                      };
                      const grouped = {};
                      allFormatted.forEach((cat) => {
                        const g = cat.gender || 'Mujer';
                        if (!grouped[g]) grouped[g] = [];
                        grouped[g].push(cat);
                      });

                      return Object.entries(grouped).map(([gender, cats]) => (
                        <optgroup key={gender} label={genderIcons[gender] || `✨ ${gender}`}>
                          {cats.map((c) => (
                            <option key={c.full} value={c.full}>
                              {c.full}
                            </option>
                          ))}
                        </optgroup>
                      ));
                    })()}
                    <option value="custom">+ Otra Categoría Personalizada...</option>
                  </select>

                  {isCustomCategory && (
                    <input
                      type="text"
                      placeholder="Escribe la categoría personalizada..."
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-surface-bright px-3 py-2 mt-2 rounded-xl border border-primary outline-none text-xs font-bold animate-fade-in"
                    />
                  )}
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Precio (₡ Colones) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="35000"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold text-secondary"
                  />
                </div>

                {formData.productType === 'simple' && (
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                      Unidades en Stock *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="15"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold text-on-surface"
                    />
                  </div>
                )}

                {formData.productType === 'variants' && (
                  <div>
                    <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                      Stock Total (Calculado)
                    </label>
                    <div className="w-full bg-surface-container-high px-4 py-2.5 rounded-xl border border-outline-variant/50 text-sm font-mono font-bold text-primary">
                      {(formData.variants || []).reduce((acc, v) => acc + (v.sizesWithStock || []).reduce((sub, item) => sub + (Number(item.stock) || 0), 0), 0)} un.
                    </div>
                  </div>
                )}
              </div>

              {/* SIMPLE PRODUCT MODE: FLAT SIZE SELECTOR */}
              {formData.productType === 'simple' && (
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-2">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface block font-bold">
                    📏 Selecciona Tallas Disponibles para este Producto Individual:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {defaultSizes.map((sz) => {
                      const selected = formData.availableSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => handleToggleSimpleSize(sz)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                            selected
                              ? 'bg-secondary text-white border-secondary shadow-xs'
                              : 'bg-surface-bright text-on-surface-variant border-outline-variant/40'
                          }`}
                        >
                          {selected ? `✓ ${sz}` : sz}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* VARIANTS MODE SECTIONS */}
              {formData.productType === 'variants' && (
                <>
                  {/* SECCIÓN MATERIALES */}
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-3">
                    <label className="font-label-sm text-xs uppercase tracking-wider text-primary block font-bold">
                      🧵 Materiales de la Prenda:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {defaultMaterials.map((mat) => {
                        const selected = formData.materials.includes(mat);
                        return (
                          <button
                            key={mat}
                            type="button"
                            onClick={() => handleToggleMaterial(mat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                              selected
                                ? 'bg-primary text-on-primary border-primary shadow-2xs'
                                : 'bg-surface-bright text-on-surface-variant border-outline-variant/40 hover:border-primary'
                            }`}
                          >
                            {selected ? `✓ ${mat}` : mat}
                          </button>
                        );
                      })}
                    </div>
                    {/* Custom material */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="+ Agregar otro material (Ej. Rayón de Bambú)"
                        value={customMaterialInput}
                        onChange={(e) => setCustomMaterialInput(e.target.value)}
                        className="flex-1 bg-surface-bright px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomMaterial}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-xs font-bold cursor-pointer hover:bg-primary/20"
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>

                  {/* SECCIÓN DETALLES */}
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-3">
                    <label className="font-label-sm text-xs uppercase tracking-wider text-secondary block font-bold">
                      ✨ Detalles & Confección:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {defaultDetails.map((det) => {
                        const selected = formData.details.includes(det);
                        return (
                          <button
                            key={det}
                            type="button"
                            onClick={() => handleToggleDetail(det)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                              selected
                                ? 'bg-secondary text-white border-secondary shadow-2xs'
                                : 'bg-surface-bright text-on-surface-variant border-outline-variant/40 hover:border-secondary'
                            }`}
                          >
                            {selected ? `✓ ${det}` : det}
                          </button>
                        );
                      })}
                    </div>
                    {/* Custom detail */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="+ Agregar otro detalle (Ej. Cierre de Oro Rosado)"
                        value={customDetailInput}
                        onChange={(e) => setCustomDetailInput(e.target.value)}
                        className="flex-1 bg-surface-bright px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomDetail}
                        className="px-3 py-1.5 bg-secondary/10 border border-secondary/30 text-secondary rounded-lg text-xs font-bold cursor-pointer hover:bg-secondary/20"
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>

                  {/* MATRIZ DE VARIANTES (COLOR / ESTAMPADO CON N FOTOS SEPARADAS Y STOCK POR TALLA) */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border-2 border-primary/30 space-y-4 font-sans">
                    <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface block font-bold">
                      🎨 Matriz de Variantes (Fotos e Imágenes Separadas por Variante):
                    </label>

                    {/* Form to Add Variant */}
                    <div className="bg-surface-bright p-3.5 rounded-xl border border-outline-variant/40 space-y-3">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                        + Configurar Nueva Variante (Color o Estampado):
                      </span>
                      <div className="flex gap-2">
                        <select
                          value={newVariantType}
                          onChange={(e) => setNewVariantType(e.target.value)}
                          className="bg-surface-container-low px-3 py-1.5 rounded-lg border text-xs font-bold font-sans"
                        >
                          <option value="color">Color Sólido</option>
                          <option value="pattern">Estampado / Pattern</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Nombre (ej. Rojo Pasión, Tropical, etc.)"
                          value={newVariantName}
                          onChange={(e) => setNewVariantName(e.target.value)}
                          className="flex-1 bg-surface-container-low px-3 py-1.5 rounded-lg border text-xs font-bold text-on-surface"
                        />
                        {newVariantType === 'color' && (
                          <input
                            type="color"
                            value={newVariantHex}
                            onChange={(e) => setNewVariantHex(e.target.value)}
                            className="w-8 h-8 rounded border cursor-pointer p-0.5 animate-fade-in"
                          />
                        )}
                      </div>

                      {newVariantType === 'pattern' && (
                        <div className="flex items-center gap-2 animate-fade-in">
                          <input
                            type="text"
                            placeholder="URL del estampado (http...)"
                            value={newVariantPatternUrl}
                            onChange={(e) => setNewVariantPatternUrl(e.target.value)}
                            className="flex-1 bg-surface-container-low px-3 py-1.5 rounded-lg border text-xs font-mono"
                          />
                          <label className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/30 rounded-lg text-xs font-bold cursor-pointer shrink-0">
                            Subir Estampado
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePatternFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}

                      {/* Multi-Photo Setup for new Variant */}
                      <div className="space-y-2 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase block">
                          📸 Fotos dedicadas para esta variante ({newVariantImageUrls.length} agregadas):
                        </span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Pega URL de foto para esta variante..."
                            value={newVariantSingleUrlInput}
                            onChange={(e) => setNewVariantSingleUrlInput(e.target.value)}
                            className="flex-1 bg-surface-bright px-3 py-1.5 rounded-lg border text-xs font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (newVariantSingleUrlInput.trim()) {
                                setNewVariantImageUrls((prev) => [...prev, newVariantSingleUrlInput.trim()]);
                                setNewVariantSingleUrlInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 cursor-pointer"
                          >
                            + Foto
                          </button>
                          <label className="px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/30 rounded-lg text-xs font-bold cursor-pointer shrink-0 hover:bg-secondary/20">
                            Subir Varios
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleVariantFileUploadMulti(e)}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {newVariantImageUrls.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {newVariantImageUrls.map((url, iIdx) => (
                              <div key={iIdx} className="relative w-12 h-14 rounded overflow-hidden border bg-surface-bright group">
                                <img src={url} alt={`Preview ${iIdx + 1}`} className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setNewVariantImageUrls((prev) => prev.filter((_, idx) => idx !== iIdx))}
                                  className="absolute top-0.5 right-0.5 bg-black/80 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error cursor-pointer"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* New Variant Sizes selection */}
                      <div>
                        <label className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">
                          Tallas iniciales para esta variante:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {defaultSizes.map((sz) => {
                            const isSelected = newVariantSizes.includes(sz);
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => {
                                  setNewVariantSizes((prev) =>
                                    isSelected ? prev.filter((s) => s !== sz) : [...prev, sz]
                                  );
                                }}
                                className={`px-2 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-primary text-on-primary shadow-2xs'
                                    : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/40'
                                }`}
                              >
                                {sz}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddVariantSubmit}
                        className="w-full py-2.5 bg-secondary text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-secondary/90 shadow-2xs cursor-pointer font-sans"
                      >
                        + Registrar Variante en Matriz
                      </button>
                    </div>

                    {/* Variant Cards with Multi-Photo Gallery & Size Matrix */}
                    <div className="space-y-4">
                      {formData.variants?.map((v, vIdx) => {
                        const variantPhotos = Array.isArray(v.variantImages) && v.variantImages.length > 0
                          ? v.variantImages
                          : [v.variantImage || v.patternImage].filter(Boolean);

                        return (
                          <div
                            key={v.id || vIdx}
                            className="bg-surface-bright p-4 rounded-xl border border-outline-variant/40 space-y-4 shadow-2xs animate-fade-in"
                          >
                            {/* Inline Edit Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-3 font-sans">
                              <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                                {v.type === 'color' ? (
                                  <input
                                    type="color"
                                    value={v.hex || '#CCCCCC'}
                                    onChange={(e) => handleUpdateVariantField(vIdx, 'hex', e.target.value)}
                                    className="w-7 h-7 rounded border cursor-pointer p-0.5 shrink-0"
                                    title="Editar color hexadecimal"
                                  />
                                ) : (
                                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-primary/40 shrink-0">
                                    <img
                                      src={v.patternImage || samplePatterns[0].patternImage}
                                      alt={v.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                
                                <input
                                  type="text"
                                  value={v.name || ''}
                                  onChange={(e) => handleUpdateVariantField(vIdx, 'name', e.target.value)}
                                  className="flex-1 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40 font-bold text-sm text-on-surface focus:border-primary outline-none"
                                  placeholder="Nombre de variante..."
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveVariant(v.id)}
                                className="text-xs text-error font-bold hover:underline cursor-pointer shrink-0 self-end sm:self-auto"
                              >
                                × Quitar Variante
                              </button>
                            </div>

                            {/* Pattern image file update if variant is pattern type */}
                            {v.type === 'pattern' && (
                              <div className="flex items-center gap-2 bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-xs">
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase shrink-0">Estampado:</span>
                                <input
                                  type="text"
                                  value={v.patternImage || ''}
                                  onChange={(e) => handleUpdateVariantField(vIdx, 'patternImage', e.target.value)}
                                  placeholder="URL imagen estampado..."
                                  className="flex-1 bg-surface-bright px-2 py-1 rounded border text-xs font-mono"
                                />
                                <label className="px-2.5 py-1 bg-primary/10 border text-primary rounded font-bold cursor-pointer shrink-0 hover:bg-primary/20">
                                  Cambiar Estampado
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePatternFileUpload(e, vIdx)}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            )}

                            {/* MULTI-PHOTO GALLERY FOR THIS SPECIFIC VARIANT */}
                            <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 space-y-3">
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block">
                                📸 Galería de N fotos exclusivas para &quot;{v.name}&quot; ({variantPhotos.length} fotos):
                              </span>

                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Pega la URL de una foto para esta variante..."
                                  id={`input-add-photo-var-${vIdx}`}
                                  className="flex-1 bg-surface-bright px-3 py-1.5 rounded-lg border text-xs font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const inputEl = document.getElementById(`input-add-photo-var-${vIdx}`);
                                    if (inputEl && inputEl.value.trim()) {
                                      handleAddVariantImage(vIdx, inputEl.value.trim());
                                      inputEl.value = '';
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 cursor-pointer"
                                >
                                  + Foto
                                </button>
                                <label className="px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/30 rounded-lg text-xs font-bold cursor-pointer shrink-0 hover:bg-secondary/20">
                                  Subir Fotos
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleVariantFileUploadMulti(e, vIdx)}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              {/* Thumbnails list for this variant */}
                              <div className="flex flex-wrap gap-2 pt-1">
                                {variantPhotos.map((imgUrl, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    className="relative w-14 h-16 rounded-lg overflow-hidden border bg-surface-bright group shadow-2xs"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`Foto ${imgIdx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveVariantImage(vIdx, imgIdx)}
                                      className="absolute top-0.5 right-0.5 bg-black/80 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error cursor-pointer"
                                      title="Quitar foto"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Sizes Matrix & Stock Quantity controls */}
                            <div className="space-y-2">
                              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block">
                                Activa tallas e ingresa las unidades de stock para &quot;{v.name}&quot;:
                              </span>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {defaultSizes.map((sz) => {
                                  const sizeObj = v.sizesWithStock?.find((item) => item.size === sz);
                                  const isSizeActive = !!sizeObj;
                                  return (
                                    <div
                                      key={sz}
                                      className={`flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                                        isSizeActive
                                          ? 'bg-secondary/5 border-secondary/40 text-secondary'
                                          : 'bg-surface-container-lowest border-outline-variant/20 opacity-55 hover:opacity-100'
                                      }`}
                                    >
                                      <button
                                        type="button"
                                        onClick={() => handleToggleVariantSizeStock(vIdx, sz)}
                                        className="font-bold flex-1 text-left cursor-pointer"
                                      >
                                        {isSizeActive ? `✓ ${sz}` : sz}
                                      </button>
                                      
                                      {isSizeActive && (
                                        <input
                                          type="number"
                                          min="0"
                                          value={sizeObj.stock}
                                          onChange={(e) => handleUpdateVariantSizeStockValue(vIdx, sz, e.target.value)}
                                          className="w-12 bg-surface-bright border border-outline-variant/60 rounded text-center font-mono font-bold text-xs p-0.5 text-on-surface ml-2"
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {(!formData.variants || formData.variants.length === 0) && (
                        <div className="text-center py-6 text-xs text-on-surface-variant bg-surface-bright rounded-xl border border-dashed border-outline-variant/40 font-sans">
                          Ingresa colores o estampados con el panel superior.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* IMÁGENES GENERALES */}
              <div className="pt-2">
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                  🖼️ Galería General de Imágenes ({formData.images.length})
                </label>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Pega la URL de una imagen..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-surface-container-low px-3 py-2 rounded-xl border text-xs font-mono outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageLink}
                    className="px-4 py-2 bg-surface-container-high border rounded-xl text-xs font-bold"
                  >
                    + Enlace
                  </button>
                  <label className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 cursor-pointer flex items-center justify-center gap-1">
                    Subir Archivo
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 bg-surface-container-low p-3 rounded-xl border">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden border bg-surface-bright group animate-fade-in"
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold shadow-md text-sm font-sans"
                >
                  {editingProductId ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-6 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs font-bold font-sans"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryCopy;
