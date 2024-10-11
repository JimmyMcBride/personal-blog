# Step 1: Build the SvelteKit app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app in production mode
RUN npm run build

# Step 2: Create the production image to serve the app
FROM node:18-alpine

# Set the working directory in the final image
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app ./

# Install production dependencies only
RUN npm install

# Expose the port SvelteKit will run on
EXPOSE 4173

# Set the environment to production
ENV NODE_ENV=production

# Command to run the SvelteKit app
CMD ["npm", "run", "preview"]
