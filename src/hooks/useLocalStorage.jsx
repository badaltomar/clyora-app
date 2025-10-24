import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    // console.log(JSON.parse(saved));
    
    if (!saved || saved === "undefined" || saved === "null") {
      return initialValue;
    }

    try {
      return JSON.parse(saved);
    } catch (error) {
      localStorage.removeItem(key);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
