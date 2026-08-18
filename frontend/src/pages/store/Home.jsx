import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const defaultHero = {
  headline: 'Elegancia en cada capa.',
  subtitle: 'Lencería & Pijamería fina diseñada para la mujer moderna en Costa Rica.',
  cta: 'Explorar Colección',
  url: '/catalog',
  bgImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQZJAfKUEI5tsOoAq5LQynTMfHECTfR8WPFo3F7Def6l1EEKAtyu7pm1vzYgfPQZOtH70uUPmF_uI0v6MZXzRH5qIqyThLxVGF1MG46ub4zI2_faIJKDbwD20ISqcXUJtOARq9l9bMSYJuWseHS6gkhi6IQbCio0csGTtMgNRT7KX_VD1uIsUIxFWfd2CCSS8zrmCPufo-lluitynHJ9nNhK9e8938Im2Z0dCOriPLhc2TzQICWrMa',
};

const defaultBanners = [
  {
    id: '1',
    title: 'Envío Gratis Sostenible',
    subtitle: 'En compras mayores a ₡35.000 a todo Costa Rica mediante Correos de CR',
    icon: 'local_shipping',
    url: '/catalog',
    scope: 'Todo el sitio',
    active: true,
  },
];

const defaultIconicPieces = {
  sectionBadge: 'Los Favoritos',
  sectionTitle: 'Piezas Icónicas',
  viewAllUrl: '/catalog',
  items: [
    {
      id: '1',
      title: 'Bralette Silk Noire',
      price: '₡32.500',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5Qx2rLhE4i3iCyU2TmJhOzyFavYbl-pzYD5sabcYzTUL34Bq4YZqzTsW80LIVry7ZFGjtTOn3C4L4GJppZgjqDujmyhXfJIBCyh_qELKnRrtMPqMvEl2WNM4hZroEt8U8DHrL61v_LLkU6fYzrAI7MmPmYoTV49iHZ9GEjw_MjRV2NTemSQSRRtZIGrRB2JPO9zBstlyFlkA-UXlwRIOuUzvAs9kntxF3ZOvaxlcAgW07gsaWjvW',
      url: '/product/1',
    },
    {
      id: '2',
      title: 'Ensemble Dentelle Rose',
      price: '₡24.000',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAcrKC3ZAhqabtB_lZXA1ybbzJflWRyPltzSb1WUxaVwRQXIuHYBYMxNRuuItQlpBiKvB2tmMtrdLmayFfU_TEn2FK9jX4O6_5Qlc4bnQpz-MQ3bRfWdy28SjfZwcM_fvPPmXeBZMJmYabnpUcAZLSJcT83AdrtT6y9p-SasJaysHDccwN7oEVka6AmK29QEEdOKORplCKKfvoVTnvdDFcu_pgTIe2zYJmqY2PmWTvNOhzUHNVPdiOF',
      url: '/product/2',
    },
    {
      id: '3',
      title: 'Body Seamless Invisible',
      price: '₡18.500',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQiunKu9xjlRP3z7Sly6ygY_tcNLAnjIowjAq6u30falApiZt63HFAeTupbVQoOubw482owOmvwQv9ApbtjBCeOHDcApq6QDt7f0IdizVEadvYgO764vsG4lW655IPgygg3HALEZGMfZIlPvbK0-sdtd9yTr5WztGSTBhcjF92qaa8CTjQOAfD9CdJYlz-m1uxERwEYs4PsxWbOSVW56KCUsIU0ngDSbYNKbkYTjWDXUowrx1k0ksk',
      url: '/product/3',
    },
    {
      id: '4',
      title: 'Peignoir Satin & Seda',
      price: '₡45.000',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD6he9H6r8UDWaOxKma_YwV66NjE9P3QFNVoJn_8uN0K0AelLQ3VEJo8UK-9C6XY6VyriQyY5WRtivhsuWDmXM4S-0fD6xDUMPZ3xWhpKVqT4AjoKWIhqZdD7ThhqFMRmlTM8aw25t-6rQhoGx4Lgjf78nAl70y3wHnjw5FIVr62FPDIok--13fzWpMkLm0RzedRhqN7uRJl4sIfOSPwYw9BuYT0U4t8mrogz0XHIHHG-tEUdkryTND',
      url: '/product/4',
    },
  ],
};

