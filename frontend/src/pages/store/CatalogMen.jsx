import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoreProducts, fetchStoreProducts } from '../../data/products';
import { fetchDbCategories } from '../../data/categories';
import { sortSizes } from '../../utils/sortSizes';

const normalizeCatName = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const CatalogMen = () => {
  const [allProducts, setAllProducts] = useState(getStoreProducts);
  const [dbCategories, setDbCategories] = useState([]);

  useEffect(() => {
    fetchDbCategories().then(setDbCategories);
    fetchStoreProducts().then((data) => {
      if (Array.isArray(data)) setAllProducts(data);
    });

    const handleUpdate = () => {
      fetchStoreProducts().then((data) => {
        if (Array.isArray(data)) setAllProducts(data);
      });
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('inventoryUpdated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('inventoryUpdated', handleUpdate);
    };
  }, []);

  // Filter base products for Men
  const menProducts = allProducts.filter((p) => {
    const g = (p.gender || '').toLowerCase();
    const c = (p.category || '').toLowerCase();
    const rawC = (p.rawCategory || '').toLowerCase();
    return g === 'hombre' || c.includes('hombre') || rawC.includes('hombre');
  });

  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);

  const dbMenCategoryNames = dbCategories
    .filter((c) => c.gender === 'Hombre')
    .map((c) => c.name);

  // Baseline categories for Men's catalog to ensure menu categories NEVER disappear
  const defaultCategoryNames = dbMenCategoryNames.length > 0 ? dbMenCategoryNames : [
    'Pijamas de Seda',
    'Ropa de Estar',
    'Básicos',
    'Ediciones Limitadas',
  ];

  // Merge default categories with any new custom admin categories
  const allCategoryNames = Array.from(
    new Set([
      ...defaultCategoryNames,
      ...menProducts.map((p) => p.category).filter(Boolean),
    ])
  );

  const categories = [
    { name: 'Todos', count: menProducts.length },
    ...allCategoryNames.map((catName) => ({
      name: catName,
      count: menProducts.filter((p) => {
        const normP = normalizeCatName(p.category);
        const normTarget = normalizeCatName(catName);
        return normP === normTarget || normP.includes(normTarget) || normTarget.includes(normP);
      }).length,
    })),
  ];

  const allAvailableSizes = sortSizes(
    Array.from(new Set(menProducts.flatMap((p) => p.availableSizes || [])))
  );
  const sizes = allAvailableSizes.length > 0 ? allAvailableSizes : ['S', 'M', 'L', 'XL', 'XXL'];

  const colors = [
    { id: 'Carbon Black', name: 'Carbon Black', hex: '#1A1A1A' },
    { id: 'Navy Blue', name: 'Navy Blue', hex: '#1E2A44' },
    { id: 'Sand', name: 'Sand', hex: '#D2B48C' },
    { id: 'Pure White', name: 'Pure White', hex: '#FFFFFF' },
    { id: 'Grey Melange', name: 'Grey Melange', hex: '#5D5E60' },
  ];

  const resetFilters = () => {
    setActiveCategory('Todos');
    setActiveColor(null);
    setActiveSize(null);
    setMaxPrice(0);
  };

  const formatColones = (amount) => {
    return `₡${Number(amount || 0).toLocaleString('es-CR')}`;
  };

  // Filter products based on selected filters
  const filteredProducts = menProducts.filter((product) => {
    const normProductCat = normalizeCatName(product.category);
    const normActiveCat = normalizeCatName(activeCategory);

    const matchesCategory =
      activeCategory === 'Todos' ||
      normProductCat === normActiveCat ||
      normProductCat.includes(normActiveCat) ||
      normActiveCat.includes(normProductCat);

    const matchesColor =
      !activeColor ||
      product.color === activeColor ||
      product.availableColors?.some((c) => c.id === activeColor || c.name === activeColor);
    const matchesSize =
      !activeSize || product.availableSizes?.includes(activeSize);
    const matchesPrice = maxPrice === 0 || product.price <= maxPrice;
    return matchesCategory && matchesColor && matchesSize && matchesPrice;
  });

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col md:flex-row gap-12 font-sans">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-10 sticky top-24 h-fit">
        {/* Category Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Categoría
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  onClick={() => setActiveCategory(cat.name)}
                  className={`font-body-md text-body-md transition-all flex justify-between w-full cursor-pointer ${
                    activeCategory === cat.name
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-on-surface-variant/40 font-normal">
                    {cat.count < 10 ? `0${cat.count}` : cat.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Size Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Talla
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(activeSize === size ? null : size)}
                className={`h-10 text-label-sm flex items-center justify-center transition-all cursor-pointer rounded-lg ${
                  activeSize === size
                    ? 'border-2 border-primary bg-primary text-on-primary font-bold shadow-sm'
                    : 'border border-outline-variant hover:border-primary text-on-surface'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Color
          </h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() =>
                  setActiveColor(activeColor === color.id ? null : color.id)
                }
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  activeColor === color.id
                    ? 'ring-2 ring-primary ring-offset-2 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {activeColor === color.id && (
                  <span
                    className={`material-symbols-outlined text-xs ${
                      color.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                    }`}
                  >
                    check
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold">
              Precio Máximo
            </h3>
            <span className="font-mono text-xs text-primary font-bold">
              {maxPrice > 0 ? formatColones(maxPrice) : 'Todos'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="120000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>

        {/* Reset Filters */}
        {(activeCategory !== 'Todos' || activeColor || activeSize || maxPrice > 0) && (
          <button
            onClick={resetFilters}
            className="w-full py-2.5 border border-outline-variant text-on-surface-variant hover:text-error hover:border-error text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            Limpiar Filtros ×
          </button>
        )}
      </aside>

      {/* Main Catalog Grid */}
      <section className="flex-1 space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-outline-variant/20">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Colección Masculina ({filteredProducts.length})
            </h1>
            <p className="font-body-md text-on-surface-variant text-sm mt-1">
              Prendas de descanso y pijamas masculinas de seda.
            </p>
          </div>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group flex flex-col space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low rounded-2xl border border-outline-variant/20">
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-10 font-bold shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.isCustomAdmin && (
                  <span className="absolute top-3 right-3 bg-secondary text-white font-label-sm text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full z-10 font-bold shadow-xs border border-white/20">
                    ⚡ Nuevo Admin
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <Link
                    to={`/product/${product.id}`}
                    state={{ selectedColor: activeColor, selectedSize: activeSize }}
                    className="w-full py-3 bg-surface-bright/95 text-on-surface text-center font-label-sm text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all shadow-md"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-mono block">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="font-headline-md text-base font-bold text-on-surface hover:text-primary transition-colors block mt-0.5 truncate"
                >
                  {product.name}
                </Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-bold text-primary text-sm">
                    {formatColones(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-on-surface-variant/50 line-through">
                      {formatColones(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/40 space-y-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
              inventory_2
            </span>
            <p className="text-sm font-bold text-on-surface-variant">
              No se encontraron productos en la colección masculina.
            </p>
            <button
              onClick={resetFilters}
              className="text-xs text-primary font-bold underline cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default CatalogMen;
