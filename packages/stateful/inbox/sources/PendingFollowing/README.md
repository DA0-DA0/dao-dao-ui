# PendingFollowing

This is the inbox source for showing DAOs the wallet is pending following due to
being added to the DAO. It uses a [Cloudflare
Worker](https://github.com/DA0-DA0/following-daos-cf-worker) for its backend.

## Layout

| Location                       | Summary                               |
| ------------------------------ | ------------------------------------- |
| [index.ts](./index.ts)         | Source definition.                    |
| [Renderer.tsx](./Renderer.tsx) | Component that shows up in the inbox. |
