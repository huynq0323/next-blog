'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // ✅ Sửa import
import { useRouter } from 'next/navigation';

interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin' | 'user';
  exp: number;
  iat: number;
}

interface AuthContextProps {
  user: JwtPayload | null;
  role: 'admin' | 'user' | '';
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [role, setRole] = useState<'admin' | 'user' | ''>('');
  const router = useRouter();

  // 👉 Khởi tạo từ cookies khi F5
  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser(decoded);
        setRole(decoded.role);
      } catch (err) {
        console.error('Invalid token:', err);
        logout(); // auto logout nếu token lỗi
      }
    }
  }, []);

  // ✅ Hàm login
  const login = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    try {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);

      const decoded = jwtDecode<JwtPayload>(accessToken);
      setUser(decoded);
      setRole(decoded.role);

      // 👉 Điều hướng theo role
      if (decoded.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/blogs');
      }
    } catch (error) {
      console.error('Login decode error:', error);
    }
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    setRole('');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
