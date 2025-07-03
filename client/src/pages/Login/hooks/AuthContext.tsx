import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, accessToken?: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          const isValid = await validateSession(storedToken);

          if (isValid) {
            setUser(userData);
          } else {
            clearStorage();
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          clearStorage();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const validateSession = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/profile/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        const userData = {
          id: profileData._id,
          email: profileData.email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          profile_picture: profileData.profile_picture,
          bio: profileData.bio,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Session validation failed:", error);
      return false;
    }
  };

  const clearStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const login = (
    userData: User,
    accessToken?: string,
    refreshToken?: string
  ) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (accessToken) {
      localStorage.setItem("token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    clearStorage();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};