# Contenedor Docker para Frontend React (Vite)
FROM node:20-alpine

WORKDIR /app

# Copiar manifiestos e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar código fuente
COPY . .

EXPOSE 5173

# Arrancar servidor de desarrollo Vite expuesto en red Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
