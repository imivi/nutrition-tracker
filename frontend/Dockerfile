FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json .
COPY tsconfig*.json .

# Install dependencies
# RUN npm i -g pnpm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application on port 4173
EXPOSE 3000

# Start the application
CMD ["npm", "start"]



# FROM busybox:1.30 AS runner

# WORKDIR /app

# COPY --from=builder /app/dist .

# EXPOSE 3000

# CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]