import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'operator' | 'viewer';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// In-memory storage for web platform
const memoryStorage = new Map<string, string>();

// SecureStore wrapper with web fallback
async function setSecureItem(key: string, value: string) {
  if (Platform.OS === 'web') {
    memoryStorage.set(key, value);
    return;
  }
  return await SecureStore.setItemAsync(key, value);
}

async function getSecureItem(key: string) {
  if (Platform.OS === 'web') {
    return memoryStorage.get(key);
  }
  return await SecureStore.getItemAsync(key);
}

async function deleteSecureItem(key: string) {
  if (Platform.OS === 'web') {
    memoryStorage.delete(key);
    return;
  }
  return await SecureStore.deleteItemAsync(key);
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load user from storage
    const loadUser = async () => {
      try {
        const userString = await getSecureItem('user');
        if (userString) {
          setUser(JSON.parse(userString));
        }
      } catch (error) {
        console.error('Error loading user', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      // This would be where you make an API call to authenticate
      // For demo, we'll simulate a successful auth with a mock user
      
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'admin',
      };
      
      // Store user data in secure storage
      await setSecureItem('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const signOut = async () => {
    try {
      // Clear user data from secure storage
      await deleteSecureItem('user');
      
      // Update state
      setUser(null);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider