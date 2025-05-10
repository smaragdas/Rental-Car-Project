<<<<<<< HEAD
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
=======
# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app

# Inject build-time environment variables
ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUBLISHABLE_KEY

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

# Copy package files AND .npmrc before installing
COPY package*.json .npmrc ./
RUN npm install           # now uses legacy-peer-deps per .npmrc

# Copy the rest of your source & build
COPY . .
RUN npm run build

# Stage 2: Serve the built app on port 80 using 'serve'
FROM node:20-alpine
WORKDIR /app

# Copy build artifacts from builder
COPY --from=builder /app/dist ./dist 

# Install lightweight static server
RUN npm install -g serve

# Expose port 80 and start serving
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
>>>>>>> f75c3fea7c71f3b4390d4e28c1757205d2af77cd
