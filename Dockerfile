# Use an official Node runtime as a parent image
FROM node:20-alpine as build
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# Install dependencies
RUN npm install
# Run browser list update
RUN npx update-browserslist-db@latest
# Bundle app source inside Docker image
COPY . .
# Build the app
RUN npm run build

# Use a second stage to reduce image size
FROM nginx:latest
EXPOSE 5521
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]