
# Use a Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app/api

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --prod

# Copy the rest of the application code
COPY . .

# Build the TypeScript application
RUN pnpm run build # Assuming a build script will be added later

# Expose the port the Fastify app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"] # Assuming build output goes to dist/index.js
