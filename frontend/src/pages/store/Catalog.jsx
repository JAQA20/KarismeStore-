import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getStoreProducts, fetchStoreProducts } from '../../data/products';
import { fetchDbCategories } from '../../data/categories';
import { sortSizes } from '../../utils/sortSizes';

const normalizeCatName = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState(getStoreProducts);
  const [dbCategories, setDbCategories] = useState([]);

  const categoryParam = searchParams.get('cat');
  const initialCategory = (categoryParam && categoryParam.toLowerCase() !== 'mujer')
    ? categoryParam
    : 'Todos';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);

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

  // Update activeCategory if query param changes
  useEffect(() => {
    if (categoryParam && categoryParam.toLowerCase() !== 'mujer') {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter base products for Women
  const womenProducts = allProducts.filter(
    (p) => p.gender === 'Mujer' || (p.gender || '').toLowerCase() === 'mujer' || !p.gender
  );

  const dbWomenCategoryNames = dbCategories
    .filter((c) => c.gender === 'Mujer')
    .map((c) => c.name);

  // Baseline categories for Women's catalog to ensure menu categories NEVER disappear
  const defaultCategoryNames = dbWomenCategoryNames.length > 0 ? dbWomenCategoryNames : [
    'Lencería de Seda',
    'Ropa de Estar',
    'Básicos de Algodón',
    'Ediciones Limitadas',
  ];

  // Merge default categories with any new custom admin categories
  const allCategoryNames = Array.from(
    new Set([
      ...defaultCategoryNames,
      ...womenProducts.map((p) => p.category).filter(Boolean),
    ])
  );

  const categories = [
    { name: 'Todos', count: womenProducts.length },
    ...allCategoryNames.map((catName) => ({
      name: catName,
      count: womenProducts.filter((p) => {
        const normP = normalizeCatName(p.category);
        const normTarget = normalizeCatName(catName);
        return normP === normTarget || normP.includes(normTarget) || normTarget.includes(normP);
      }).length,
    })),
  ];

  const allAvailableSizes = sortSizes(
    Array.from(new Set(womenProducts.flatMap((p) => p.availableSizes || [])))
  );
  const sizes = allAvailableSizes.length > 0 ? allAvailableSizes : ['XS', 'S', 'M', 'L', 'XL'];

  const colors = [
    { id: 'Champagne', name: 'Champán', hex: '#F5F5DC' },
    { id: 'Midnight Black', name: 'Negro Azabache', hex: '#2C2C2C' },
    { id: 'Soft Rose', name: 'Rosa Soft', hex: '#E6D7D2' },
    { id: 'Pure White', name: 'Blanco Puro', hex: '#FFFFFF' },
    { id: 'Dusty Blue', name: 'Azul Polvo', hex: '#4A4E69' },
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
  const filteredProducts = womenProducts.filter((product) => {
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
                className={`py-2 text-xs font-bold rounded-lg border border-outline-variant/30 transition-all cursor-pointer ${
                  activeSize === size
                    ? 'bg-primary text-on-primary border-primary'
                    : 'hover:border-primary/50 text-on-surface-variant'
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
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveColor(activeColor === c.id ? null : c.id)}
                title={c.name}
                className={`w-7 h-7 rounded-full border transition-all cursor-pointer relative ${
                  activeColor === c.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'border-outline-variant/40 hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant font-bold">
              Precio Máx.
            </h3>
            <span className="text-xs font-bold text-primary">
              {maxPrice === 0 ? 'Todos' : formatColones(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
        </div>

        {/* Reset Filters */}
        {(activeCategory !== 'Todos' || activeColor || activeSize || maxPrice !== 0) && (
          <button
            onClick={resetFilters}
            className="w-full py-2.5 px-4 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer"
          >
            Limpiar Filtros ↺
          </button>
        )}
      </aside>

      {/* Main Grid */}
      <section className="flex-1 space-y-8">
        {/* Header summary */}
        <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
          <div>
            <h1 className="font-display-md text-display-md font-serif text-on-surface">
              Colección Femenina
            </h1>
            <p className="font-body-md text-on-surface-variant/70 mt-1">
              Mostrando {filteredProducts.length} productos
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 space-y-4">
            <p className="font-serif text-xl text-on-surface-variant/60">
              No se encontraron prendas con los filtros seleccionados.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-primary text-on-primary font-bold text-xs rounded-xl hover:opacity-90 transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-surface-bright rounded-2xl overflow-hidden border border-outline-variant/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-surface-bright/90 backdrop-blur-md text-on-surface text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                      {product.category}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-serif text-lg font-bold text-on-surface hover:text-primary transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-base text-on-surface">
                        {formatColones(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-on-surface-variant/40 line-through">
                          {formatColones(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-bold text-xs rounded-xl transition-all"
                    >
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Catalog;
