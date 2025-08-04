'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // ✅ Sửa import
import { useRouter } from 'next/navigation';
import { Role } from '@/constants/auth.constant';
import { getToken } from '@/utils/getToken';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  exp: number;
  iat: number;
}

interface AuthContextProps {
  user: JwtPayload | null;
  role: Role | null;
  authLogin: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    const token = await getToken();
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
  }

  const authLogin = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    try {
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);

      const decoded = jwtDecode<JwtPayload>(accessToken);
      setUser(decoded);
      setRole(decoded.role);

      if (decoded.role === Role.ADMIN) {
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
    setRole(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, authLogin, logout }}>
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
