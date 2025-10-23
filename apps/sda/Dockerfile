# Use the official Node.js image as the base
FROM node:18
# Set the working directory to /app
WORKDIR /app

# Copy env variables
COPY ./apps/sda/.env.mainnet .env.local

# Copy the package.json and pnpm files
COPY package*.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install the workspace dependencies using pnpm first
RUN pnpm install

# Copy entire repo into the docker container
COPY . .

# Change to the apps/sda directory
WORKDIR /app/apps/sda

# Install the dependencies specifically for sda
RUN pnpm install --network-timeout 900000

# Build the SDA, make sure build doesnt crash 
ENV NODE_OPTIONS=--max_old_space_size=8192

# default
RUN pnpm build 
EXPOSE 3000
CMD ["pnpm", "run", "start"]
