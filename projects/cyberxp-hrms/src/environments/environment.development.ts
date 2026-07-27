export const environment = {
  production: false,

  app: {
    name: 'CyberXP HRMS',
    version: '10.1.0',
  },

  api: {
    baseUrl: 'https://localhost:7001/api',
    timeout: 30000,
  },
} as const;