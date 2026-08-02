import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  // Find product by id, fallback to first product if invalid
  const product = products.find(p => p.id === id) || products[0];

  // Colors available for this product
  const availableColors = product.availableColors || [
    { id: 'Champagne', name: 'Champán', hex: '#F5F5DC' },
    { id: 'Soft Rose', name: 'Rosa Soft', hex: '#E6D7D2' },
    { id: 'Midnight Black', name: 'Negro Azabache', hex: '#2C2C2C' }
  ];

  // Check state passed from Catalog filter
  const initialColor = availableColors.find(c => c.id === location.state?.selectedColor) || availableColors[0];
  const initialSize = (location.state?.selectedSize && product.availableSizes?.includes(location.state?.selectedSize))
    ? location.state.selectedSize
    : (product.availableSizes?.[0] || 'S');

  const [activeColor, setActiveColor] = useState(initialColor);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [activeImage, setActiveImage] = useState(product.image);
  const [toastMessage, setToastMessage] = useState('');

  // Update image and state when product id changes
  useEffect(() => {
    setActiveImage(product.image);
    setActiveColor(initialColor);
    setActiveSize(initialSize);
    window.scrollTo(0, 0);
  }, [id, product, initialColor, initialSize]);

  const formatColones = (amount) => {
    return `₡${amount.toLocaleString('es-CR')}`;
  };

  const handleAddToCart = () => {
    addToCart(product, activeColor, activeSize, 1);
    setToastMessage(`¡Añadido! ${product.name} (${activeColor.name}, Talla ${activeSize}) a tu bolsa.`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Filter cross-sell items (excluding current product)
  const crossSellProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm">
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16 items-start">
        {/* Product Media Left */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="aspect-[3/4] overflow-hidden bg-surface-container-low transition-soft group rounded-xl border border-outline-variant/20">
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={activeImage} alt={product.name} decoding="async" />
          </div>
          
          {/* Thumbnail Grid */}
          {product.thumbnails && product.thumbnails.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {product.thumbnails.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square bg-surface-container overflow-hidden rounded-lg cursor-pointer transition-all ${
                    activeImage === img ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img className="w-full h-full object-cover" src={img} alt={`Vista ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info Right */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-8 font-label-sm">
            <Link className="hover:text-primary transition-colors" to="/catalog">Catálogo</Link>
            <span>/</span>
            <Link className="hover:text-primary transition-colors" to="/catalog">{product.category}</Link>
            <span>/</span>
            <span className="text-on-surface font-bold truncate">{product.name}</span>
          </nav>

          <header className="mb-8">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <p className="font-headline-md text-headline-md text-primary font-bold">{formatColones(product.price)}</p>
              {product.originalPrice && (
                <p className="font-body-lg text-on-surface-variant/50 line-through">{formatColones(product.originalPrice)}</p>
              )}
            </div>
          </header>

          <div className="mb-10">
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {/* Color Selection */}
          <div className="mb-8">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface mb-4 block">Color: {activeColor.name}</span>
            <div className="flex gap-4">
              {availableColors.map(color => (
                <button 
                  key={color.hex}
                  onClick={() => setActiveColor(color)}
                  aria-label={color.name}
                  title={color.name}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 cursor-pointer ${activeColor.hex === color.hex ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'ring-1 ring-outline-variant/30'}`}
                  style={{ backgroundColor: color.hex }}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Talla</span>
              <button type="button" className="text-[10px] uppercase tracking-widest text-primary underline font-bold cursor-pointer">Guía de tallas</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {(product.availableSizes || ['XS', 'S', 'M', 'L']).map(size => (
                <button 
                  key={size}
                  type="button"
                  onClick={() => setActiveSize(size)}
                  className={`py-3 font-label-sm text-label-sm transition-colors cursor-pointer ${
                    activeSize === size 
                      ? 'border-2 border-primary bg-primary-container text-on-primary-container font-bold shadow-sm' 
                      : 'border border-outline-variant hover:border-primary text-on-surface'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            type="button"
            onClick={handleAddToCart}
            className="w-full py-5 bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm uppercase tracking-[0.2em] mb-12 hover:bg-primary transition-colors duration-500 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Añadir a la bolsa
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          
          {/* Product Details Accordion */}
          <div className="border-t border-outline-variant">
            <details className="group border-b border-outline-variant py-4" open>
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Composición y Cuidado</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-4 text-sm text-on-surface-variant font-body-md leading-relaxed">
                <ul className="list-disc pl-4 space-y-2">
                  <li>100% Seda de Mora Orgánica Certificada / Encaje Francés.</li>
                  <li>Lavar a mano con agua fría y jabón neutro.</li>
                  <li>Secar en plano a la sombra.</li>
                </ul>
              </div>
            </details>
            <details className="group border-b border-outline-variant py-4">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Envío y Devoluciones</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="pt-4 text-sm text-on-surface-variant font-body-md leading-relaxed">
                Envío exprés gratuito en todo el país en compras mayores a ₡50.000. Devoluciones disponibles en 14 días.
              </div>
            </details>
          </div>
        </div>
      </div>
      
      {/* Cross-sell Section */}
      <section className="mt-section-gap">
        <h2 className="font-headline-lg text-headline-lg text-center mb-16">Completa el Conjunto</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {crossSellProducts.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <Link to={`/product/${item.id}`} className="block aspect-[3/4] overflow-hidden bg-surface-container-low mb-6 relative rounded-xl border border-outline-variant/10">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.image} alt={item.name} loading="lazy" decoding="async" />
                <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span className="material-symbols-outlined text-on-surface">visibility</span>
                </span>
              </Link>
              <h3 className="font-headline-md text-headline-md text-center">{item.name}</h3>
              <p className="text-primary text-center font-label-sm font-bold mt-1">{formatColones(item.price)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
