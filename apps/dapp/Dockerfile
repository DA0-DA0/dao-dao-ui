# Use the official Node.js image as the base
FROM node:18
# Set the working directory to /app
WORKDIR /app

# Copy env variables
COPY ./apps/dapp/.env.testnet .

# Copy the package.json and yarn.lock files
COPY package*.json yarn.lock ./

# Install the workspace dependencies using yarn first
RUN yarn install

# Copy entire repo into the docker container
COPY . .

# Change to the apps/dapp directory
WORKDIR /app/apps/dapp

# Install the dependencies specifically for dapp
RUN yarn install --network-timeout 900000

# Build the DAPP, make sure build doesnt crash 
ENV NODE_OPTIONS=--max_old_space_size=8192

# default
RUN yarn build 
EXPOSE 3000
CMD ["yarn", "run", "start"]