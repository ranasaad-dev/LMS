import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem("token", data.token);

    const profile = await authService.getProfile();
    setUser(profile); 
    return profile;
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
  };

  const updateProfile = async (id, name, password) => {
    await authService.updateProfile(id, name, password);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
 
  };
  
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{user, login, updateProfile, register, logout, loading, setUser,}} >
      {children}
    </AuthContext.Provider>
  );
};