import { useState, useEffect } from "react";

const useLocalStorage = (initialValue, keyterm) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyterm);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(keyterm, JSON.stringify(value));
  }, [value, keyterm]);
  return [value, setValue];
};

export default useLocalStorage;
