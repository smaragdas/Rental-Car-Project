# Stage 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app

# Inject build-time environment variables
ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUBLISHABLE_KEY

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY

# Install dependencies
COPY package*.json .npmrc ./
RUN npm install

# Copy all source files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ngix.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]