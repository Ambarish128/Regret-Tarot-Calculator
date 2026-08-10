'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '@/utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Read from localStorage asynchronously on mount without synchronous setState calls
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Batch state updates inside queueMicrotask to avoid synchronous render warnings
        queueMicrotask(() => {
          setToken(savedToken);
          setUser(parsedUser);
          setLoading(false);
        });
        return;
      } catch (err) {
        console.error('Failed to parse saved user:', err);
      }
    }

    queueMicrotask(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const authToken = data.token;
    const userData = data.user || { email };

    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(authToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const authToken = data.token;
    const userData = data.user || { name, email };

    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(authToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);