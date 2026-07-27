export const environment = {
  production: true,

  app: {
    name: 'CyberXP HRMS',
    version: '10.1.0',
  },

  api: {
    baseUrl: 'https://api.cyberxp.com/api',
    timeout: 30000,
  },
} as const;