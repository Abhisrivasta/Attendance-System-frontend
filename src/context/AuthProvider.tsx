import { useEffect, useState, type PropsWithChildren } from "react";
import { supabase } from "../auth/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const[loading,setLoading] = useState(true)

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
      }
      setLoading(false);
    };
    getSession();

    // Listen for changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
   <AuthContext.Provider value={{user,setUser,loading}}>
        {children}
   </AuthContext.Provider>
  );
};
