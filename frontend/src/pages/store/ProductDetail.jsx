import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getStoreProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { sortSizes } from '../../utils/sortSizes';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const [allProducts, setAllProducts] = useState(getStoreProducts);

  useEffect(() => {
    const handleUpdate = () => setAllProducts(getStoreProducts());
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('inventoryUpdated', handleUpdate);
    handleUpdate();
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('inventoryUpdated', handleUpdate);
    };
  }, [id]);

  // Find target product dynamically
  const product =
    allProducts.find((p) => p.id.toString() === (id || '').toString()) ||
    allProducts[0];

  const availableColors = product?.availableColors || [
    { id: 'Champagne', name: 'Champán', hex: '#F5F5DC', type: 'color' },
    { id: 'Soft Rose', name: 'Rosa Soft', hex: '#E6D7D2', type: 'color' },
    { id: 'Midnight Black', name: 'Negro Azabache', hex: '#2C2C2C', type: 'color' },
  ];

  const initialColor =
    availableColors.find((c) => c.id === location.state?.selectedColor) ||
    availableColors[0];

  const initialSize =
    location.state?.selectedSize &&
    product?.availableSizes?.includes(location.state?.selectedSize)
      ? location.state.selectedSize
      : product?.availableSizes?.[0] || 'S';

  const [activeColor, setActiveColor] = useState(initialColor);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [toastMessage, setToastMessage] = useState('');
  const [isSavedForLater, setIsSavedForLater] = useState(false);

  // Accordion state
  const [openSection, setOpenSection] = useState('description');

  // Initialize variant selections ONLY when route parameter `id` changes
  useEffect(() => {
    if (product) {
      const initCol =
        availableColors.find((c) => c.id === location.state?.selectedColor || c.name === location.state?.selectedColor) ||
        availableColors[0];
      const initSz =
        location.state?.selectedSize &&
        product?.availableSizes?.includes(location.state?.selectedSize)
          ? location.state.selectedSize
          : product?.availableSizes?.[0] || 'S';
      const initImg = initCol?.variantImage || initCol?.patternImage || product.image;

      setActiveColor(initCol);
      setActiveSize(initSz);
      setActiveImage(initImg);
    }
    window.scrollTo(0, 0);
  }, [id]);

  const formatColones = (amount) => {
    return `₡${Number(amount || 0).toLocaleString('es-CR')}`;
  };

  const handleColorChange = (color) => {
    setActiveColor(color);
    const varImg = color.variantImage || color.patternImage || product.image;
    if (varImg) {
      setActiveImage(varImg);
    }
    const varObj = product?.variants?.find((v) => v.name === color.name || v.id === color.id);
    const vSizes = varObj?.sizesWithStock?.map((s) => s.size) || color.sizesWithStock?.map((s) => s.size);
    const validSizes = sortSizes(vSizes && vSizes.length > 0 ? vSizes : (product?.availableSizes || []));
    if (validSizes.length > 0 && !validSizes.includes(activeSize)) {
      setActiveSize(validSizes[0]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, activeColor, activeSize, 1);
    setToastMessage(
      `¡Añadido! ${product.name} (${activeColor?.name || 'Variante'}, Talla ${activeSize}) a tu bolsa.`
    );
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveForLater = () => {
    setIsSavedForLater((prev) => !prev);
    setToastMessage(
      !isSavedForLater
        ? `Guardado "${product.name}" en tu lista de deseos.`
        : `Removido de tu lista de deseos.`
    );
    setTimeout(() => setToastMessage(''), 3000);
  };

  const crossSellProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  if (!product) return null;

  // Filter thumbnails strictly for the active selected color/pattern variant
  const activeVariantObj = product.variants?.find(
    (v) => v.name === activeColor?.name || v.name === activeColor?.id || v.id === activeColor?.id
  );

  // Derive variant-specific sizes for active color/pattern, sorted from smallest to largest
  const variantSizes = activeVariantObj?.sizesWithStock?.map((s) => s.size) ||
    activeColor?.sizesWithStock?.map((s) => s.size);

  const rawAvailableSizes = (variantSizes && variantSizes.length > 0)
    ? variantSizes
    : (product.availableSizes || []);

  const displaySizes = sortSizes(rawAvailableSizes);

  let variantThumbnails = [];
  if (activeVariantObj) {
    const patternUrl = activeVariantObj.patternImage;
    const vImgs = Array.isArray(activeVariantObj.variantImages) && activeVariantObj.variantImages.length > 0
      ? activeVariantObj.variantImages
      : [activeVariantObj.variantImage];
    variantThumbnails = vImgs.filter((img) => Boolean(img) && img !== patternUrl);
  } else if (activeColor) {
    const patternUrl = activeColor.patternImage;
    const vImgs = Array.isArray(activeColor.variantImages) && activeColor.variantImages.length > 0
      ? activeColor.variantImages
      : [activeColor.variantImage];
    variantThumbnails = vImgs.filter((img) => Boolean(img) && img !== patternUrl);
  }

  const thumbnailsList =
    variantThumbnails.length > 0
      ? variantThumbnails
      : product.thumbnails && product.thumbnails.length > 0
      ? product.thumbnails
      : [product.image];

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-12 md:py-24 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm border border-outline-variant">
          ✨ {toastMessage}
        </div>
      )}

      {/* Breadcrumb Navigation Top */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-on-surface-variant/60 mb-8 font-label-sm">
        <Link className="hover:text-primary transition-colors" to="/catalog">
          Catálogo
        </Link>
        <span>/</span>
        <Link className="hover:text-primary transition-colors" to="/catalog">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-on-surface font-bold truncate">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Product Media Left: Vertical Thumbnails Stacked to the Left of Main Image WITH HIDDEN SCROLLBARS */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
          {/* Vertical Thumbnail Sidebar (A la par de la imagen principal sin scrollbars visibles) */}
          {thumbnailsList.length > 0 && (
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto w-full md:w-20 max-h-[620px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {thumbnailsList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 md:w-20 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all border shrink-0 ${
                    activeImage === img
                      ? 'ring-2 ring-primary border-primary opacity-100 shadow-md scale-105'
                      : 'opacity-70 hover:opacity-100 border-outline-variant/30 hover:border-primary/50'
                  }`}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={img}
                    alt={`Vista ${idx + 1}`}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Hero Image */}
          <div className="flex-1 w-full aspect-[3/4] overflow-hidden bg-surface-container-low rounded-2xl border border-outline-variant/20 relative group shadow-sm">
            {product.isCustomAdmin && (
              <span className="absolute top-4 right-4 bg-secondary text-white font-label-sm text-xs uppercase tracking-widest px-3 py-1 rounded-full z-10 font-bold shadow-md">
                ⚡ Producto Admin
              </span>
            )}
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={activeImage || product.image}
              alt={product.name}
              decoding="async"
            />
          </div>
        </div>

        {/* Product Info Right */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <header className="space-y-2 border-b border-outline-variant/20 pb-6">
            <h1 className="font-headline-lg text-[clamp(1.8rem,2.5vw,2.8rem)] text-on-surface leading-tight font-bold">
              {product.name}
            </h1>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant font-mono font-bold">
              {product.category} {product.sku ? `• ${product.sku}` : ''}
            </p>
            <div className="flex items-baseline gap-4 pt-2">
              <p className="font-headline-md text-2xl text-primary font-bold font-mono">
                {formatColones(product.price)}
              </p>
              {product.originalPrice && (
                <p className="font-body-lg text-on-surface-variant/50 line-through text-base font-mono">
                  {formatColones(product.originalPrice)}
                </p>
              )}
            </div>
          </header>

          {/* Color & Pattern Variant Selection Swatches */}
          {availableColors && availableColors.length > 0 && (
            <div className="space-y-3">
              <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface block font-bold">
                COLOR / ESTAMPADO: <span className="text-primary font-mono uppercase">{activeColor?.name}</span>
              </span>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((color) => {
                  const isSelected = activeColor?.name === color.name || activeColor?.id === color.id;
                  
                  // Match with product.variants if present
                  const variantObj = product.variants?.find(
                    (v) => v.name === color.name || v.id === color.id || v.name === color.id
                  );
                  
                  const variantType = variantObj?.type || color.type;
                  const patternImg = variantObj?.patternImage || color.patternImage;
                  const swatchImg = patternImg || variantObj?.variantImage || color.variantImage;
                  const isPattern = variantType === 'pattern' || !!patternImg;

                  return (
                    <button
                      key={color.id || color.name}
                      type="button"
                      onClick={() => handleColorChange(color)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer border overflow-hidden relative shadow-2xs ${
                        isSelected
                          ? 'ring-2 ring-primary border-primary scale-105 shadow-md'
                          : 'border-outline-variant/60 hover:border-primary/60 hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: !isPattern && color.hex ? color.hex : '#E5E7EB'
                      }}
                      title={color.name}
                    >
                      {/* If pattern variant, render the actual pattern thumbnail image inside the swatch */}
                      {isPattern && swatchImg ? (
                        <img
                          src={swatchImg}
                          alt={color.name}
                          className="w-full h-full object-cover"
                        />
                      ) : null}

                      {isSelected && (
                        <span
                          className={`material-symbols-outlined text-xs font-bold rounded-full p-0.5 absolute z-10 ${
                            isPattern || !color.hex || color.hex === '#FFFFFF' || color.hex === '#F5F5DC'
                              ? 'bg-black/65 text-white shadow-xs'
                              : 'text-white drop-shadow-md'
                          }`}
                        >
                          check
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection Grid */}
          {displaySizes && displaySizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface font-bold">
                  TALLA: <span className="text-primary font-mono">{activeSize || displaySizes[0]}</span>
                </span>
                <span className="text-[11px] text-primary/80 font-bold underline cursor-pointer hover:text-primary">
                  Guía de Tallas
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {displaySizes.map((size) => {
                  const isSelected = (activeSize || displaySizes[0]) === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`h-11 text-xs font-bold transition-all cursor-pointer rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'border-2 border-primary bg-primary text-on-primary shadow-xs'
                          : 'border border-outline-variant hover:border-primary text-on-surface bg-surface-bright'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-sm text-xs uppercase tracking-wider font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              Añadir a la Bolsa de Compras
            </button>

            <button
              onClick={handleSaveForLater}
              className={`w-full py-3.5 rounded-xl font-label-sm text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border flex items-center justify-center gap-2 ${
                isSavedForLater
                  ? 'bg-secondary/15 text-secondary border-secondary'
                  : 'bg-surface-bright text-on-surface border-outline-variant hover:border-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isSavedForLater ? 'favorite' : 'favorite_border'}
              </span>
              {isSavedForLater ? 'Guardado en Lista de Deseos' : 'Guardar para Después'}
            </button>
          </div>

          {/* Accordion Sections: Description & Specs */}
          <div className="border-t border-outline-variant/20 pt-4 space-y-3">
            {/* Description Accordion */}
            <div className="border-b border-outline-variant/20 pb-3">
              <button
                onClick={() => setOpenSection(openSection === 'description' ? '' : 'description')}
                className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-on-surface py-2 cursor-pointer"
              >
                <span>Descripción</span>
                <span className="material-symbols-outlined text-lg">
                  {openSection === 'description' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openSection === 'description' && (
                <p className="text-xs text-on-surface-variant leading-relaxed pt-2 animate-fade-in font-sans">
                  {product.description}
                </p>
              )}
            </div>

            {/* Specifications & Materials Accordion */}
            <div className="border-b border-outline-variant/20 pb-3">
              <button
                onClick={() => setOpenSection(openSection === 'specs' ? '' : 'specs')}
                className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-on-surface py-2 cursor-pointer"
              >
                <span>Materiales & Confección</span>
                <span className="material-symbols-outlined text-lg">
                  {openSection === 'specs' ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openSection === 'specs' && (
                <div className="text-xs text-on-surface-variant space-y-2 pt-2 animate-fade-in">
                  {product.materials?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <strong className="text-on-surface">Materiales:</strong>
                      {product.materials.map((m) => (
                        <span key={m} className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full text-[10px]">
                          🧵 {m}
                        </span>
                      ))}
                    </div>
                  )}
                  {product.details?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <strong className="text-on-surface">Detalles:</strong>
                      {product.details.map((d) => (
                        <span key={d} className="bg-secondary/10 text-secondary font-bold px-2 py-0.5 rounded-full text-[10px]">
                          ✨ {d}
                        </span>
                      ))}
                    </div>
                  )}
                  {(!product.materials?.length && !product.details?.length) && (
                    <p>Seda de mora 100% hipoalergénica con acabado de alta costura.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cross sell related products */}
      {crossSellProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-outline-variant/20 font-sans">
          <h2 className="font-headline-md text-xl font-bold text-on-surface mb-8">
            También te podría gustar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {crossSellProducts.map((p) => (
              <article key={p.id} className="group space-y-2">
                <div className="aspect-[3/4] overflow-hidden bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <Link
                  to={`/product/${p.id}`}
                  className="font-bold text-sm text-on-surface hover:text-primary truncate block"
                >
                  {p.name}
                </Link>
                <p className="text-xs font-bold text-primary font-mono">
                  {formatColones(p.price)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
