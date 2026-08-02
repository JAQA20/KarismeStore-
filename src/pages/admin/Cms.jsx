import React, { useState } from 'react';

const Cms = () => {
  const [headline, setHeadline] = useState('Elegancia en cada capa.');
  const [cta, setCta] = useState('Explorar Colección');
  const [url, setUrl] = useState('/coleccion-otoño');

  return (
    <>
      {/* Header Section */}
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Editor de Inicio</h2>
          <p className="text-on-surface-variant font-body-md max-w-xl">Gestiona el contenido principal de la página de aterrizaje. Los cambios se reflejarán inmediatamente en la previsualización.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-secondary text-secondary rounded-lg font-label-sm text-label-sm uppercase hover:bg-secondary/5 transition-all">Descartar</button>
          <button className="px-8 py-2 bg-on-background text-on-primary rounded-lg font-label-sm text-label-sm uppercase hover:bg-primary transition-all shadow-lg shadow-primary/20">Publicar Cambios</button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter mb-section-gap">
        {/* CMS Controls (Left Column) */}
        <div className="xl:col-span-5 flex flex-col gap-8">
          {/* Hero Section Editor */}
          <section className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">view_quilt</span>
              <h3 className="font-headline-md text-headline-md">Sección Hero</h3>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase text-on-surface-variant/70">Título Principal (Headline)</label>
                <input 
                  className="border-none border-b border-secondary-fixed bg-transparent py-2 focus:outline-none focus:border-primary font-headline-md text-headline-md outline-none" 
                  type="text" 
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase text-on-surface-variant/70">Texto del Botón (CTA)</label>
                <input 
                  className="border-none border-b border-secondary-fixed bg-transparent py-2 focus:outline-none focus:border-primary font-body-md outline-none" 
                  type="text" 
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm uppercase text-on-surface-variant/70">URL de Destino</label>
                <input 
                  className="border-none border-b border-secondary-fixed bg-transparent py-2 focus:outline-none focus:border-primary text-on-surface-variant outline-none" 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="pt-4">
                <label className="font-label-sm text-label-sm uppercase text-on-surface-variant/70 block mb-4">Imagen de Fondo</label>
                <div className="relative h-40 w-full rounded-lg overflow-hidden border-2 border-dashed border-outline-variant flex flex-col items-center justify-center bg-surface-container-low group cursor-pointer hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-outline text-3xl mb-2 group-hover:text-primary transition-colors">upload_file</span>
                  <p className="text-label-sm font-body-md text-on-surface-variant">Click para subir o arrastrar</p>
                  <p className="text-[10px] text-on-surface-variant/50 mt-1 uppercase tracking-tighter">JPG, PNG, WEBP (Min 1920px)</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Promo Banners Section */}
          <section className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-outline-variant/30 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">campaign</span>
                <h3 className="font-headline-md text-headline-md">Banners Promocionales</h3>
              </div>
              <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
            <div className="space-y-4">
              {/* Banner Item 1 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div className="w-16 h-16 rounded bg-secondary-fixed-dim flex-shrink-0 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdJbHOp75pFUHY7fVFwwGF0Ob1duwguXF1soH7YPzidYjS3CmjVLbK8GVdEmH6ZgBhX5O3qHeuqcCPUjmFE_ghhJpnL_Ett3k4o8om4lZ2a6NLlnukdr9Etg4Tkp_KhFVOarC0T2H0SJHO_PVZRTmx1gB8DihJKsBADUK39944JVeMiABv871r0Ncxjt0WkAkHo4XVM0LrTj87fh6VcqcEDFG3p-CCynmmdM88mWCkr9otWmv0rMS2" alt="Promo 1" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-body-md">Envío Gratis Sostenible</p>
                  <p className="text-label-sm text-on-surface-variant">Activo • Todo el sitio</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                </div>
              </div>
              
              {/* Banner Item 2 */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <div className="w-16 h-16 rounded bg-primary-fixed-dim flex-shrink-0 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1D7kwPYAaRUwZnQj-kQzPghPRhn2KqgKKHdPDzTBAXLdEEsiLdYjivIExWu07l79x9H_miKd_6gNB0gatV0bzqZUu40Ne82VLHweGkff8N0D5Nmsp_EAzpFRTM3Ort1yOUndN9DkaIiPLNg6B7V21zrG-Ka6dzQKugiFLESSMRVEfWOdBuMWO9ufQaTcnRBtHJdTKngeKb4FigbLDRgYoueh_0HAqgkyVEtvjJ9L4WzUH0vkrvqje" alt="Promo 2" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-body-md">Nueva Colección Intimates</p>
                  <p className="text-label-sm text-on-surface-variant">Pausado • Home Only</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* Live Preview (Right Column) */}
        <div className="xl:col-span-7">
          <div className="sticky top-12 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant/50">Previsualización en tiempo real</h3>
              <div className="flex gap-2">
                <span className="material-symbols-outlined text-primary" title="Desktop">desktop_windows</span>
                <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors" title="Mobile">smartphone</span>
              </div>
            </div>
            
            {/* Canvas Mockup */}
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 bg-white relative aspect-video" style={{perspective: '1000px'}}>
              {/* Mockup Browser Header */}
              <div className="bg-surface-container-low h-10 w-full flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-outline/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-outline/30"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-outline/30"></div>
                </div>
                <div className="mx-auto bg-surface h-6 rounded-full w-1/2 flex items-center px-3 border border-outline-variant/10">
                  <span className="text-[10px] text-outline truncate">karisme-innerwear.com/home</span>
                </div>
              </div>
              
              {/* Mockup Inner Content */}
              <div className="relative overflow-hidden h-[calc(100%-40px)]">
                {/* Simulated Hero */}
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAc5bio7LcNAtOJZT02jY3TZMUwIG5m-mShORJCwcgusAfJ4Td9FPwAUfCTWYBmLkfGkWdT_AWy5Tl6l5rySZyJKAv9eLmldKTsgwGl4WxCSblk9y5zQf6rTd8FncY4qu-gPav5uP5vkxHXc4wtTS_J0wiTj9IZsysAFC6FYg86-DRx9-ewS-loZGPlIIVYHv5UoSE5sQiJR2G6_SLdI4Dr32E4MEUxon03PiCLfTFU_J6Ni0v_qMcl')"}}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  {/* Simulated Top Nav */}
                  <div className="relative z-10 flex justify-between items-center px-8 py-6">
                    <span className="font-headline-md text-white text-lg tracking-tighter">KARISME</span>
                    <div className="flex gap-4 text-white/90 text-[10px] font-bold uppercase tracking-widest">
                      <span>Mujer</span>
                      <span>Hombre</span>
                      <span>Niños</span>
                    </div>
                    <div className="flex gap-3 text-white">
                      <span className="material-symbols-outlined text-sm">search</span>
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    </div>
                  </div>
                  
                  {/* Hero Text */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12 -mt-12">
                    <h2 className="font-display-lg text-white text-4xl mb-6 max-w-lg drop-shadow-lg">{headline}</h2>
                    <button className="px-8 py-3 bg-white text-on-surface font-label-sm text-[12px] uppercase tracking-widest transition-transform hover:scale-105">{cta}</button>
                  </div>
                </div>
                
                {/* Floating Banner Preview Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 bg-white/80 backdrop-blur-md p-4 rounded-full border border-white/50 shadow-xl flex items-center justify-between px-8 z-20">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                    Envío Gratis Sostenible en tu primera compra
                  </p>
                  <span className="material-symbols-outlined text-primary text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>
            
            {/* Preview Stats */}
            <div className="grid grid-cols-3 gap-gutter">
              <div className="bg-surface-container p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">CTR Proyectado</p>
                <p className="font-headline-md text-primary">4.2%</p>
              </div>
              <div className="bg-surface-container p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Vistas Home</p>
                <p className="font-headline-md text-primary">12.5k</p>
              </div>
              <div className="bg-surface-container p-4 rounded-xl text-center">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Carga (LCP)</p>
                <p className="font-headline-md text-secondary">0.8s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cms;
