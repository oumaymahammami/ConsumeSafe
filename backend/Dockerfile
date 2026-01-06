FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (Linux binaries for sqlite3)
RUN npm ci --omit=dev

# Copy only source code (not node_modules thanks to .dockerignore)
COPY src ./src
COPY consumesafe_large_seed.json ./

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 5050

# Start server
CMD ["node", "src/server.js"]
