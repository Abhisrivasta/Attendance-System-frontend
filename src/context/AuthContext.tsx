import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading : boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;
 