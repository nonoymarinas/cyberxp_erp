export const environment = {
    production: false,

  app: {
    name: 'CyberXP HRMS',
    version: '10.1.0',
  },

  api: {
    baseUrl: 'https://api-hrms-employee-dev.azurewebsites.net/api/v1',
    apiKey: 'YOUR_API_KEY_HERE',
  },
} as const;