import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextData {
  user: any | null;
  loading: boolean;
  signIn: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(stored => stored && setUser(JSON.parse(stored)))
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (userData: any) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    console.log('AuthProvider: Initiating signOut.');
    setLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      console.log('AuthProvider: User data removed from AsyncStorage.');
      setUser(null);
      console.log('AuthProvider: User state set to null.');
    } catch (e) {
      console.error('AuthProvider: Error during signOut:', e);
    } finally {
      setLoading(false);
      console.log('AuthProvider: SignOut process completed. Loading state set to false.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 