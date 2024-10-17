# Use the official Node.js image as the base
FROM node:18
# Set the working directory to /app
WORKDIR /app

# Copy env variables
COPY ./apps/sda/.env.testnet .

# Copy the package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install the workspace dependencies using yarn first
RUN yarn install

# Copy entire repo into the docker container
COPY . .

# Change to the apps/sda directory
WORKDIR /app/apps/sda

# Install the dependencies specifically for sda
RUN yarn install --network-timeout 900000

# Build the SDA, make sure build doesnt crash 
ENV NODE_OPTIONS=--max_old_space_size=8192

# default
RUN yarn build 
EXPOSE 3000
CMD ["yarn", "run", "start"]