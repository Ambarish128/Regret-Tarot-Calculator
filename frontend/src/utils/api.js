const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export async function apiFetch(endpoint, options = {}) {
  // Simulate network latency for UI testing
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Mock UI responses for testing auth flow without backend
  if (endpoint.includes('/auth/login') || endpoint.includes('/auth/register')) {
    return {
      token: 'mock-ui-jwt-token-xyz123',
      user: {
        id: '1',
        name: 'Initiate Seeker',
        email: 'seeker@orakle.realm',
      },
    };
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred during network request');
  }

  return data;
}