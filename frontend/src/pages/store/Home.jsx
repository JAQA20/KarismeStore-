import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoreProducts, fetchStoreProducts } from '../../data/products';

const defaultHero = {
  headline: 'Lino & Seda',
  subtitle: 'Nueva Colección',
  cta: 'Descubrir',
  url: '/catalog-woman',
  bgImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD2uP-keVypvMZP8XUNmws-anLe2Q1xl0anMLxwA9wRZOJD-K-YmkPk3426iVH4tNg44AfL2dmGKx-mNtPOBqbIgqWBgerNJDXUUr0aPsxHhZroX-dH8JzWAPcTIAP_-CA_HyY2mTKUvsSiY_Y0LmI9j8UCtI8DVtanHRfU9iWQlKtXRHf-e1QahdxinzYFfXzt1D1_d2f5K9TvckhlI2ty4BGXnnDhmQxakEg8NvUFj9I5TB0MbC1U',
};

const defaultBanners = [
  {
    id: '1',
    title: 'Envío Gratis Sostenible',
    subtitle: 'En compras mayores a ₡35.000 a todo Costa Rica mediante Correos de CR',
    icon: 'local_shipping',
    url: '/catalog-woman',
    scope: 'Todo el sitio',
    active: true,
  },
];

const Home = () => {
  const [heroSettings, setHeroSettings] = useState(defaultHero);
  const [activeBanners, setActiveBanners] = useState([]);
  const [productsList, setProductsList] = useState(getStoreProducts);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const loadCmsData = () => {
    try {
      const savedHero = localStorage.getItem('karisme_cms_hero');
      if (savedHero) setHeroSettings(JSON.parse(savedHero));
    } catch {
      // fallback
    }

    try {
      const savedBanners = localStorage.getItem('karisme_cms_banners');
      if (savedBanners !== null) {
        const parsed = JSON.parse(savedBanners);
        const filtered = parsed.filter((b) => b.active !== false);
        setActiveBanners(filtered);
      } else {
        setActiveBanners(defaultBanners);
      }
    } catch {
      setActiveBanners(defaultBanners);
    }
  };

  useEffect(() => {
    loadCmsData();
    fetchStoreProducts().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProductsList(data);
      }
    });

    const handleUpdate = () => {
      loadCmsData();
      fetchStoreProducts().then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
        }
      });
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('focus', handleUpdate);
    window.addEventListener('cms-update', handleUpdate);
    window.addEventListener('inventoryUpdated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('focus', handleUpdate);
      window.removeEventListener('cms-update', handleUpdate);
      window.removeEventListener('inventoryUpdated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    if (activeBanners.length < 2 || isBannerHovered) return;
    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % activeBanners.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [activeBanners.length, isBannerHovered]);

  const banner = activeBanners[currentBannerIdx % (activeBanners.length || 1)];

  const handlePrevBanner = () => {
    setCurrentBannerIdx(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIdx((prev) => (prev + 1) % activeBanners.length);
  };

  const formatColones = (val) => `₡${Number(val || 0).toLocaleString('es-CR')}`;

  const featuredArrivals = productsList.slice(0, 4);

  return (
    <div className="bg-surface text-on-surface antialiased pb-24 md:pb-12">
      {/* Top Announcement Banner */}
      {banner && (
        <div
          onMouseEnter={() => setIsBannerHovered(true)}
          onMouseLeave={() => setIsBannerHovered(false)}
          className="bg-surface-container-high/90 border-b border-outline-variant/30 py-2.5 px-4 text-center relative z-20 transition-all duration-500 select-none overflow-hidden"
        >
          <div className="max-w-container-max mx-auto flex items-center justify-between gap-3">
            {activeBanners.length > 1 ? (
              <button
                type="button"
                onClick={handlePrevBanner}
                className="p-1 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
            ) : (
              <div className="w-6"></div>
            )}

            <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 animate-fade-in py-0.5">
              <span className="material-symbols-outlined text-secondary text-lg shrink-0">
                {banner.icon || 'campaign'}
              </span>
              <p className="font-label-sm text-xs md:text-sm text-on-surface truncate max-w-[70vw] md:max-w-none">
                <strong className="text-secondary font-bold uppercase tracking-wider mr-1.5">
                  {banner.title}:
                </strong>
                <span className="text-on-surface-variant font-medium">
                  {banner.subtitle}
                </span>
              </p>
              <Link
                to={banner.url || '/catalog-woman'}
                className="font-label-sm text-[11px] uppercase tracking-widest text-secondary hover:underline font-bold flex items-center gap-0.5 ml-2 shrink-0"
              >
                Ver Más{' '}
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>

            {activeBanners.length > 1 ? (
              <button
                type="button"
                onClick={handleNextBanner}
                className="p-1 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            ) : (
              <div className="w-6"></div>
            )}
          </div>
        </div>
      )}

      <main className="max-w-container-max mx-auto w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] md:h-[85vh] mb-12 md:mb-section-gap">
          <div className="absolute inset-0 w-full h-full bg-surface-variant">
            <img
              className="object-cover w-full h-full"
              alt="Colección Lino y Seda Karisme"
              src={heroSettings.bgImage || defaultHero.bgImage}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80 md:to-surface/40"></div>
          </div>
          <div className="absolute bottom-12 left-0 right-0 px-margin-mobile md:px-margin-desktop flex flex-col items-start md:items-center text-left md:text-center">
            <p className="font-label-sm text-xs uppercase tracking-[0.3em] text-on-surface mb-2 font-bold">
              {heroSettings.subtitle || 'Nueva Colección'}
            </p>
            <h2 className="font-headline-lg text-4xl md:text-[80px] text-on-surface mb-6 leading-none font-bold">
              {heroSettings.headline || 'Lino & Seda'}
            </h2>
            <Link
              to={heroSettings.url || '/catalog-woman'}
              className="bg-on-background text-on-primary px-8 py-3 rounded-full hover:bg-secondary transition-colors duration-300 font-label-sm text-xs uppercase tracking-wider font-bold shadow-lg"
            >
              {heroSettings.cta || 'Descubrir'}
            </Link>
          </div>
        </section>

        {/* Categories Horizontal Snap Scroll on Mobile / Grid on Desktop */}
        <section className="mb-16 md:mb-section-gap px-margin-mobile md:px-margin-desktop">
          <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-8 snap-x snap-mandatory pb-4">
            {/* Category 1: Mujer */}
            <Link
              to="/catalog-woman"
              className="snap-start shrink-0 w-4/5 md:w-1/3 aspect-[3/4] relative group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm"
            >
              <div className="absolute inset-0 bg-surface-variant transition-transform duration-700 group-hover:scale-105">
                <img
                  className="object-cover w-full h-full"
                  alt="Colección Mujer"
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline-md text-2xl text-white font-bold drop-shadow-md">Mujer</h3>
              </div>
            </Link>

            {/* Category 2: Hombre */}
            <Link
              to="/catalog-men"
              className="snap-start shrink-0 w-4/5 md:w-1/3 aspect-[3/4] relative group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm"
            >
              <div className="absolute inset-0 bg-surface-variant transition-transform duration-700 group-hover:scale-105">
                <img
                  className="object-cover w-full h-full"
                  alt="Colección Hombre"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxiQEvJDx7uULuaK0UQ01pcfNn9DznZbRO7O4yrZRH1sf4Pp0FqAjYUl2gTQ6dk3GXA-icqbV-DhVoVVozphgb5atL3cuEs48zJCkMeGyVt9rgT67xjXgWXuFb3QNFgkDYPpRsipV0z2GF0uXm_iYECt6u8UapwEqBCnUqdhj2GpvotQQqS0UI3czyu4HDuSD5uDO3uVz5paLnx2wT5vnqnq2RoYSIW3JNhwg4VISFTB4ooUXvb-0o"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline-md text-2xl text-white font-bold drop-shadow-md">Hombre</h3>
              </div>
            </Link>

            {/* Category 3: Niños */}
            <Link
              to="/catalog-kids"
              className="snap-start shrink-0 w-4/5 md:w-1/3 aspect-[3/4] relative group cursor-pointer overflow-hidden rounded-xl border border-outline-variant/20 shadow-sm"
            >
              <div className="absolute inset-0 bg-surface-variant transition-transform duration-700 group-hover:scale-105">
                <img
                  className="object-cover w-full h-full"
                  alt="Colección Infantil"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC30T6FBzVdMXD6073wmgcPeuH-qgmtNnzNGdiT2dHWTlkSCwsZMLy_o7wfKu-zxHzRHjzMHpDaJ5BmjDk9A6kJ3mUDUDTC82o1EjLnGjA6-YciwtyDpzb_EgxAyrhR5zBGGFBa9nIEHiJ1t7z1Gc8CNFon52odJ1yhHEiXg5WndOoD8JqxoBzjrcLCjNQ0R4w4oEJDDLH7ve6SuFBUwCkO5C7nsPn0hp7xQRXxZUVuKjwvVW83E3sh"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-headline-md text-2xl text-white font-bold drop-shadow-md">Infantil</h3>
              </div>
            </Link>
          </div>
        </section>

        {/* New Arrivals Section (Connected to MySQL DB) */}
        <section className="mb-16 md:mb-section-gap px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-headline-lg text-2xl md:text-4xl text-on-surface font-bold">
              Nuevos Lanzamientos
            </h2>
            <Link
              className="font-label-sm text-xs uppercase tracking-widest text-primary hover:text-on-surface transition-colors border-b border-primary hover:border-on-surface pb-1 font-bold"
              to="/catalog-woman"
            >
              Ver todo
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
            {featuredArrivals.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group cursor-pointer block"
              >
                <div className="aspect-[3/4] mb-3 bg-surface-variant overflow-hidden relative rounded-xl border border-outline-variant/20 shadow-xs">
                  <img
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop'}
                    alt={product.name}
                  />
                  {product.badge && (
                    <span className="absolute top-2 right-2 bg-on-surface text-surface font-label-sm text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center text-center">
                  <h4 className="font-body-md text-sm md:text-base text-on-surface mb-1 font-bold line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="font-label-sm text-xs text-primary font-bold font-mono">
                    {formatColones(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Brand Promise Section */}
        <section className="py-12 md:py-section-gap px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="font-label-sm text-xs uppercase tracking-[0.3em] text-primary font-bold">
              Nuestra Filosofía
            </span>
            <h3 className="font-headline-lg text-2xl md:text-4xl text-on-surface font-bold">
              Diseñado para ser sentido, no solo visto.
            </h3>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Utilizamos solo las fibras más finas de seda y algodón orgánico para garantizar una suavidad que acaricia la piel durante todo el día.
            </p>
          </div>
        </section>
      </main>

      {/* Floating Bottom Navigation Bar (Mobile Only - Glassmorphism) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex justify-around items-center px-4 py-2 w-[calc(100%-32px)] max-w-sm rounded-full bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(111,89,87,0.18)]">
        <Link
          to="/"
          className="flex flex-col items-center justify-center p-2.5 bg-primary text-on-primary rounded-full transition-transform active:scale-95 shadow-md"
          title="Inicio"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            home
          </span>
        </Link>
        <Link
          to="/catalog-woman"
          className="flex flex-col items-center justify-center p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 rounded-full transition-colors"
          title="Catálogo"
        >
          <span className="material-symbols-outlined text-xl">search</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center justify-center p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 rounded-full transition-colors relative"
          title="Carrito"
        >
          <span className="material-symbols-outlined text-xl">shopping_bag</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center justify-center p-2.5 text-on-surface-variant hover:text-primary hover:bg-surface-variant/30 rounded-full transition-colors"
          title="Mi Perfil"
        >
          <span className="material-symbols-outlined text-xl">person</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