const Home = () => {
  const [heroSettings, setHeroSettings] = useState(defaultHero);
  const [activeBanners, setActiveBanners] = useState([]);
  const [iconicPieces, setIconicPieces] = useState(defaultIconicPieces);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const loadCmsData = () => {
    // Read CMS Hero Settings
    try {
      const savedHero = localStorage.getItem('karisme_cms_hero');
      if (savedHero) setHeroSettings(JSON.parse(savedHero));
    } catch {
      // fallback
    }

    // Read CMS Banners Settings
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

    // Read CMS Iconic Pieces Settings
    try {
      const savedIconic = localStorage.getItem('karisme_cms_iconic_pieces');
      if (savedIconic) setIconicPieces(JSON.parse(savedIconic));
    } catch {
      setIconicPieces(defaultIconicPieces);
    }
  };

  useEffect(() => {
    loadCmsData();

    // Listen for storage or cms-update events
    window.addEventListener('storage', loadCmsData);
    window.addEventListener('focus', loadCmsData);
    window.addEventListener('cms-update', loadCmsData);

    return () => {
      window.removeEventListener('storage', loadCmsData);
      window.removeEventListener('focus', loadCmsData);
      window.removeEventListener('cms-update', loadCmsData);
    };
  }, []);

  // Auto-rotating Carousel Timer for 2 or more banners (6.5 seconds)
  useEffect(() => {
    if (activeBanners.length < 2 || isBannerHovered) return;

    const timer = setInterval(() => {
      setCurrentBannerIdx((prev) => (prev + 1) % activeBanners.length);
    }, 6500); // rotates every 6.5 seconds

    return () => clearInterval(timer);
  }, [activeBanners.length, isBannerHovered]);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const banner = activeBanners[currentBannerIdx % (activeBanners.length || 1)];

  const handlePrevBanner = () => {
    setCurrentBannerIdx(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length
    );
  };

  const handleNextBanner = () => {
    setCurrentBannerIdx((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <>
      {/* Dynamic Top Announcement Banner Carousel (Rose Clean Theme) */}
      {banner && (
        <div
          onMouseEnter={() => setIsBannerHovered(true)}
          onMouseLeave={() => setIsBannerHovered(false)}
          className="bg-surface-container-high/90 border-b border-outline-variant/30 py-2.5 px-4 text-center relative z-20 transition-all duration-500 select-none overflow-hidden"
        >
          <div className="max-w-container-max mx-auto flex items-center justify-between gap-3">
            {/* Left Arrow Button */}
            {activeBanners.length > 1 ? (
              <button
                type="button"
                onClick={handlePrevBanner}
                className="p-1 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                title="Banner Anterior"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
            ) : (
              <div className="w-6"></div>
            )}

            {/* Banner Content */}
            <div
              key={`banner-${banner.id}-${currentBannerIdx}`}
              className="flex-1 flex items-center justify-center gap-2 md:gap-3 animate-fade-in py-0.5"
            >
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
                to={banner.url || '/catalog'}
                className="font-label-sm text-[11px] uppercase tracking-widest text-secondary hover:underline font-bold flex items-center gap-0.5 ml-2 shrink-0"
              >
                Ver Más{' '}
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>
            </div>

            {/* Right Arrow Button */}
            {activeBanners.length > 1 ? (
              <button
                type="button"
                onClick={handleNextBanner}
                className="p-1 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                title="Siguiente Banner"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            ) : (
              <div className="w-6"></div>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Hero Section from CMS */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
            style={{ backgroundImage: `url('${heroSettings.bgImage || defaultHero.bgImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full">
          <div className="max-w-xl animate-fade-in">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary mb-4 block">
              Karisme Innerwear
            </span>
            <h1 className="font-display-lg text-display-lg mb-6 text-on-background leading-tight drop-shadow-sm">
              {heroSettings.headline}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md leading-relaxed">
              {heroSettings.subtitle || defaultHero.subtitle}
            </p>
            <Link
              to={heroSettings.url || '/catalog'}
              className="inline-block bg-on-background text-on-primary px-10 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary transition-all duration-500 rounded-xl shadow-lg font-bold"
            >
              {heroSettings.cta || 'Explorar Colección'}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Bento-style */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-[800px]">
          {/* Main Category: Mujer */}
          <div className="md:col-span-8 relative group overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAF1Y0T0dYTt6FKw2DLhCW9JQ6x1P0j_TD1K190uW8nJxZrWcGsoF3HJTevBUbuiTgwt6PBSGiTmWmlUTbP-9B3PYNTmmrhRkikfNXkQ4Ppq_PjonVaFpIEA5ofzfH-VTtROzqmnjTA-1-zAoEyEZW83hLU6-O8_DbN8eGGQJ6zT1l5Ae8mEr3eDJcKTP9CNIwfBgeNQ2SyWuNXYnT3LNRUn7PSF6ObdxtGav2PaIv6eTu4kvrZxNBt')" }}></div>
            <div className="absolute inset-0 bg-on-background/10 group-hover:bg-on-background/20 transition-colors"></div>
            <div className="absolute bottom-12 left-12">
              <h2 className="font-headline-lg text-headline-lg text-white mb-2">Mujer</h2>
              <Link to="/catalog" className="font-label-sm text-label-sm text-white/80 uppercase tracking-widest border-b border-white/40 pb-1 inline-block">Ver Selección</Link>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/* Category: Hombre */}
            <div className="flex-1 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxiQEvJDx7uULuaK0UQ01pcfNn9DznZbRO7O4yrZRH1sf4Pp0FqAjYUl2gTQ6dk3GXA-icqbV-DhVoVVozphgb5atL3cuEs48zJCkMeGyVt9rgT67xjXgWXuFb3QNFgkDYPpRsipV0z2GF0uXm_iYECt6u8UapwEqBCnUqdhj2GpvotQQqS0UI3czyu4HDuSD5uDO3uVz5paLnx2wT5vnqnq2RoYSIW3JNhwg4VISFTB4ooUXvb-0o')" }}></div>
              <div className="absolute inset-0 bg-on-background/10 group-hover:bg-on-background/20 transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <h2 className="font-headline-md text-headline-md text-white mb-1">Hombre</h2>
                <Link to="/catalog" className="font-label-sm text-label-sm text-white/80 uppercase tracking-widest inline-block">Explorar</Link>
              </div>
            </div>
            {/* Category: Niños */}
            <div className="flex-1 relative group overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGQYWODBL0VqTfYuw3_hObbd_tsbPeoNIkApvoWg31ndLwlyJNaUfZvMkCxiWvLzyJNQ81qKsePym8qNaEzhPETAn6WDEfZQSzzwGtUp7F4gNOm9c715sX3WdK-gK6HoXaRYUtc-NaEjYeGX603VXLOHHREvaz8PTwH9tXyaM9GcLqATCPw91WzyP9e0bBuwf4kzVL0M85fnWdrJANsi7fPzwB4hUcUenplC8EqgWXHou9yPrRo30p')" }}></div>
              <div className="absolute inset-0 bg-on-background/10 group-hover:bg-on-background/20 transition-colors"></div>
              <div className="absolute bottom-8 left-8">
                <h2 className="font-headline-md text-headline-md text-white mb-1">Niños</h2>
                <Link to="/catalog" className="font-label-sm text-label-sm text-white/80 uppercase tracking-widest inline-block">Descubrir</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers / Featured Products (Piezas Icónicas Configurable from CMS) */}
      <section className="bg-surface-container-low py-section-gap">
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-2 block font-bold">
                {iconicPieces.sectionBadge || 'Los Favoritos'}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {iconicPieces.sectionTitle || 'Piezas Icónicas'}
              </h2>
            </div>
            <Link
              to={iconicPieces.viewAllUrl || '/catalog'}
              className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all border-b border-outline-variant pb-1 font-bold flex items-center gap-1"
            >
              Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter">
            {(iconicPieces.items || defaultIconicPieces.items).map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <Link
                  to={item.url || '/catalog'}
                  className="block relative aspect-[3/4] mb-6 overflow-hidden rounded-xl border border-outline-variant/20 shadow-xs bg-surface-bright"
                >
                  <img
                    src={item.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={item.title}
                  />
                  <button className="absolute bottom-4 right-4 bg-surface-bright/90 backdrop-blur-md p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 rounded-full shadow-md hover:bg-secondary hover:text-white">
                    <span className="material-symbols-outlined text-secondary hover:text-white">
                      add_shopping_cart
                    </span>
                  </button>
                </Link>
                <div className="text-center">
                  <h3 className="font-headline-md text-[18px] mb-1 text-on-surface font-bold">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-secondary font-bold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-section-gap relative overflow-hidden">
        <div className="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="scroll-reveal">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary mb-6 block">Nuestra Filosofía</span>
            <h2 className="font-headline-lg text-headline-lg mb-8 leading-tight">Diseñado para ser sentido, no solo visto.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-container rounded-full shrink-0">
                  <span className="material-symbols-outlined text-primary">spa</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[20px] mb-2">Comodidad Sensorial</h4>
                  <p className="text-on-surface-variant">Utilizamos solo las fibras más finas de seda y algodón orgánico para garantizar una suavidad que acaricia la piel durante todo el día.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-container rounded-full shrink-0">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[20px] mb-2">Artesanía Impecable</h4>
                  <p className="text-on-surface-variant">Cada costura es revisada meticulosamente para asegurar que la estructura y el acabado cumplan con los estándares del lujo moderno.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-container rounded-full shrink-0">
                  <span className="material-symbols-outlined text-primary">eco</span>
                </div>
                <div>
                  <h4 className="font-headline-md text-[20px] mb-2">Compromiso Consciente</h4>
                  <p className="text-on-surface-variant">Nuestra producción es limitada y ética, priorizando la longevidad del producto y el respeto por el medio ambiente.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative scroll-reveal">
            <div className="aspect-[4/5] bg-surface-variant overflow-hidden">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA93BuJdGOf2rGC2MNKmsPDCGW83vOWIK5C0c1CGkznFl5FeENXEnHxyUiSzcEVhVMhqDn0mQ6xtUxDgOCYCY87n_OxGTQDORkftwF0t_2v-zGgqI6IMqHJNvyz6AB1qTeEp0LYy-7usvp3a0xExzqHfs5C0jWKtQRciVRLq_04N_1pYgaD-7OKt07psQLl0pXb5tawU9lMQ1efzC6dz3VaJzSA1PYOviClfRoJu3OJ7co4QGTY4AJV" className="w-full h-full object-cover" alt="Promise" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 aspect-square bg-secondary-container p-8 hidden md:block">
              <p className="font-headline-md italic text-on-secondary-container">"La verdadera elegancia comienza desde la capa más íntima."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="bg-surface-dim py-section-gap">
        <div className="max-w-2xl mx-auto text-center px-margin-mobile">
          <h2 className="font-headline-lg text-headline-lg mb-6">Únete a Karisme</h2>
          <p className="text-on-surface-variant mb-10">Suscríbete para recibir lanzamientos exclusivos, historias sobre nuestra artesanía y un 10% de descuento en tu primera compra.</p>
          <form className="flex flex-col md:flex-row gap-4" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="TU CORREO ELECTRÓNICO" className="flex-1 bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-4 font-label-sm text-label-sm transition-all outline-none" />
            <button type="submit" className="bg-on-background text-on-primary px-12 py-4 font-label-sm text-label-sm uppercase tracking-widest hover:bg-primary transition-all">Suscribirse</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
