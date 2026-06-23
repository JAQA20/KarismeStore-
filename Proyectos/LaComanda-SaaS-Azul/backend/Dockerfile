FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Generate Prisma client (will be useful later)
# RUN npx prisma generate

EXPOSE 3000

# Start development server using nodemon
CMD ["npm", "run", "dev"]
