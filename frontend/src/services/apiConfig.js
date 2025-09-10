// This variable reads the base URL from your .env files
const API_BASE_URL = "http://localhost:8080";

// This is the URL for your RESTful API calls (e.g., http://localhost:8080/api)
export const REST_API_URL = `${API_BASE_URL}/api`;

// This is the URL for your WebSocket connections (e.g., http://localhost:8080/ws)
export const WEBSOCKET_URL = `${API_BASE_URL}/ws`;

export default API_BASE_URL;