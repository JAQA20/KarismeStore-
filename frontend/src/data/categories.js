// Servicio de Categorías Dinámicas desde la Base de Datos MySQL (vía API REST)
let cachedCategories = [];
let isFetchingCats = false;

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchDbCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        cachedCategories = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('⚠️ No se pudieron cargar categorías desde la DB API:', err.message);
  }
  return cachedCategories;
};

// Obtener categorías estructuradas por género e.g. "Mujer / Lencería de Seda"
export const getFormattedDbCategories = (categories = cachedCategories) => {
  if (!categories || categories.length === 0) {
    return [
      { gender: 'Mujer', name: 'Lencería de Seda', full: 'Mujer / Lencería de Seda' },
      { gender: 'Mujer', name: 'Ropa de Estar', full: 'Mujer / Ropa de Estar' },
      { gender: 'Mujer', name: 'Básicos de Algodón', full: 'Mujer / Básicos de Algodón' },
      { gender: 'Mujer', name: 'Ediciones Limitadas', full: 'Mujer / Ediciones Limitadas' },
      { gender: 'Hombre', name: 'Pijamas de Seda', full: 'Hombre / Pijamas de Seda' },
      { gender: 'Hombre', name: 'Ropa de Estar', full: 'Hombre / Ropa de Estar' },
      { gender: 'Hombre', name: 'Básicos', full: 'Hombre / Básicos' },
      { gender: 'Hombre', name: 'Ediciones Limitadas', full: 'Hombre / Ediciones Limitadas' },
      { gender: 'Niños', name: 'Pijamas', full: 'Niños / Pijamas' },
      { gender: 'Niños', name: 'Conjuntos', full: 'Niños / Conjuntos' },
      { gender: 'Niños', name: 'Ropa de Estar', full: 'Niños / Ropa de Estar' },
      { gender: 'Niños', name: 'Básicos', full: 'Niños / Básicos' },
      { gender: 'Accesorios', name: 'Cuidado', full: 'Accesorios / Cuidado' },
    ];
  }

  return categories.map((cat) => ({
    id: cat.id,
    gender: cat.gender || 'Mujer',
    name: cat.name,
    full: `${cat.gender || 'Mujer'} / ${cat.name}`,
  }));
};
