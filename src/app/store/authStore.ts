import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios, { AxiosError } from "axios";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  accessToken: string | null;
}

interface ErrorResponse {
  message: string;
}

const api = axios.create({
  baseURL: "http://localhost:3150/api",
  withCredentials: true,
});

const useAuthStore = create(
  persist<
    AuthState & {
      registerUser: (fullName: string, email: string, password: string) => Promise<void>;
      loginUser: (email: string, password: string) => Promise<void>;
      refreshToken: () => Promise<void>;
      getMe: () => Promise<void>;
      logout: () => void;
      resetState: () => void;
    }
  >(
    (set, get) => ({
      user: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
      accessToken: null,

      
      registerUser: async (fullName, email, password) => {
        set({ isLoading: true, message: "" });
        try {
          const { data } = await api.post<{ content: { user: User; token: string }; message: string }>(
            "/register",
            { fullName, email, password }
          );

          set({
            user: data.content.user,
            accessToken: data.content.token,
            isSuccess: true,
            isError: false,
            message: data.message,
          });
          api.defaults.headers.common["Authorization"] = `Bearer ${data.content.token}`;
           
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          set({
            message: err.response?.data?.message || "Uknow Error",
            isError: true,
            isSuccess: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      // Login User
      loginUser: async (email, password) => {
        set({ isLoading: true, message: "" });
        try {
          const { data } = await api.post<{ content: { user: User; token: string }; message: string }>(
            "/login",
            { email, password }
          );

          set({
            user: data.content.user,
            accessToken: data.content.token,
            isSuccess: true,
            isError: false,
            message: data.message,
          });
          api.defaults.headers.common["Authorization"] = `Bearer ${data.content.token}`;
          
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          set({
            message: err.response?.data?.message || "Uknow Error",
            isError: true,
            isSuccess: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

 
      refreshToken: async () => {
        try {
          const { data } = await api.get<{ content: { token: string } }>("/refresh");
          set({ accessToken: data.content.token });
          api.defaults.headers.common["Authorization"] = `Bearer ${data.content.token}`;
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          set({ message: err.response?.data?.message || "Uknow Error", isError: true });
        }
      },

   
      getMe: async () => {
        try {
          const accessToken = get().accessToken;
          if (!accessToken) throw new Error("Token tidak ditemukan");

          const { data } = await api.get<{ content: User }>("/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          set({ user: data.content, isSuccess: true, isError: false, message: "" });
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          set({
            message: err.response?.data?.message || "Uknow Error",
            isError: true,
            isSuccess: false,
          });
        }
      },

      
      logout: () => {
    
        localStorage.removeItem("auth-storage");
        sessionStorage.clear();
        delete api.defaults.headers.common["Authorization"];
    
        set({
          user: null,
          accessToken: null,
          isSuccess: false,
          isError: false,
          message: "Logout successful!",
        });
    },
    
         

      resetState: () =>
        set({
          user: null,
          accessToken: null,
          isError: false,
          isSuccess: false,
          isLoading: false,
          message: "",
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
