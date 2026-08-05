import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';

const defaultHero = {
  headline: 'La esencia de lo invisible.',
  subtitle:
    'Lencería diseñada para fundirse con tu piel, ofreciendo una comodidad inigualable sin comprometer la elegancia más pura en Costa Rica.',
  cta: 'Comprar Nueva Colección',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJbHOp75pFUHY7fVFwwGF0Ob1duwguXF1soH7YPzidYjS3CmjVLbK8GVdEmH6ZgBhX5O3qHeuqcCPUjmFE_ghhJpnL_Ett3k4o8om4lZ2a6NLlnukdr9Etg4Tkp_KhFVOarC0T2H0SJHO_PVZRTmx1gB8DihJKsBADUK39944JVeMiABv871r0Ncxjt0WkAkHo4XVM0LrTj87fh6VcqcEDFG3p-CCynmmdM88mWCkr9otWmv0rMS2',
  },
  {
    id: '2',
    title: 'Nueva Colección Karisme Intimates',
    subtitle: 'Piezas exclusivas en seda y encaje hipoalergénico',
    icon: 'local_florist',
    url: '/catalog?cat=mujer',
    scope: 'Home Only',
    active: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1D7kwPYAaRUwZnQj-kQzPghPRhn2KqgKKHdPDzTBAXLdEEsiLdYjivIExWu07l79x9H_miKd_6gNB0gatV0bzqZUu40Ne82VLHweGkff8N0D5Nmsp_EAzpFRTM3Ort1yOUndN9DkaIiPLNg6B7V21zrG-Ka6dzQKugiFLESSMRVEfWOdBuMWO9ufQaTcnRBtHJdTKngeKb4FigbLDRgYoueh_0HAqgkyVEtvjJ9L4WzUH0vkrvqje',
  },
  {
    id: '3',
    title: '10% OFF con Código KARISME10',
    subtitle: 'Válido en tu primera compra pagando con SINPE o Tilopay',
    icon: 'sell',
    url: '/cart',
    scope: 'Carrito',
    active: false,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdCRNUmOzuqXakq9Y-IVSubsl9_Mc39oKjW4pP4dfhBqQUXSptSd2Voa8AI1mtSo-0Wr-UmGjTzrk--oE8nYyYEUOseSINguK3sccXuVEPKPkiAcCW7FZKW66ym75WhNWcXIjr_S9dOHmP93E9GvMvoRrV05W7ZLnVbQkvBUy7VvoZ8v13T6LXgKntf-1k2GiRcyF_D2ryyx1ry00SFYJ-xtzGefCD1nUOhBMWMbKKQ2qg1_gBPAJQ',
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
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAcrKC3ZAhqabtB_lZXA1ybbzJflWRyPltzSb1WUxaVwRQXIuHYBYMxNRuuItQlpBiKvB2tmMtrdLmayFfU_TEn2FK9jX4O6_5Qlc4bnQpz-MQ3bRfWdy28SjfZwcM_fvPPmXeBZMJmYabnpUcAZLSJcT83AdrtT6y9-SasJaysHDccwN7oEVka6AmK29QEEdOKORplCKKfvoVTnvdDFcu_pgTIe2zYJmqY2PmWTvNOhzUHNVPdiOF',
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

const availableIcons = [
  { id: 'local_shipping', label: '🚚 Envío (Local Shipping)' },
  { id: 'local_florist', label: '🌸 Flor / Marca Karisme' },
  { id: 'sell', label: '🏷️ Descuento / Oferta' },
  { id: 'eco', label: '🌱 Sostenible / Ecológico' },
  { id: 'star', label: '⭐ Destacado' },
  { id: 'verified', label: '🛡️ Garantía / Oficial' },
];

const availableScopes = ['Todo el sitio', 'Home Only', 'Catálogo', 'Carrito'];

const storeRoutesOptions = [
  { value: '/catalog', label: '🛍️ Catálogo Completo (/catalog)' },
  { value: '/catalog?cat=mujer', label: '👙 Sección Mujer - Lencería (/catalog?cat=mujer)' },
  { value: '/catalog-men', label: '👔 Sección Hombre (/catalog-men)' },
  { value: '/catalog-kids', label: '🧸 Sección Niños / Infantil (/catalog-kids)' },
  { value: '/cart', label: '🛒 Bolsa de Compras & Check-out (/cart)' },
  { value: '/profile', label: '👤 Perfil de Usuario & Envíos (/profile)' },
  { value: '/', label: '🏠 Página Principal (/)' },
  { value: 'custom', label: '✏️ Otra URL / Enlace Personalizado...' },
];

const heroPresets = [
  {
    name: 'Seda & Encaje (Original)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQZJAfKUEI5tsOoAq5LQynTMfHECTfR8WPFo3F7Def6l1EEKAtyu7pm1vzYgfPQZOtH70uUPmF_uI0v6MZXzRH5qIqyThLxVGF1MG46ub4zI2_faIJKDbwD20ISqcXUJtOARq9l9bMSYJuWseHS6gkhi6IQbCio0csGTtMgNRT7KX_VD1uIsUIxFWfd2CCSS8zrmCPufo-lluitynHJ9nNhK9e8938Im2Z0dCOriPLhc2TzQICWrMa',
  },
  {
    name: 'Satin Rose Mood',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc5bio7LcNAtOJZT02jY3TZMUwIG5m-mShORJCwcgusAfJ4Td9FPwAUfCTWYBmLkfGkWdT_AWy5Tl6l5rySZyJKAv9eLmldKTsgwGl4WxCSblk9y5zQf6rTd8FncY4qu-gPav5uP5vkxHXc4wtTS_J0wiTj9IZsysAFC6FYg86-DRx9-ewS-loZGPlIIVYHv5UoSE5sQiJR2G6_SLdI4Dr32E4MEUxon03PiCLfTFU_J6Ni0v_qMcl',
  },
  {
    name: 'Azul Nube Lounge',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1D7kwPYAaRUwZnQj-kQzPghPRhn2KqgKKHdPDzTBAXLdEEsiLdYjivIExWu07l79x9H_miKd_6gNB0gatV0bzqZUu40Ne82VLHweGkff8N0D5Nmsp_EAzpFRTM3Ort1yOUndN9DkaIiPLNg6B7V21zrG-Ka6dzQKugiFLESSMRVEfWOdBuMWO9ufQaTcnRBtHJdTKngeKb4FigbLDRgYoueh_0HAqgkyVEtvjJ9L4WzUH0vkrvqje',
  },
];

const Cms = () => {
  // Persistence state
  const [hero, setHero] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_cms_hero');
      return saved ? JSON.parse(saved) : defaultHero;
    } catch {
      return defaultHero;
    }
  });

  const [banners, setBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_cms_banners');
      return saved ? JSON.parse(saved) : defaultBanners;
    } catch {
      return defaultBanners;
    }
  });

  const [iconicPieces, setIconicPieces] = useState(() => {
    try {
      const saved = localStorage.getItem('karisme_cms_iconic_pieces');
      return saved ? JSON.parse(saved) : defaultIconicPieces;
    } catch {
      return defaultIconicPieces;
    }
  });

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Modal State for adding/editing banner
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerFormData, setBannerFormData] = useState({
    title: '',
    subtitle: '',
    icon: 'local_shipping',
    url: '',
    scope: 'Todo el sitio',
    active: true,
    image: '',
  });

  // Modal State for adding/editing iconic pieces
  const [isIconicModalOpen, setIsIconicModalOpen] = useState(false);
  const [editingIconicItem, setEditingIconicItem] = useState(null);
  const [iconicFormData, setIconicFormData] = useState({
    title: '',
    price: '',
    image: '',
    url: '/catalog',
  });

  // Modal State for Expanded Live Preview
  const [isExpandedPreviewOpen, setIsExpandedPreviewOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karisme_cms_hero', JSON.stringify(hero));
      window.dispatchEvent(new Event('cms-update'));
    } catch {
      // fallback
    }
  }, [hero]);

  useEffect(() => {
    try {
      localStorage.setItem('karisme_cms_banners', JSON.stringify(banners));
      window.dispatchEvent(new Event('cms-update'));
    } catch {
      // fallback
    }
  }, [banners]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'karisme_cms_iconic_pieces',
        JSON.stringify(iconicPieces)
      );
      window.dispatchEvent(new Event('cms-update'));
    } catch {
      // fallback
    }
  }, [iconicPieces]);

  // Auto-rotating Carousel Timer for Live Preview when 2+ active banners exist
  useEffect(() => {
    const activeList = banners.filter((b) => b.active);
    if (activeList.length < 2) return;

    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % activeList.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [banners]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handlePublish = () => {
    triggerToast('¡Cambios del CMS publicados en vivo correctamente!');
  };

  const handleReset = () => {
    if (
      confirm(
        '¿Deseas restaurar la página de Inicio y sus secciones a los contenidos iniciales por defecto?'
      )
    ) {
      try {
        localStorage.removeItem('karisme_cms_hero');
        localStorage.removeItem('karisme_cms_banners');
        localStorage.removeItem('karisme_cms_iconic_pieces');
      } catch {
        // fallback
      }
      setHero(defaultHero);
      setBanners(defaultBanners);
      setIconicPieces(defaultIconicPieces);
      triggerToast('¡Diseño y piezas iniciales restauradas con éxito!');
    }
  };

  // Banner CRUD actions
  const handleOpenAddBanner = () => {
    setEditingBanner(null);
    setBannerFormData({
      title: '',
      subtitle: '',
      icon: 'local_shipping',
      url: '/catalog',
      scope: 'Todo el sitio',
      active: true,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAc5bio7LcNAtOJZT02jY3TZMUwIG5m-mShORJCwcgusAfJ4Td9FPwAUfCTWYBmLkfGkWdT_AWy5Tl6l5rySZyJKAv9eLmldKTsgwGl4WxCSblk9y5zQf6rTd8FncY4qu-gPav5uP5vkxHXc4wtTS_J0wiTj9IZsysAFC6FYg86-DRx9-ewS-loZGPlIIVYHv5UoSE5sQiJR2G6_SLdI4Dr32E4MEUxon03PiCLfTFU_J6Ni0v_qMcl',
    });
    setIsBannerModalOpen(true);
  };

  const handleOpenEditBanner = (banner) => {
    setEditingBanner(banner);
    setBannerFormData({ ...banner });
    setIsBannerModalOpen(true);
  };

  const handleToggleBannerStatus = (id) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );
    triggerToast('Estado del banner actualizado.');
  };

  const handleDeleteBanner = (id) => {
    if (confirm('¿Seguro que deseas eliminar este banner promocional?')) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      triggerToast('Banner promocional eliminado.');
    }
  };

  const handleSaveBannerModal = (e) => {
    e.preventDefault();
    if (!bannerFormData.title.trim()) return;

    if (editingBanner) {
      // Edit existing
      setBanners((prev) =>
        prev.map((b) => (b.id === editingBanner.id ? { ...bannerFormData } : b))
      );
      triggerToast('Banner actualizado con éxito.');
    } else {
      // Create new
      const newBanner = {
        ...bannerFormData,
        id: Date.now().toString(),
      };
      setBanners((prev) => [...prev, newBanner]);
      triggerToast('Nuevo banner creado con éxito.');
    }
    setIsBannerModalOpen(false);
  };

  // Iconic Pieces Actions
  const handleOpenAddIconicItem = () => {
    setEditingIconicItem(null);
    setIconicFormData({
      title: '',
      price: '₡25.000',
      image:
        products[0]?.image ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAd5Qx2rLhE4i3iCyU2TmJhOzyFavYbl-pzYD5sabcYzTUL34Bq4YZqzTsW80LIVry7ZFGjtTOn3C4L4GJppZgjqDujmyhXfJIBCyh_qELKnRrtMPqMvEl2WNM4hZroEt8U8DHrL61v_LLkU6fYzrAI7MmPmYoTV49iHZ9GEjw_MjRV2NTemSQSRRtZIGrRB2JPO9zBstlyFlkA-UXlwRIOuUzvAs9kntxF3ZOvaxlcAgW07gsaWjvW',
      url: '/catalog',
    });
    setIsIconicModalOpen(true);
  };

  const handleOpenEditIconicItem = (item) => {
    setEditingIconicItem(item);
    setIconicFormData({ ...item });
    setIsIconicModalOpen(true);
  };

  const handleDeleteIconicItem = (id) => {
    if (confirm('¿Deseas eliminar este producto de la sección Piezas Icónicas?')) {
      setIconicPieces((prev) => ({
        ...prev,
        items: prev.items.filter((it) => it.id !== id),
      }));
      triggerToast('Pieza eliminada de la sección.');
    }
  };

  const handleMoveIconicItem = (index, direction) => {
    const items = [...iconicPieces.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[index];
    items[index] = items[targetIdx];
    items[targetIdx] = temp;
    setIconicPieces((prev) => ({ ...prev, items }));
  };

  const handleSelectCatalogProduct = (e) => {
    const prodId = e.target.value;
    if (!prodId) return;
    const found = products.find((p) => p.id.toString() === prodId.toString());
    if (found) {
      setIconicFormData({
        title: found.name,
        price: `₡${found.price.toLocaleString('es-CR')}`,
        image: found.image,
        url: `/product/${found.id}`,
      });
      triggerToast(`Datos cargados desde "${found.name}"`);
    }
  };

  const handleSaveIconicModal = (e) => {
    e.preventDefault();
    if (!iconicFormData.title.trim()) return;

    if (editingIconicItem) {
      // Edit existing item
      setIconicPieces((prev) => ({
        ...prev,
        items: prev.items.map((it) =>
          it.id === editingIconicItem.id ? { ...iconicFormData } : it
        ),
      }));
      triggerToast('Pieza destacada actualizada.');
    } else {
      // Create new item
      const newItem = {
        ...iconicFormData,
        id: Date.now().toString(),
      };
      setIconicPieces((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));
      triggerToast('Nueva pieza agregada al catálogo de inicio.');
    }
    setIsIconicModalOpen(false);
  };

  const activeBannersList = banners.filter((b) => b.active);
  const currentBannerPreview =
    activeBannersList[activeBannerIndex % (activeBannersList.length || 1)] || null;

  return (
    <>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-6 right-6 bg-on-surface text-surface px-6 py-3 rounded-xl shadow-2xl z-50 animate-bounce font-label-sm text-sm border border-outline-variant">
          ✨ {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Editor de Contenido (CMS)
          </h2>
          <p className="text-on-surface-variant font-body-md max-w-xl">
            Personaliza el Hero principal, administra tus anuncios promocionales y configura los productos destacados de "Piezas Icónicas".
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 border border-secondary text-secondary rounded-xl font-label-sm text-xs uppercase tracking-wider hover:bg-secondary/10 transition-all cursor-pointer font-bold"
          >
            Descartar Todo
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="px-8 py-2.5 bg-primary text-on-primary rounded-xl font-label-sm text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer font-bold"
          >
            Publicar Cambios
          </button>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row gap-[2.5%] w-full mb-12 items-start">
        {/* CMS Controls (Left Column - 46% Fluid Width) */}
        <div className="w-full xl:w-[46%] flex flex-col gap-8">
          {/* 1. Hero Section Editor */}
          <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                view_quilt
              </span>
              <h3 className="font-headline-md text-headline-md">
                Sección Hero de Inicio
              </h3>
            </div>
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  Título Principal (Headline)
                </label>
                <input
                  className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-headline-md text-xl text-on-surface focus:outline-none focus:border-primary"
                  type="text"
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                  Subtítulo / Bajada
                </label>
                <textarea
                  rows={2}
                  className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary"
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    Texto del Botón (CTA)
                  </label>
                  <textarea
                    rows={2}
                    className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-2.5 font-body-md text-on-surface focus:outline-none focus:border-primary resize-y"
                    value={hero.cta}
                    onChange={(e) => setHero({ ...hero, cta: e.target.value })}
                    placeholder="Texto del botón (CTA)..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                    Página / URL de Destino (Dropdown)
                  </label>
                  <select
                    value={
                      storeRoutesOptions.some((opt) => opt.value === hero.url)
                        ? hero.url
                        : 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        setHero({ ...hero, url: e.target.value });
                      }
                    }}
                    className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {storeRoutesOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {!storeRoutesOptions.some((opt) => opt.value === hero.url) && (
                    <input
                      type="text"
                      placeholder="Escribe tu URL personalizada (http...)"
                      value={hero.url}
                      onChange={(e) => setHero({ ...hero, url: e.target.value })}
                      className="bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-2 font-mono text-xs text-on-surface focus:outline-none focus:border-primary mt-1"
                    />
                  )}
                </div>
              </div>

              <div className="pt-2">
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-2 font-bold">
                  Imagen de Fondo del Hero
                </label>
                
                {/* Presets selector */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
                  <span className="text-xs font-bold text-on-surface-variant shrink-0">
                    Estilos predeterminados:
                  </span>
                  {heroPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setHero({ ...hero, bgImage: preset.url })}
                      className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer shrink-0 font-bold ${
                        hero.bgImage === preset.url
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-surface-bright border-outline-variant/40 text-on-surface-variant hover:border-secondary'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  className="w-full bg-surface-bright border border-outline-variant/50 rounded-xl px-4 py-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-primary mb-3"
                  value={hero.bgImage}
                  onChange={(e) => setHero({ ...hero, bgImage: e.target.value })}
                  placeholder="O escribe/pega la URL de tu imagen personalizada..."
                />

                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-outline-variant/40 group">
                  <img
                    src={hero.bgImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-label-sm text-xs uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-lg font-bold">
                      Vista previa de fondo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Promo Banners Section */}
          <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  campaign
                </span>
                <h3 className="font-headline-md text-headline-md">
                  Banners Promocionales ({banners.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={handleOpenAddBanner}
                className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-1 font-label-sm text-xs uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Nuevo Banner
              </button>
            </div>

            <div className="space-y-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    banner.active
                      ? 'bg-surface-bright border-secondary/40 shadow-xs'
                      : 'bg-surface-container/60 border-outline-variant/20 opacity-70'
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden border border-outline-variant/30 relative">
                    <img
                      className="w-full h-full object-cover"
                      src={banner.image || hero.bgImage}
                      alt={banner.title}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-base">
                        {banner.icon || 'local_shipping'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-body-md truncate text-on-surface">
                        {banner.title}
                      </p>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          banner.active
                            ? 'bg-secondary/15 text-secondary'
                            : 'bg-outline-variant/30 text-on-surface-variant'
                        }`}
                      >
                        {banner.active ? 'Activo' : 'Pausado'}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant truncate">
                      {banner.subtitle} • <span className="font-mono">{banner.scope}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleBannerStatus(banner.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        banner.active
                          ? 'text-secondary hover:bg-secondary/10'
                          : 'text-on-surface-variant hover:bg-surface-variant'
                      }`}
                      title={banner.active ? 'Pausar Banner' : 'Activar Banner'}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {banner.active ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEditBanner(banner)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-lg transition-colors cursor-pointer"
                      title="Editar Banner"
                    >
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar Banner"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Iconic Pieces Editor (Piezas Icónicas) */}
          <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  styler
                </span>
                <div>
                  <h3 className="font-headline-md text-headline-md">
                    Piezas Icónicas (Favoritos)
                  </h3>
                  <p className="text-xs text-on-surface-variant font-medium">
                    {iconicPieces.items.length} productos destacados en la página principal
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleOpenAddIconicItem}
                className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-1 font-label-sm text-xs uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Agregar Pieza
              </button>
            </div>

            {/* Section Titles Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-bright p-4 rounded-xl border border-outline-variant/30">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Etiqueta Superior (Badge)
                </label>
                <input
                  type="text"
                  value={iconicPieces.sectionBadge}
                  onChange={(e) =>
                    setIconicPieces({ ...iconicPieces, sectionBadge: e.target.value })
                  }
                  placeholder="Ej. Los Favoritos"
                  className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-xs font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Título de la Sección
                </label>
                <input
                  type="text"
                  value={iconicPieces.sectionTitle}
                  onChange={(e) =>
                    setIconicPieces({ ...iconicPieces, sectionTitle: e.target.value })
                  }
                  placeholder="Ej. Piezas Icónicas"
                  className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-xs font-bold text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1 pt-1">
                <label className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Enlace "Ver Todo" (Destino)
                </label>
                <select
                  value={
                    storeRoutesOptions.some((opt) => opt.value === iconicPieces.viewAllUrl)
                      ? iconicPieces.viewAllUrl
                      : 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      setIconicPieces({ ...iconicPieces, viewAllUrl: e.target.value });
                    }
                  }}
                  className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 text-xs text-on-surface focus:outline-none focus:border-primary cursor-pointer"
                >
                  {storeRoutesOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {!storeRoutesOptions.some(
                  (opt) => opt.value === iconicPieces.viewAllUrl
                ) && (
                  <input
                    type="text"
                    value={iconicPieces.viewAllUrl}
                    onChange={(e) =>
                      setIconicPieces({ ...iconicPieces, viewAllUrl: e.target.value })
                    }
                    placeholder="URL personalizada..."
                    className="bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-1.5 text-xs font-mono mt-1"
                  />
                )}
              </div>
            </div>

            {/* List of Iconic Items */}
            <div className="space-y-3">
              {iconicPieces.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3.5 bg-surface-bright rounded-xl border border-outline-variant/30 hover:border-secondary/40 transition-all shadow-xs"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/30 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-on-surface truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-secondary font-bold">
                      {item.price}{' '}
                      <span className="text-on-surface-variant font-normal font-mono text-[10px] ml-1">
                        • {item.url}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Order up/down */}
                    <div className="flex flex-col">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveIconicItem(index, 'up')}
                        className={`p-1 rounded text-on-surface-variant hover:text-primary transition-colors ${
                          index === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:bg-surface-container'
                        }`}
                        title="Subir posición"
                      >
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                      </button>
                      <button
                        type="button"
                        disabled={index === iconicPieces.items.length - 1}
                        onClick={() => handleMoveIconicItem(index, 'down')}
                        className={`p-1 rounded text-on-surface-variant hover:text-primary transition-colors ${
                          index === iconicPieces.items.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer hover:bg-surface-container'
                        }`}
                        title="Bajar posición"
                      >
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenEditIconicItem(item)}
                      className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/20 rounded-lg transition-colors cursor-pointer"
                      title="Editar pieza"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteIconicItem(item.id)}
                      className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-lg transition-colors cursor-pointer"
                      title="Eliminar pieza"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {iconicPieces.items.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-outline-variant/40 rounded-xl bg-surface-container/30">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2">
                    inventory_2
                  </span>
                  <p className="text-sm text-on-surface-variant font-medium">
                    No hay productos configurados en esta sección.
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenAddIconicItem}
                    className="mt-3 text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    + Agregar el primer producto
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Live Preview (Right Column - 51.5% Fluid Width) */}
        <div className="w-full xl:w-[51.5%] min-w-0">
          <div className="sticky top-8 space-y-6">
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
              <h3 className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  preview
                </span>
                Previsualización en Tiempo Real
              </h3>
              <div className="flex gap-2 bg-surface-bright p-1 rounded-lg border border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded flex items-center gap-1 text-xs font-label-sm cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    desktop_windows
                  </span>
                  Escritorio
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded flex items-center gap-1 text-xs font-label-sm cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">smartphone</span>
                  Móvil
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpandedPreviewOpen(true)}
                  className="p-1.5 rounded flex items-center gap-1 text-xs font-label-sm cursor-pointer text-secondary hover:bg-secondary/10 border border-secondary/30 transition-colors font-bold ml-1"
                  title="Ampliar vista previa"
                >
                  <span className="material-symbols-outlined text-sm">open_in_full</span>
                  Ampliar
                </button>
              </div>
            </div>

            {/* Canvas Mockup Container */}
            <div
              className={`mx-auto transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-white relative ${
                previewDevice === 'mobile'
                  ? 'max-w-[360px] aspect-[9/16]'
                  : 'w-full aspect-[16/11]'
              }`}
            >
              {/* Mockup Browser Header */}
              <div className="bg-surface-container-low h-9 w-full flex items-center px-4 gap-2 border-b border-outline-variant/20 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-outline/30"></div>
                </div>
                <div className="mx-auto bg-surface h-5 rounded-full w-2/3 flex items-center justify-center px-3 border border-outline-variant/10">
                  <span className="text-[10px] text-outline truncate font-mono">
                    karisme-innerwear.com
                  </span>
                </div>
              </div>

              {/* Mockup Inner Content (Scrollable) */}
              <div className="relative overflow-y-auto h-[calc(100%-36px)] flex flex-col scroll-smooth">
                {/* 1. Real Navbar Mockup (Top Position) */}
                <div className="bg-surface/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-outline-variant/20 z-20 flex-shrink-0 shadow-xs sticky top-0">
                  <span className="font-brand-script text-2xl text-on-surface">
                    Karisme
                  </span>
                  <div className="hidden md:flex items-center gap-4 font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                    <span className="hover:text-primary cursor-pointer">Mujer</span>
                    <span className="hover:text-primary cursor-pointer">Hombre</span>
                    <span className="hover:text-primary cursor-pointer">Niños</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-base">search</span>
                    <span className="material-symbols-outlined text-base">person</span>
                    <div className="relative">
                      <span className="material-symbols-outlined text-base">
                        shopping_bag
                      </span>
                      <span className="absolute -top-1 -right-1.5 bg-secondary text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                        2
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Announcement Banner Carousel Mockup (Below Navbar) */}
                {currentBannerPreview ? (
                  <div className="bg-surface-container-high/90 border-b border-outline-variant/30 py-2 px-3 text-center relative z-10 flex-shrink-0 select-none">
                    <div className="flex items-center justify-between gap-2">
                      {activeBannersList.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveBannerIndex(
                              (prev) =>
                                (prev - 1 + activeBannersList.length) %
                                activeBannersList.length
                            )
                          }
                          className="p-0.5 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                        >
                          <span className="material-symbols-outlined text-base">
                            chevron_left
                          </span>
                        </button>
                      ) : (
                        <div className="w-4"></div>
                      )}

                      <div
                        key={`preview-banner-${currentBannerPreview.id}-${activeBannerIndex}`}
                        className="flex-1 flex items-center justify-center gap-1.5 min-w-0 truncate animate-fade-in py-0.5"
                      >
                        <span className="material-symbols-outlined text-secondary text-xs shrink-0">
                          {currentBannerPreview.icon || 'campaign'}
                        </span>
                        <p className="font-label-sm text-[10px] text-on-surface truncate">
                          <strong className="text-secondary font-bold uppercase tracking-wider mr-1">
                            {currentBannerPreview.title}:
                          </strong>
                          <span className="text-on-surface-variant font-medium">
                            {currentBannerPreview.subtitle}
                          </span>
                        </p>
                        <span className="font-label-sm text-[9px] uppercase tracking-wider text-secondary font-bold hover:underline shrink-0 flex items-center gap-0.5 ml-1">
                          Ver Más <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                        </span>
                      </div>

                      {activeBannersList.length > 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveBannerIndex(
                              (prev) => (prev + 1) % activeBannersList.length
                            )
                          }
                          className="p-0.5 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                        >
                          <span className="material-symbols-outlined text-base">
                            chevron_right
                          </span>
                        </button>
                      ) : (
                        <div className="w-4"></div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* 3. Real Hero Canvas Background */}
                <div
                  className="relative h-[280px] md:h-[340px] shrink-0 bg-cover bg-center transition-all duration-700 flex items-center"
                  style={{ backgroundImage: `url('${hero.bgImage}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent"></div>

                  {/* Hero Content */}
                  <div className="relative z-10 px-6 md:px-10 max-w-sm">
                    <span className="font-label-sm text-[9px] uppercase tracking-[0.25em] text-primary mb-2 block font-bold">
                      Karisme Innerwear
                    </span>
                    <h2 className="font-display-lg text-on-background text-xl md:text-2xl mb-2 leading-tight drop-shadow-xs">
                      {hero.headline}
                    </h2>
                    <p className="font-body-md text-on-surface-variant text-[11px] md:text-xs mb-4 line-clamp-2 leading-relaxed">
                      {hero.subtitle}
                    </p>
                    <button className="bg-on-background text-on-primary px-5 py-2 rounded-xl font-label-sm text-[10px] uppercase tracking-widest hover:bg-primary transition-all font-bold shadow-md">
                      {hero.cta || 'Comprar Nueva Colección'}
                    </button>
                  </div>
                </div>

                {/* 4. Live Preview: Piezas Icónicas (Exact Replica of Home.jsx) */}
                <div className="bg-surface-container-low py-6 px-4 md:px-6 shrink-0 border-t border-outline-variant/20">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="font-label-sm text-[9px] uppercase tracking-widest text-primary block font-bold">
                        {iconicPieces.sectionBadge || 'Los Favoritos'}
                      </span>
                      <h3 className="font-headline-md text-sm md:text-base text-on-surface font-bold">
                        {iconicPieces.sectionTitle || 'Piezas Icónicas'}
                      </h3>
                    </div>
                    <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-0.5 border-b border-outline-variant pb-0.5">
                      Ver Todo <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {iconicPieces.items.map((item) => (
                      <div key={item.id} className="group flex flex-col">
                        <div className="relative aspect-[3/4] mb-2 overflow-hidden rounded-lg border border-outline-variant/20 bg-surface-bright shadow-2xs">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 right-2 bg-surface-bright/90 p-1.5 rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-secondary text-xs">
                              add_shopping_cart
                            </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="font-bold text-[11px] text-on-surface truncate">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-secondary font-bold">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Analytics */}
            <div className="grid grid-cols-3 gap-gutter">
              <div className="bg-surface-container-low p-4 rounded-xl text-center border border-outline-variant/30">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                  Banners Activos
                </p>
                <p className="font-headline-md text-primary text-xl font-bold">
                  {activeBannersList.length} / {banners.length}
                </p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl text-center border border-outline-variant/30">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                  Piezas Destacadas
                </p>
                <p className="font-headline-md text-primary text-xl font-bold">
                  {iconicPieces.items.length}
                </p>
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl text-center border border-outline-variant/30">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1 font-bold">
                  LCP Rendimiento
                </p>
                <p className="font-headline-md text-secondary text-xl font-bold">0.7s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Add / Edit Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md">
                {editingBanner ? 'Editar Banner Promocional' : 'Nuevo Banner Promocional'}
              </h3>
              <button
                type="button"
                onClick={() => setIsBannerModalOpen(false)}
                className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveBannerModal} className="space-y-4">
              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Título del Anuncio
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Envío Gratis Sostenible en GAM"
                  value={bannerFormData.title}
                  onChange={(e) =>
                    setBannerFormData({ ...bannerFormData, title: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Subtítulo / Descripción
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. En compras superiores a ₡35.000"
                  value={bannerFormData.subtitle}
                  onChange={(e) =>
                    setBannerFormData({ ...bannerFormData, subtitle: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Icono Representativo
                  </label>
                  <select
                    value={bannerFormData.icon}
                    onChange={(e) =>
                      setBannerFormData({ ...bannerFormData, icon: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm cursor-pointer"
                  >
                    {availableIcons.map((ic) => (
                      <option key={ic.id} value={ic.id}>
                        {ic.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                    Alcance / Ubicación
                  </label>
                  <select
                    value={bannerFormData.scope}
                    onChange={(e) =>
                      setBannerFormData({ ...bannerFormData, scope: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm cursor-pointer"
                  >
                    {availableScopes.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Página / URL de Destino al Hacer Clic
                </label>
                <select
                  value={
                    storeRoutesOptions.some((opt) => opt.value === bannerFormData.url)
                      ? bannerFormData.url
                      : 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      setBannerFormData({ ...bannerFormData, url: e.target.value });
                    }
                  }}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm cursor-pointer mb-1"
                >
                  {storeRoutesOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {!storeRoutesOptions.some((opt) => opt.value === bannerFormData.url) && (
                  <input
                    type="text"
                    required
                    placeholder="Escribe tu URL personalizada (http...)"
                    value={bannerFormData.url}
                    onChange={(e) =>
                      setBannerFormData({ ...bannerFormData, url: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-mono"
                  />
                )}
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  URL de Imagen de Fondo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={bannerFormData.image}
                  onChange={(e) =>
                    setBannerFormData({ ...bannerFormData, image: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="bannerActiveCheck"
                  checked={bannerFormData.active}
                  onChange={(e) =>
                    setBannerFormData({ ...bannerFormData, active: e.target.checked })
                  }
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="bannerActiveCheck"
                  className="font-label-sm text-xs uppercase tracking-wider text-on-surface font-bold cursor-pointer"
                >
                  Activo para publicación (Visible en la tienda)
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold"
                >
                  {editingBanner ? 'Guardar Cambios' : 'Crear Banner'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Iconic Piece Add / Edit Modal */}
      {isIconicModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-outline-variant/30 animate-fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  styler
                </span>
                <h3 className="font-headline-md text-headline-md">
                  {editingIconicItem ? 'Editar Pieza Icónica' : 'Agregar Pieza Icónica'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsIconicModalOpen(false)}
                className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Quick-fill from catalog products */}
            <div className="mb-5 p-3.5 bg-surface-container-low rounded-xl border border-primary/20">
              <label className="font-label-sm text-[11px] uppercase tracking-wider text-primary block mb-1.5 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">inventory</span>
                Importar producto rápido desde el Catálogo:
              </label>
              <select
                onChange={handleSelectCatalogProduct}
                defaultValue=""
                className="w-full bg-surface-bright px-3 py-2 rounded-lg border border-outline-variant/50 text-xs text-on-surface font-medium cursor-pointer"
              >
                <option value="" disabled>
                  -- Selecciona un producto para autorrellenar --
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.gender || 'Mujer'}) - ₡{p.price.toLocaleString('es-CR')}
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSaveIconicModal} className="space-y-4">
              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Nombre del Producto / Título
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Bralette Silk Noire"
                  value={iconicFormData.title}
                  onChange={(e) =>
                    setIconicFormData({ ...iconicFormData, title: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold"
                />
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Precio Mostrado (Formato en Colones)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. ₡32.500"
                  value={iconicFormData.price}
                  onChange={(e) =>
                    setIconicFormData({ ...iconicFormData, price: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm font-bold text-secondary"
                />
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  Página / URL al hacer Clic en el Producto
                </label>
                <select
                  value={
                    storeRoutesOptions.some((opt) => opt.value === iconicFormData.url)
                      ? iconicFormData.url
                      : 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      setIconicFormData({ ...iconicFormData, url: e.target.value });
                    }
                  }}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-sm cursor-pointer mb-1"
                >
                  {storeRoutesOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {!storeRoutesOptions.some((opt) => opt.value === iconicFormData.url) && (
                  <input
                    type="text"
                    required
                    placeholder="Ej. /product/1 o https://..."
                    value={iconicFormData.url}
                    onChange={(e) =>
                      setIconicFormData({ ...iconicFormData, url: e.target.value })
                    }
                    className="w-full bg-surface-container-low px-4 py-2 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-mono"
                  />
                )}
              </div>

              <div>
                <label className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-bold">
                  URL de Imagen del Producto
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={iconicFormData.image}
                  onChange={(e) =>
                    setIconicFormData({ ...iconicFormData, image: e.target.value })
                  }
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/50 focus:border-primary outline-none text-xs font-mono mb-2"
                />

                {iconicFormData.image && (
                  <div className="relative h-28 w-24 rounded-lg overflow-hidden border border-outline-variant/40 mx-auto bg-surface-variant">
                    <img
                      src={iconicFormData.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-label-sm uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer font-bold"
                >
                  {editingIconicItem ? 'Guardar Cambios' : 'Agregar al Home'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsIconicModalOpen(false)}
                  className="px-5 border border-outline-variant rounded-xl font-label-sm uppercase tracking-wider hover:bg-surface-variant cursor-pointer text-xs"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Expanded Live Preview Modal */}
      {isExpandedPreviewOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 p-4 md:p-8 flex items-center justify-center">
          <div className="bg-surface-bright rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl border border-outline-variant/30 overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-2xl">
                  open_in_full
                </span>
                <h3 className="font-headline-md text-headline-md">
                  Previsualización Ampliada de la Tienda
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2 bg-surface-bright p-1 rounded-lg border border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded flex items-center gap-1 text-xs font-label-sm cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      desktop_windows
                    </span>
                    Escritorio
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded flex items-center gap-1 text-xs font-label-sm cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-primary text-on-primary font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      smartphone
                    </span>
                    Móvil
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpandedPreviewOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors cursor-pointer rounded-lg hover:bg-surface-variant"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content Canvas */}
            <div className="flex-1 bg-surface-container/40 p-4 md:p-6 overflow-hidden flex items-center justify-center">
              <div
                className={`mx-auto transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-white relative h-full w-full ${
                  previewDevice === 'mobile' ? 'max-w-[380px]' : 'max-w-4xl'
                }`}
              >
                {/* Mockup Browser Header */}
                <div className="bg-surface-container-low h-9 w-full flex items-center px-4 gap-2 border-b border-outline-variant/20 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-error/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-outline/30"></div>
                  </div>
                  <div className="mx-auto bg-surface h-5 rounded-full w-2/3 flex items-center justify-center px-3 border border-outline-variant/10">
                    <span className="text-[10px] text-outline truncate font-mono">
                      karisme-innerwear.com
                    </span>
                  </div>
                </div>

                {/* Mockup Inner Content */}
                <div className="relative overflow-y-auto h-[calc(100%-36px)] flex flex-col scroll-smooth">
                  {/* Navbar */}
                  <div className="bg-surface/95 backdrop-blur-md px-6 py-3 flex items-center justify-between border-b border-outline-variant/20 z-20 shrink-0 sticky top-0">
                    <span className="font-brand-script text-3xl text-on-surface">
                      Karisme
                    </span>
                    <div className="hidden md:flex items-center gap-6 font-label-sm text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                      <span className="hover:text-primary cursor-pointer">Mujer</span>
                      <span className="hover:text-primary cursor-pointer">Hombre</span>
                      <span className="hover:text-primary cursor-pointer">Niños</span>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">search</span>
                      <span className="material-symbols-outlined text-lg">person</span>
                      <div className="relative">
                        <span className="material-symbols-outlined text-lg">
                          shopping_bag
                        </span>
                        <span className="absolute -top-1 -right-1.5 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          2
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Banner */}
                  {currentBannerPreview ? (
                    <div className="bg-surface-container-high/90 border-b border-outline-variant/30 py-2.5 px-4 text-center relative z-10 shrink-0 select-none">
                      <div className="flex items-center justify-between gap-3 max-w-container-max mx-auto">
                        {activeBannersList.length > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveBannerIndex(
                                (prev) =>
                                  (prev - 1 + activeBannersList.length) %
                                  activeBannersList.length
                              )
                            }
                            className="p-1 text-on-surface-variant hover:text-secondary cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                          >
                            <span className="material-symbols-outlined text-lg">
                              chevron_left
                            </span>
                          </button>
                        ) : (
                          <div className="w-6"></div>
                        )}

                        <div className="flex-1 flex items-center justify-center gap-2 truncate animate-fade-in py-0.5">
                          <span className="material-symbols-outlined text-secondary text-base shrink-0">
                            {currentBannerPreview.icon || 'campaign'}
                          </span>
                          <p className="font-label-sm text-xs text-on-surface truncate">
                            <strong className="text-secondary font-bold uppercase tracking-wider mr-1.5">
                              {currentBannerPreview.title}:
                            </strong>
                            <span className="text-on-surface-variant font-medium">
                              {currentBannerPreview.subtitle}
                            </span>
                          </p>
                          <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold hover:underline shrink-0 flex items-center gap-0.5 ml-2">
                            Ver Más{' '}
                            <span className="material-symbols-outlined text-xs">
                              arrow_forward
                            </span>
                          </span>
                        </div>

                        {activeBannersList.length > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveBannerIndex(
                                (prev) => (prev + 1) % activeBannersList.length
                              )
                            }
                            className="p-1 text-on-surface-variant hover:text-secondary cursor-pointer rounded-full hover:bg-secondary/10 shrink-0"
                          >
                            <span className="material-symbols-outlined text-lg">
                              chevron_right
                            </span>
                          </button>
                        ) : (
                          <div className="w-6"></div>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Hero Canvas */}
                  <div
                    className="relative h-[380px] md:h-[460px] shrink-0 bg-cover bg-center flex items-center"
                    style={{ backgroundImage: `url('${hero.bgImage}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent"></div>
                    <div className="relative z-10 px-8 md:px-12 max-w-lg">
                      <span className="font-label-sm text-xs uppercase tracking-[0.3em] text-primary mb-3 block font-bold">
                        Karisme Innerwear
                      </span>
                      <h2 className="font-display-lg text-on-background text-2xl md:text-4xl mb-4 leading-tight drop-shadow-xs">
                        {hero.headline}
                      </h2>
                      <p className="font-body-lg text-on-surface-variant text-xs md:text-sm mb-6 line-clamp-3 leading-relaxed">
                        {hero.subtitle}
                      </p>
                      <button className="bg-on-background text-on-primary px-8 py-3.5 rounded-xl font-label-sm text-xs uppercase tracking-widest hover:bg-primary transition-all font-bold shadow-lg">
                        {hero.cta || 'Comprar Nueva Colección'}
                      </button>
                    </div>
                  </div>

                  {/* Piezas Icónicas */}
                  <div className="bg-surface-container-low py-8 px-6 shrink-0 border-t border-outline-variant/20">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="font-label-sm text-xs uppercase tracking-widest text-primary block font-bold mb-1">
                          {iconicPieces.sectionBadge || 'Los Favoritos'}
                        </span>
                        <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface font-bold">
                          {iconicPieces.sectionTitle || 'Piezas Icónicas'}
                        </h3>
                      </div>
                      <span className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-1 border-b border-outline-variant pb-1">
                        Ver Todo{' '}
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {iconicPieces.items.map((item) => (
                        <div key={item.id} className="group flex flex-col">
                          <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-bright shadow-xs">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-3 right-3 bg-surface-bright/90 backdrop-blur-xs p-2 rounded-full shadow-md">
                              <span className="material-symbols-outlined text-secondary text-sm">
                                add_shopping_cart
                              </span>
                            </div>
                          </div>
                          <div className="text-center">
                            <h4 className="font-bold text-xs md:text-sm text-on-surface truncate">
                              {item.title}
                            </h4>
                            <p className="text-xs text-secondary font-bold mt-0.5">
                              {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cms;
