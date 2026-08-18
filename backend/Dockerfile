# Contenedor Docker para Backend Node.js / Express (TypeScript)
FROM node:20-alpine

WORKDIR /app

# Copiar manifiestos e instalar dependencias
COPY package.json tsconfig.json ./
RUN npm install

# Copiar código fuente del servidor (src/)
COPY . .

# Compilar TypeScript a JavaScript en dist/
RUN npm run build

EXPOSE 5001

CMD ["npm", "start"]
