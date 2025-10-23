#!/bin/bash

# sanity check
kubectl get nodes
pnpm starship get-pods

# deploy starship
pnpm starship deploy

# wait til STATUS=Running
pnpm starship get-pods

# port forwarding
pnpm starship start-ports

# check pids
pnpm starship port-pids
