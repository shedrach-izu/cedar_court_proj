// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useRef
// } from "react";


// import api from "@/lib/api";

// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// // }

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: "user" | "admin";
// }

// interface AuthContextType {
//   // authUser: User | null;
//   // loading: boolean;
//   // isAuthenticated: boolean;

//   // setAuthUser: (user: User | null) => void;

//   authUser: User | null;
//   loading: boolean;
//   isAuthenticated: boolean;
//   isAdmin: boolean;

//   setAuthUser: (user: User | null) => void;

//   login: (data: {
//     email: string;
//     password: string;
//   }) => Promise<any>;

//   register: (data: {
//     name: string;
//     email: string;
//     password: string;
//   }) => Promise<any>;

//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(
//   undefined
// );

// export function AuthProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [authUser, setAuthUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const authVersion = useRef(0);

//   useEffect(() => {
//     const versionAtStart = authVersion.current;

//     const restoreAuth = async () => {
//       try {
//         const res = await api.get("/authentication/me");

//         if (authVersion.current === versionAtStart) {
//           setAuthUser(res.data.user);
//         }
//       } catch {
//         if (authVersion.current === versionAtStart) {
//           setAuthUser(null);
//         }
//       } finally {
//         if (authVersion.current === versionAtStart) {
//           setLoading(false);
//         }
//       }
//     };

//     restoreAuth();
//   }, []);

//   // useEffect(() => {
//   //   const restoreAuth = async () => {
//   //       try {
//   //           const res = await api.get("/authentication/me");

//   //           setAuthUser(res.data.user);
//   //       } catch (error) {
//   //           setAuthUser(null);
//   //       } finally {
//   //           setLoading(false);
//   //       }
//   //   };

//   //   restoreAuth();
//   // }, []);

//   // =========================
//   // REGISTER
//   // =========================

//   const register = async ({
//   name,
//   email,
//   password,
// }: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   ++authVersion.current;
//   try {
//     const res = await api.post(
//       "/authentication/register",
//       {
//         name,
//         email,
//         password,
//       }
//     );

//     setAuthUser(res.data.user);

//     return res.data;
//   } catch (error: any) {
//     console.error(
//       "Registration error:",
//       error.response?.data || error
//     );

//     throw error;
//   }
// };

//   // =========================
//   // LOGIN
//   // =========================

//   const login = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   // Prevent an older session check from overwriting this login.
//   const requestVersion = ++authVersion.current;

//   try {
//     const res = await api.post("/authentication/login", {
//       email,
//       password,
//     });

//     setAuthUser(res.data.user);

//     return res.data;
//   } catch (error: any) {
//     console.error(
//       "Login error:",
//       error.response?.data || error
//     );

//     throw error;
//   } finally {
//     // The login attempt has superseded the previous session check.
//     if (authVersion.current === requestVersion) {
//       setLoading(false);
//     }
//   }
// };

//   // const login = async ({
//   //       email,
//   //       password,
//   //       }: {
//   //       email: string;
//   //       password: string;
//   //       }) => {
//   //       try {
//   //           const res = await api.post(
//   //           "/authentication/login",
//   //           {
//   //               email,
//   //               password,
//   //           }
//   //           );

//   //           setAuthUser(res.data.user);

//   //           return res.data;
//   //       } catch (error: any) {
//   //           console.error(
//   //           "Login error:",
//   //           error.response?.data || error
//   //           );

//   //           throw error;
//   //       }
//   // };

//   // =========================
//   // LOGOUT
//   // =========================

//   const logout = async () => {
//     try {
//       await api.post("/authentication/logout");
//     } finally {
//       // Clear the frontend session even if the token has expired.
//       setAuthUser(null);
//     }
//   };

//   // const logout = async () => {
//   //   try {
//   //     setAuthUser(null);
//   //   } catch (error) {
//   //     console.error("Logout error:", error);
//   //     throw error;
//   //   }
//   // };

//   const isAuthenticated = !!authUser;
//   const isAdmin = authUser?.role === "admin";

//   return (
//     <AuthContext.Provider
//       value={{
//         authUser,
//         loading,
//         isAuthenticated,
//         isAdmin,
//         setAuthUser,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// }











"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
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

  // Prevent an old /me request from overwriting a newer login.
  const authVersion = useRef(0);

  useEffect(() => {
    const version = authVersion.current;
    let mounted = true;

    const restoreSession = async () => {
      try {
        const response = await api.get("/authentication/me");

        if (
          !mounted ||
          authVersion.current !== version
        ) {
          return;
        }

        setAuthUser(response.data?.user ?? null);
      } catch {
        if (
          !mounted ||
          authVersion.current !== version
        ) {
          return;
        }

        setAuthUser(null);
      } finally {
        if (
          mounted &&
          authVersion.current === version
        ) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const version = ++authVersion.current;

    setLoading(true);

    try {
      const response = await api.post(
        "/authentication/login",
        {
          email,
          password,
        }
      );

      const user = response.data?.user as User | undefined;

      if (!user) {
        throw new Error(
          "Login succeeded without returning user information."
        );
      }

      if (authVersion.current === version) {
        setAuthUser(user);
      }

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      if (authVersion.current === version) {
        setLoading(false);
      }
    }
  };

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const version = ++authVersion.current;

    setLoading(true);

    try {
      const response = await api.post(
        "/authentication/register",
        {
          name,
          email,
          password,
        }
      );

      if (authVersion.current === version) {
        setAuthUser(response.data?.user ?? null);
      }

      return response.data;
    } finally {
      if (authVersion.current === version) {
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    // Invalidate any session restoration currently in progress.
    ++authVersion.current;

    setAuthUser(null);
    setLoading(false);

    try {
      // Keep this request only if your backend implements this route.
      await api.post("/authentication/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
      throw error;
    }
  };

  const isAuthenticated = Boolean(authUser);
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
