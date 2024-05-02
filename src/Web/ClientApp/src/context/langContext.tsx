import { createContext, useContext, useState } from "react";
type LangContextProps = {
  lang: string;
  setLang: (lang: string) => void;
};

export const langContext = createContext<LangContextProps | undefined>(
  undefined
);
export const useLangContext = () => {
  const context = useContext(langContext);
  if (context === undefined) {
    throw new Error("useLangContext must be used within a LangProvider");
  }
  return context;
};
export const LangProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState("ar");
  return (
    <langContext.Provider value={{ lang, setLang }}>
      {children}
    </langContext.Provider>
  );
};
