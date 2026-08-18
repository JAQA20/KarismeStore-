// Servicio de Datos de Productos Conectado a la Base de Datos MySQL (vía API REST)
let cachedProducts = [];
let isFetching = false;

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const fetchStoreProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        cachedProducts = data;
        return data;
      }
    }
  } catch (err) {
    console.warn('⚠️ No se pudo conectar al Backend MySQL API:', err.message);
  }
  return cachedProducts;
};

// Función sincrónica consumida por los componentes de React para el renderizado del catálogo
export const getStoreProducts = () => {
  if (!isFetching) {
    isFetching = true;
    fetchStoreProducts().then((data) => {
      isFetching = false;
      if (data) {
        window.dispatchEvent(new CustomEvent('inventoryUpdated'));
      }
    });
  }
  return cachedProducts;
};

export const products = getStoreProducts();
