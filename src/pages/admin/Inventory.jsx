import React, { useState, useEffect } from 'react';
import { products as catalogProducts } from '../../data/products';

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

const initialInventory = catalogProducts.map((p) => ({
  id: p.id.toString(),
  name: p.name,
  sku: `KAR-${p.gender ? p.gender.substring(0, 1) : 'W'}-${p.id.toString().padStart(3, '0')}`,
  category: `${p.gender || 'Mujer'} / ${p.category}`,
  stock: Math.floor(Math.random() * 35) + 3,
  price: p.price,
  availableSizes: p.availableSizes || ['S', 'M', 'L'],
  availableColors: p.availableColors || [defaultColors[0], defaultColors[1]],
  images: [p.image, ...(p.thumbnails || [])].filter(Boolean),
}));

const Inventory = () => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_admin_inventory');
      return saved ? JSON.parse(saved) : initialInventory;
    } catch {
      return initialInventory;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [toastMessage, setToastMessage] = useState('');

  // Add / Edit Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Mujer / Lencería de Seda',
    price: '',
    stock: '',
    availableSizes: ['S', 'M', 'L'],
    availableColors: [defaultColors[0]],
    images: [],
  });

  // Custom Color Input State inside modal
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#E6D7D2');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Bulk Add Modal State
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkInputText, setBulkInputText] = useState('');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karisme_admin_inventory', JSON.stringify(products));
    } catch {
      // fallback
    }
  }, [products]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const categoriesList = [
    'Todos',
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'Todos' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id, name) => {
    if (confirm(`¿Seguro que deseas eliminar "${name}" del inventario?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      triggerToast(`Producto "${name}" eliminado del inventario.`);
    }
  };

  // Open modal for Adding new product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      sku: `KAR-W-${(Date.now() % 1000).toString().padStart(3, '0')}`,
      category: 'Mujer / Lencería de Seda',
      price: '35000',
      stock: '15',
      availableSizes: ['S', 'M', 'L'],
      availableColors: [defaultColors[0], defaultColors[1]],
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
      ],
    });
    setNewImageUrl('');
    setIsFormModalOpen(true);
  };

  // Open modal for Editing existing product
  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      availableSizes: [...(product.availableSizes || [])],
      availableColors: [...(product.availableColors || [])],
      images: [...(product.images || [])],
    });
    setNewImageUrl('');
    setIsFormModalOpen(true);
  };

  // Toggle size chip selection
  const handleToggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.availableSizes.includes(size);
      const nextSizes = exists
        ? prev.availableSizes.filter((s) => s !== size)
        : [...prev.availableSizes, size];
      return { ...prev, availableSizes: nextSizes };
    });
  };

  // Toggle color swatch selection
  const handleToggleColor = (col) => {
    setFormData((prev) => {
      const exists = prev.availableColors.some((c) => c.id === col.id);
      const nextColors = exists
        ? prev.availableColors.filter((c) => c.id !== col.id)
        : [...prev.availableColors, col];
      return { ...prev, availableColors: nextColors };
    });
  };

  // Add custom color
  const handleAddCustomColor = (e) => {
    e.preventDefault();
    if (!customColorName.trim()) return;
    const newCol = {
      id: customColorName.trim(),
      name: customColorName.trim(),
      hex: customColorHex,
    };
    if (!formData.availableColors.some((c) => c.id === newCol.id)) {
      setFormData((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, newCol],
      }));
    }
    setCustomColorName('');
  };

  // Image Upload / Adding link
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
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  // Save product form submit
  const handleSaveProductSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.sku.trim() || !formData.price) {
      triggerToast('Por favor completa los campos requeridos (Nombre, SKU y Precio).');
      return;
    }

    const priceNum = Number(formData.price) || 0;
    const stockNum = Number(formData.stock) || 0;

    if (editingProductId) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
                ...p,
                name: formData.name.trim(),
                sku: formData.sku.trim(),
                category: formData.category,
                price: priceNum,
                stock: stockNum,
                availableSizes: formData.availableSizes,
                availableColors: formData.availableColors,
                images:
                  formData.images.length > 0
                    ? formData.images
                    : [
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
                      ],
              }
            : p
        )
      );
      triggerToast(`Producto "${formData.name}" actualizado con éxito.`);
    } else {
      // Add new product
      const newProd = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        category: formData.category,
        price: priceNum,
        stock: stockNum,
        availableSizes: formData.availableSizes,
        availableColors: formData.availableColors,
        images:
          formData.images.length > 0
            ? formData.images
            : [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
              ],
      };
      setProducts((prev) => [newProd, ...prev]);
      triggerToast(`Nuevo producto "${newProd.name}" creado con éxito.`);
    }

    setIsFormModalOpen(false);
  };

  // Bulk import process
  const handleBulkImportSubmit = (e) => {
    e.preventDefault();
    if (!bulkInputText.trim()) return;

    try {
      let importedList = [];
      const trimmed = bulkInputText.trim();

      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        // Try parsing JSON
        const parsed = JSON.parse(trimmed);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        importedList = arr.map((item, idx) => ({
          id: (Date.now() + idx).toString(),
          name: item.name || `Producto Bulk ${idx + 1}`,
          sku: item.sku || `KAR-BLK-${idx + 100}`,
          category: item.category || 'Mujer / Lencería',
          price: Number(item.price) || 25000,
          stock: Number(item.stock) || 10,
          availableSizes: item.sizes || ['S', 'M', 'L'],
          availableColors: item.colors || [defaultColors[0]],
          images: item.image
            ? [item.image]
            : [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
              ],
        }));
      } else {
        // Parse CSV / Line by line (Name, SKU, Category, Price, Stock)
        const lines = trimmed.split('\n');
        importedList = lines
          .map((line, idx) => {
            const parts = line.split(',').map((p) => p.trim());
            if (!parts[0]) return null;
            return {
              id: (Date.now() + idx).toString(),
              name: parts[0],
              sku: parts[1] || `KAR-BLK-${idx + 101}`,
              category: parts[2] || 'Mujer / Intimates',
              price: Number(parts[3]) || 28000,
              stock: Number(parts[4]) || 12,
              availableSizes: ['S', 'M', 'L'],
              availableColors: [defaultColors[0]],
              images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
              ],
            };
          })
          .filter(Boolean);
      }

      if (importedList.length > 0) {
        setProducts((prev) => [...importedList, ...prev]);
        triggerToast(
          `¡Se importaron ${importedList.length} productos correctamente!`
        );
        setIsBulkModalOpen(false);
        setBulkInputText('');
      } else {
        triggerToast('No se pudieron procesar productos del texto ingresado.');
      }
    } catch (err) {
      triggerToast(`Error al procesar formato: ${err.message}`);
    }
  };

  const formatColones = (val) => `₡${Number(val).toLocaleString('es-CR')}`;

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm border border-outline-variant">
          ✨ {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Gestión de Inventario ({products.length})
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-xl mt-1">
            Edita productos, administra stock, configura tallas/colores disponibles y sube múltiples imágenes por artículo.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="flex-1 md:flex-none border border-primary text-primary px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider hover:bg-primary/10 transition-all font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Carga Masiva (Bulk)
          </button>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex-1 md:flex-none bg-primary text-on-primary px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 font-label-sm text-xs uppercase tracking-wider hover:bg-primary/90 transition-all font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Añadir Producto
          </button>
        </div>
      </header>

      {/* Filters & Search Bar */}
      <section className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-outline-variant/40 focus:border-primary rounded-xl font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
            placeholder="Buscar por SKU, nombre o categoría..."
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <label className="text-xs font-bold text-on-surface-variant shrink-0 uppercase tracking-wider">
            Categoría:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto bg-surface-bright border border-outline-variant/40 rounded-xl px-4 py-2 text-xs font-bold text-on-surface outline-none cursor-pointer"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Product List Table / Grid */}
      <div className="bg-surface-bright rounded-2xl border border-outline-variant/30 shadow-xs overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30 font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
                <th className="py-4 px-6 font-bold">Producto</th>
                <th className="py-4 px-4 font-bold">Categoría & SKU</th>
                <th className="py-4 px-4 font-bold">Precio</th>
                <th className="py-4 px-4 font-bold">Stock</th>
                <th className="py-4 px-4 font-bold">Variantes</th>
                <th className="py-4 px-6 text-right font-bold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((p) => {
                const isLowStock = p.stock < 8;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-surface-container-lowest transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-surface-variant border border-outline-variant/30 shrink-0">
                          <img
                            src={p.images?.[0] || p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                          {p.images?.length > 1 && (
                            <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] px-1 rounded font-mono font-bold">
                              +{p.images.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-on-surface truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-on-surface-variant font-mono">
                            {p.images?.length || 1} imágen(es)
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <p className="text-xs font-bold text-on-surface truncate">
                        {p.category}
                      </p>
                      <p className="text-[11px] font-mono text-on-surface-variant">
                        {p.sku}
                      </p>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-bold text-secondary text-sm">
                        {formatColones(p.price)}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">
                          {p.stock} un.
                        </span>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isLowStock
                              ? 'bg-error/15 text-error'
                              : 'bg-secondary/15 text-secondary'
                          }`}
                        >
                          {isLowStock ? 'Bajo Stock' : 'Disponible'}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {p.availableSizes?.map((s) => (
                            <span
                              key={s}
                              className="text-[9px] bg-surface-container px-1.5 py-0.5 rounded font-bold text-on-surface-variant"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1 items-center">
                          {p.availableColors?.map((c) => (
                            <span
                              key={c.id || c.name}
                              className="w-3 h-3 rounded-full border border-outline-variant/50 shadow-2xs"
                              style={{ backgroundColor: c.hex || '#ccc' }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>
                    </td>

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

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                      inventory_2
                    </span>
                    <p className="text-sm text-on-surface-variant font-medium">
                      No se encontraron productos coincidentes.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  {editingProductId ? 'edit_square' : 'add_box'}
                </span>
                <h3 className="font-headline-md text-headline-md">
                  {editingProductId
                    ? 'Editar Producto del Inventario'
                    : 'Añadir Nuevo Producto'}
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

            <form onSubmit={handleSaveProductSubmit} className="space-y-5">
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
                    Categoría
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Mujer / Lencería de Seda"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-bold"
                  />
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

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Unidades en Stock
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold"
                  />
                </div>
              </div>

              {/* Tallas Disponibles (Chips) */}
              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                  Tallas Disponibles (Haz clic para seleccionar):
                </label>
                <div className="flex flex-wrap gap-2">
                  {defaultSizes.map((sz) => {
                    const selected = formData.availableSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selected
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/40 hover:border-primary'
                        }`}
                      >
                        {selected ? `✓ ${sz}` : sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colores Disponibles (Swatches & Custom) */}
              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                  Colores Disponibles (Haz clic para seleccionar):
                </label>
                <div className="flex flex-wrap gap-2.5 mb-3">
                  {defaultColors.map((col) => {
                    const selected = formData.availableColors.some(
                      (c) => c.id === col.id
                    );
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => handleToggleColor(col)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selected
                            ? 'bg-secondary/15 border-secondary text-secondary'
                            : 'bg-surface-container-low border-outline-variant/40 text-on-surface-variant'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: col.hex }}
                        />
                        {col.name} {selected && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Add Custom Color inline */}
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
                  <span className="text-xs font-bold text-on-surface-variant shrink-0">
                    + Color personalizado:
                  </span>
                  <input
                    type="text"
                    placeholder="Nombre (ej. Verde Menta)"
                    value={customColorName}
                    onChange={(e) => setCustomColorName(e.target.value)}
                    className="flex-1 bg-surface-bright px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-medium outline-none"
                  />
                  <input
                    type="color"
                    value={customColorHex}
                    onChange={(e) => setCustomColorHex(e.target.value)}
                    className="w-8 h-8 rounded border border-outline-variant/40 cursor-pointer p-0.5"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="px-3 py-1.5 bg-secondary text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-secondary/90 shrink-0"
                  >
                    Agregar Color
                  </button>
                </div>
              </div>

              {/* N Images Gallery Support */}
              <div className="pt-2">
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold flex items-center justify-between">
                  <span>Galería de Imágenes del Producto ({formData.images.length})</span>
                  <span className="text-[10px] text-secondary font-mono">
                    Admite N imágenes (Link o Archivo)
                  </span>
                </label>

                {/* Adding Image Input */}
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Pega la URL de una imagen (http...)"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-surface-container-low px-3.5 py-2 rounded-xl border border-outline-variant/50 text-xs font-mono text-on-surface outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageLink}
                    className="px-4 py-2 bg-surface-container-high border border-outline-variant text-on-surface rounded-xl text-xs font-bold hover:bg-surface-variant cursor-pointer shrink-0"
                  >
                    + Enlace
                  </button>

                  <label className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 cursor-pointer shrink-0 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-base">upload</span>
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

                {/* Thumbnail List */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-bright group"
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-primary text-on-primary text-[8px] px-1 rounded font-bold uppercase">
                          Portada
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error cursor-pointer"
                        title="Eliminar imagen"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  ))}

                  {formData.images.length === 0 && (
                    <div className="col-span-full text-center py-4 text-xs text-on-surface-variant">
                      No hay imágenes agregadas aún. Usa el enlace o el botón de subida.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold shadow-md"
                >
                  {editingProductId ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-6 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Add Products Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-xl w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-8">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  upload_file
                </span>
                <h3 className="font-headline-md text-headline-md">
                  Carga Masiva de Productos (Bulk Import)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
              Pega tus datos en formato **CSV por líneas** (<code>Nombre, SKU, Categoría, Precio, Stock</code>) o un **arreglo JSON de productos**.
            </p>

            <form onSubmit={handleBulkImportSubmit} className="space-y-4">
              <textarea
                rows={8}
                value={bulkInputText}
                onChange={(e) => setBulkInputText(e.target.value)}
                placeholder={`Ejemplo CSV:\nBralette Silk Rose, KAR-001, Lencería de Seda, 32500, 10\nSet Pajama Cloud, KAR-002, Ropa de Estar, 45000, 15\n\nO arreglo JSON:\n[\n  { "name": "Bodysuit Lace", "sku": "KAR-003", "price": 55000, "stock": 8 }\n]`}
                className="w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant/50 font-mono text-xs text-on-surface outline-none focus:border-primary"
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold shadow-md"
                >
                  Procesar e Importar
                </button>
                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs"
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

export default Inventory;
