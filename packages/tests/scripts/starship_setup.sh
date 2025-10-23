#!/bin/bash

# Install dependencies
pnpm install

# install starship deps
pnpm starship install

# set kubernetes context to Docker Desktop
kubectl config use-context docker-desktop

# setup starship
pnpm starship setup
