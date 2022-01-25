import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
  }, [key, value]);

  return [value, setValue];
};
