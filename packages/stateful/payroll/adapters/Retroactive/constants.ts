export const API_BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8787'
    : 'https://retroactive-compensation-cf-worker.dao-dao.workers.dev'
export const SIGNATURE_TYPE = 'Retroactive Compensation'
