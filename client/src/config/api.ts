// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://edgevantage-api.vercel.app/api'  // Update this with your actual API URL
    : '/api'
  );

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    P2_CLIENTS: `${API_BASE_URL}/p2-clients`,
    WEBSITES: `${API_BASE_URL}/websites`,
    ACCOUNTS: `${API_BASE_URL}/accounts`,
    VERIFICATION: `${API_BASE_URL}/verification`,
    DASHBOARD: `${API_BASE_URL}/dashboard`,
    AUTOMATION: `${API_BASE_URL}/automation`,
  }
};

export default API_CONFIG;