
"use client"; 
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allTools } from "@/assets/data.js"; 

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const router = useRouter();
  
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTools = () => {
    setTools(allTools);
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const value = { allTools, tools, setTools, router, searchQuery, setSearchQuery };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
