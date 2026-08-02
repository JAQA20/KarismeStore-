import React, { useState } from 'react';

const initialProducts = [
  {
    id: '1',
    name: 'Camisón de Seda Aurora',
    variant: 'Talla: M | Color: Rosa Soft',
    sku: 'LUM-SD-001',
    category: 'Mujer / Dormir',
    stock: 4,
    stockStatus: 'Stock Muy Bajo',
    price: '€ 85.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM19kCIwcPricekF9dvXIF7_K_ghujZV9jysCD8YcUozzKPmDwRdfsZfjw9jF2eMstIrCrz6Y21p4mk9RSCnuV2sFU-c0m8b7rWR0-O01jPLOQ8bEEWa1hW_EYtLpOfLR7cNiKXFqucwiuKGLE1GLKTifan_B9KDdFNhECi2PS3-D-uw_Ly-idJ2rYd-ppYBs_WwNzj1SmjuQc2Ux6YAY4cxAl1jPj8V3NaqXRC6YFfngdHjEez1j'
  },
  {
    id: '2',
    name: 'Boxer Algodón Orgánico',
    variant: 'Talla: L | Color: Gris Carbón',
    sku: 'LUM-HN-204',
    category: 'Hombre / Básico',
    stock: 128,
    stockStatus: 'Normal',
    price: '€ 24.50',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2XKo7UVUinqtuNa-fj45PMvngp5h7M6RC7zCxe4OKqwpkgPzV9q_1v3mJjZ3mXh_rfRf1IXhZ8Hxs-7dm2LNTmguvSpNIHo__uLnPvYXTEuwTDUtZ23Gi4WQuBvT_c4RI6gdQ8Y6aItP5G9QkaMlAoqcPh65E-EHiXOtXYYvSfm6jy9oL7DPl32CY0lBSre45r1I9M-j7sbJJq6mJ9rJCH8OwnTTukLavF-6i9ohrewK6z1IHF08'
  },
  {
    id: '3',
    name: 'Pijama Waffle Infantil',
    variant: 'Talla: 4Y | Color: Crema',
    sku: 'LUM-KI-552',
    category: 'Niños / Dormir',
    stock: 18,
    stockStatus: 'Re-stock sugerido',
    price: '€ 42.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH_UWNKWgfoG9owzdBfBFZYftFYpdLihgWr4Tl-wSCfUjVvDT6Ev1pq-Zhd8-5fviEvDLvrUzkZLBXXsI0zzGWbP1Kbv3NVN14sZLxkw69yVb_oUvmXXXjL4ZM311VlY6fDo9GCj2txUlOA78d_SMIndZuA5wTL2oybnXVpVRsCBH41f5Kht26xVHUBtaLUVyjaVVB54gdnSl2W4eW51vfYg5KZQbQstuyHPWk23HU5sqJO_MLNva7'
  },
  {
    id: '4',
    name: 'Bralette Seamless Lace',
    variant: 'Talla: S | Color: Champagne',
    sku: 'LUM-SD-042',
    category: 'Mujer / Intimates',
    stock: 45,
    stockStatus: 'Normal',
    price: '€ 38.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3Gg5ztzMjdLA_5m1jaEt53rXmmzB3j1fysaE7D64w5j6gpuOioF3NQNJyYv9kje_jrGSX99_rlmWMy-AXg1vTmEP-2o5AbONKebuPImtgvUGLYBozc-2uTZyKoLzTtjw2Sc19lltz-jaFYi-BZRy6X_ZW1Focu1NfLiu8g59c_OaQBqx_da9tE5_oAQZpfd6_VUzPGEulueWBDkmzWb0NQFBp7AISyxgcN5q7zGbX_A0-6yyRYbs_'
  }
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Mujer / Intimates',
    sku: '',
    price: '',
    stock: ''
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, name) => {
    setProducts(products.filter(p => p.id !== id));
    triggerToast(`Producto "${name}" eliminado del inventario.`);
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.sku || !newProduct.price) {
      triggerToast('Por favor completa todos los campos requeridos.');
      return;
    }
    const created = {
      id: Date.now().toString(),
      name: newProduct.name,
      variant: 'Talla: Única | Color: Estándar',
      sku: newProduct.sku,
      category: newProduct.category,
      stock: Number(newProduct.stock) || 10,
      stockStatus: Number(newProduct.stock) < 5 ? 'Stock Muy Bajo' : 'Normal',
      price: `€ ${newProduct.price}`,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM19kCIwcPricekF9dvXIF7_K_ghujZV9jysCD8YcUozzKPmDwRdfsZfjw9jF2eMstIrCrz6Y21p4mk9RSCnuV2sFU-c0m8b7rWR0-O01jPLOQ8bEEWa1hW_EYtLpOfLR7cNiKXFqucwiuKGLE1GLKTifan_B9KDdFNhECi2PS3-D-uw_Ly-idJ2rYd-ppYBs_WwNzj1SmjuQc2Ux6YAY4cxAl1jPj8V3NaqXRC6YFfngdHjEez1j'
    };
    setProducts([created, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', category: 'Mujer / Intimates', sku: '', price: '', stock: '' });
    triggerToast(`Producto "${created.name}" agregado con éxito.`);
  };

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Gestión de Inventario</h2>
          <p className="font-body-md text-on-surface-variant max-w-xl mt-2">Supervisa el stock de productos, actualiza precios y gestiona el catálogo de Karisme Innerwear con precisión editorial.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-on-primary px-8 py-3 rounded-full flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10 cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          Añadir Producto
        </button>
      </header>

      {/* Filters & Search Bar */}
      <section className="mb-8 flex flex-col md:flex-row gap-gutter items-center justify-between">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none" 
            placeholder="Buscar por SKU, nombre o categoría..." 
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => triggerToast('Filtros avanzados activos')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high rounded-xl text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">filter_list</span>
            Filtrar
          </button>
          <button 
            onClick={() => triggerToast('Exportando reporte de inventario...')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high rounded-xl text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">download</span>
            Exportar
          </button>
        </div>
      </section>

      {/* Inventory Table Container */}
      <section className="bg-surface-bright rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant/50">
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Imagen</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Producto</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">SKU</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Categoría</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Stock</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Precio</th>
                <th className="px-6 py-5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-[rgba(111,89,87,0.04)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-14 h-18 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/20 aspect-[3/4]">
                        <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-headline-md text-body-md font-bold text-on-surface">{product.name}</p>
                      <p className="text-[12px] text-on-surface-variant">{product.variant}</p>
                    </td>
                    <td className="px-6 py-4">
                      <code className="font-label-sm text-label-sm text-primary font-mono bg-primary-container/30 px-2 py-1 rounded">{product.sku}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body-md text-on-surface-variant">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          product.stock < 10 ? 'bg-error animate-pulse' : product.stock < 20 ? 'bg-yellow-500' : 'bg-secondary'
                        }`}></span>
                        <span className={`font-bold ${product.stock < 10 ? 'text-error' : 'text-on-surface'}`}>{product.stock} unidades</span>
                      </div>
                      {product.stockStatus !== 'Normal' && (
                        <p className={`text-[10px] font-medium uppercase mt-1 ${product.stock < 10 ? 'text-error' : 'text-yellow-600'}`}>
                          {product.stockStatus}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-headline-md text-body-md font-semibold text-on-surface">{product.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => triggerToast(`Editando "${product.name}"`)}
                          className="p-2 hover:bg-primary-container rounded-full text-primary transition-colors cursor-pointer" 
                          title="Editar"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 hover:bg-error-container rounded-full text-error transition-colors cursor-pointer" 
                          title="Eliminar"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-on-surface-variant font-body-md">
                    No se encontraron productos coincidentes en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/30 flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Mostrando {filteredProducts.length} de {products.length} productos</span>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant disabled:opacity-30" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-sm text-label-sm">1</button>
            <button className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleAddProductSubmit} className="bg-surface-bright rounded-2xl p-8 max-w-md w-full shadow-2xl border border-outline-variant/30 space-y-4 animate-fade-in">
            <h3 className="font-headline-md text-on-surface mb-2">Añadir Nuevo Producto</h3>
            <div>
              <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1">Nombre</label>
              <input 
                type="text" 
                required
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Ej. Camisola Seda Pura"
                className="w-full bg-surface-container-low px-4 py-2 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1">SKU</label>
              <input 
                type="text" 
                required
                value={newProduct.sku}
                onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                placeholder="Ej. LUM-SD-999"
                className="w-full bg-surface-container-low px-4 py-2 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1">Precio (€)</label>
                <input 
                  type="number" 
                  required
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="89.00"
                  className="w-full bg-surface-container-low px-4 py-2 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="font-label-sm text-xs uppercase text-on-surface-variant block mb-1">Stock Inicial</label>
                <input 
                  type="number" 
                  required
                  value={newProduct.stock}
                  onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                  placeholder="25"
                  className="w-full bg-surface-container-low px-4 py-2 rounded-xl text-sm border-none focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90">Guardar Producto</button>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {/* Stats Overview Cards */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-gutter pb-section-gap">
        <div className="bg-surface-container-low p-8 rounded-2xl flex items-center gap-6 border border-outline-variant/10">
          <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">inventory</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Stock Total</p>
            <p className="font-headline-md text-headline-md text-on-surface">3,240 <span className="text-body-md font-normal opacity-50">uds.</span></p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-2xl flex items-center gap-6 border border-outline-variant/10">
          <div className="w-12 h-12 rounded-full bg-error-container/30 flex items-center justify-center text-error">
            <span className="material-symbols-outlined">warning</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Agotándose</p>
            <p className="font-headline-md text-headline-md text-error">12 <span className="text-body-md font-normal opacity-50">SKUs</span></p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-2xl flex items-center gap-6 border border-outline-variant/10">
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Valor Inventario</p>
            <p className="font-headline-md text-headline-md text-on-surface">€ 142.5k</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inventory;
