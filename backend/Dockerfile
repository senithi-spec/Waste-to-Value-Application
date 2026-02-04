# Waste-to-Value Platform Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install openssl compatibility library required by Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
