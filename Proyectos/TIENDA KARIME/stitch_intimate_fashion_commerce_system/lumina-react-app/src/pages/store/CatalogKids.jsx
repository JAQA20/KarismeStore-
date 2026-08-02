import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const CatalogKids = () => {
  // Filter base products for Kids
  const kidsProducts = products.filter(p => p.gender === 'Niños');

  const [activeGender, setActiveGender] = useState('Todos');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);

  const kidGenders = [
    { name: 'Todos', count: kidsProducts.length },
    { name: 'Niña', count: kidsProducts.filter(p => p.kidGender === 'Niña').length },
    { name: 'Niño', count: kidsProducts.filter(p => p.kidGender === 'Niño').length },
    { name: 'Unisex', count: kidsProducts.filter(p => p.kidGender === 'Unisex').length }
  ];

  const categories = [
    { name: 'Todos', count: kidsProducts.length },
    { name: 'Pijamas', count: kidsProducts.filter(p => p.category === 'Pijamas').length },
    { name: 'Conjuntos', count: kidsProducts.filter(p => p.category === 'Conjuntos').length },
    { name: 'Ropa de Estar', count: kidsProducts.filter(p => p.category === 'Ropa de Estar').length },
    { name: 'Básicos', count: kidsProducts.filter(p => p.category === 'Básicos').length }
  ];

  const sizes = ['2Y', '4Y', '6Y', '8Y', '10Y'];

  const colors = [
    { id: 'Pastel Pink', name: 'Rosa Pastel', hex: '#FCE4EC' },
    { id: 'Soft Blue', name: 'Azul Suave', hex: '#E3F2FD' },
    { id: 'Cream', name: 'Crema', hex: '#F9FBE7' },
    { id: 'Grey', name: 'Gris', hex: '#F5F5F5' }
  ];

  const resetFilters = () => {
    setActiveGender('Todos');
    setActiveCategory('Todos');
    setActiveColor(null);
    setActiveSize(null);
    setMaxPrice(0);
  };

  const formatColones = (amount) => {
    return `₡${amount.toLocaleString('es-CR')}`;
  };

  // Filter products based on selected filters
  const filteredProducts = kidsProducts.filter(product => {
    const matchesGender = activeGender === 'Todos' || product.kidGender === activeGender;
    const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchesColor = !activeColor || product.color === activeColor || product.availableColors?.some(c => c.id === activeColor);
    const matchesSize = !activeSize || product.availableSizes?.includes(activeSize);
    const matchesPrice = maxPrice === 0 || product.price <= maxPrice;
    return matchesGender && matchesCategory && matchesColor && matchesSize && matchesPrice;
  });

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0 space-y-10 sticky top-24 h-fit">
        {/* Gender Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Género</h3>
          <ul className="space-y-2">
            {kidGenders.map((g) => (
              <li key={g.name}>
                <button 
                  onClick={() => setActiveGender(g.name)}
                  className={`font-body-md text-body-md transition-all flex justify-between w-full cursor-pointer ${
                    activeGender === g.name ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>{g.name}</span> 
                  <span className="text-on-surface-variant/40 font-normal">{g.count < 10 ? `0${g.count}` : g.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Category Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Categoría</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button 
                  onClick={() => setActiveCategory(cat.name)}
                  className={`font-body-md text-body-md transition-all flex justify-between w-full cursor-pointer ${
                    activeCategory === cat.name ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>{cat.name}</span> 
                  <span className="text-on-surface-variant/40 font-normal">{cat.count < 10 ? `0${cat.count}` : cat.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Size Filter */}
        <div className="space-y-4">
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Talla</h3>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((size) => (
              <button 
                key={size}
                onClick={() => setActiveSize(activeSize === size ? null : size)}
                className={`h-10 text-label-sm flex items-center justify-center transition-all cursor-pointer ${
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
          <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button 
                key={color.id}
                onClick={() => setActiveColor(activeColor === color.id ? null : color.id)}
                className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
                  activeColor === color.id ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'ring-1 ring-outline-variant/30 hover:ring-primary'
                }`}
                title={color.name}
                aria-label={color.name}
                style={{ backgroundColor: color.hex }}
              ></button>
            ))}
          </div>
        </div>

        {/* Price Slider Filter */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">Rango de Precio</h3>
            <span className="font-label-sm text-primary font-bold">{formatColones(maxPrice)}</span>
          </div>
          <div className="pt-2 px-1">
            <input 
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" 
            />
            <div className="flex justify-between mt-3 text-label-sm text-on-surface-variant font-medium">
              <span>{formatColones(0)}</span>
              <span>{formatColones(100000)}</span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button 
          onClick={resetFilters}
          className="w-full py-4 bg-on-surface text-on-primary font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 cursor-pointer"
        >
          Limpiar Filtros
        </button>
      </aside>
      
      {/* Product Grid Area */}
      <section className="flex-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-outline-variant/20">
          <div>
            <h1 className="font-headline-lg text-headline-lg mb-2">Colección Infantil</h1>
            <p className="font-body-md text-body-md text-on-surface-variant/70">
              Mostrando <span className="font-bold text-on-surface">{filteredProducts.length}</span> resultados para ropa interior y loungewear infantil.
              {activeGender !== 'Todos' && ` • Género: ${activeGender}`}
              {activeCategory !== 'Todos' && ` • Categoría: ${activeCategory}`}
              {activeSize && ` • Talla: ${activeSize}`}
              {activeColor && ` • Color: ${activeColor}`}
              {maxPrice > 0 && ` • Precio ≤ ${formatColones(maxPrice)}`}.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Ordenar por:</span>
            <select className="bg-transparent border-none font-label-sm text-label-sm uppercase tracking-widest focus:ring-0 cursor-pointer pr-8 outline-none">
              <option>Más recientes</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Popularidad</option>
            </select>
          </div>
        </div>
        
        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group product-card-hover flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-surface-container-low">
                  {product.badge && (
                    <div className={`absolute top-4 left-4 z-10 px-3 py-1 font-label-sm text-[10px] uppercase tracking-widest ${
                      product.badge === 'Nuevo' ? 'bg-primary text-on-primary' : 'bg-secondary text-on-primary'
                    }`}>
                      {product.badge}
                    </div>
                  )}
                  <Link to={`/product/${product.id}`} state={{ selectedSize: activeSize, selectedColor: activeColor }}>
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={product.image} alt={product.name} loading="lazy" decoding="async" />
                  </Link>
                  <div className="add-to-cart-overlay absolute inset-0 bg-black/5 flex items-end opacity-0 transform translate-y-4 transition-all duration-300 pointer-events-none p-4 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link 
                      to={`/product/${product.id}`} 
                      state={{ selectedSize: activeSize, selectedColor: activeColor }}
                      className="w-full bg-white/90 backdrop-blur-sm text-on-surface py-4 font-label-sm text-label-sm uppercase tracking-widest pointer-events-auto hover:bg-on-surface hover:text-white transition-colors text-center block"
                    >
                      Vista Rápida
                    </Link>
                  </div>
                </div>
                <Link to={`/product/${product.id}`} state={{ selectedSize: activeSize, selectedColor: activeColor }} className="text-center group-hover:text-primary transition-colors">
                  <h2 className="font-headline-md text-[20px] mb-1 text-center">{product.name}</h2>
                </Link>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-2 uppercase">
                  {product.kidGender ? `${product.kidGender} · ` : ''}{product.colorName || product.color}
                </p>
                <div className="flex gap-3 items-center">
                  <span className="font-body-md text-body-md text-primary font-bold">{formatColones(product.price)}</span>
                  {product.originalPrice && (
                    <span className="font-body-md text-body-md text-on-surface-variant/50 line-through">{formatColones(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-6 bg-surface-container-low/40 rounded-2xl border border-outline-variant/20 p-12">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">filter_alt_off</span>
            <h3 className="font-headline-lg text-headline-md">Sin productos coincidentes</h3>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
              No se encontraron productos que coincidan con los filtros seleccionados para la colección infantil.
            </p>
            <button 
              onClick={resetFilters}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-sm uppercase tracking-widest hover:bg-primary/90 transition-all cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <nav className="mt-20 flex justify-center items-center gap-8 border-t border-outline-variant/30 pt-12">
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest cursor-pointer">
              <span className="material-symbols-outlined text-sm">arrow_back_ios</span> Anterior
            </button>
            <div className="flex gap-4">
              <span className="font-label-sm text-label-sm text-primary underline underline-offset-8 font-bold">01</span>
              <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer">02</button>
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest cursor-pointer">
              Siguiente <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </button>
          </nav>
        )}
      </section>
    </main>
  );
};

export default CatalogKids;
