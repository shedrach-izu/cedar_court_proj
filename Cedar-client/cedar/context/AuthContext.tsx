"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";


import api from "@/lib/api";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
// }

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  // authUser: User | null;
  // loading: boolean;
  // isAuthenticated: boolean;

  // setAuthUser: (user: User | null) => void;

  authUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;

  setAuthUser: (user: User | null) => void;

  login: (data: {
    email: string;
    password: string;
  }) => Promise<any>;

  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<any>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const restoreAuth = async () => {
        try {
            const res = await api.get("/authentication/me");

            setAuthUser(res.data.user);
        } catch (error) {
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    restoreAuth();
  }, []);

  // =========================
  // REGISTER
  // =========================

  const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post(
      "/authentication/register",
      {
        name,
        email,
        password,
      }
    );

    setAuthUser(res.data.user);

    return res.data;
  } catch (error: any) {
    console.error(
      "Registration error:",
      error.response?.data || error
    );

    throw error;
  }
};

  // =========================
  // LOGIN
  // =========================

  const login = async ({
        email,
        password,
        }: {
        email: string;
        password: string;
        }) => {
        try {
            const res = await api.post(
            "/authentication/login",
            {
                email,
                password,
            }
            );

            setAuthUser(res.data.user);

            return res.data;
        } catch (error: any) {
            console.error(
            "Login error:",
            error.response?.data || error
            );

            throw error;
        }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = async () => {
    try {
      setAuthUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const isAuthenticated = !!authUser;
  const isAdmin = authUser?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        isAuthenticated,
        isAdmin,
        setAuthUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}