import { useState } from "react";

const useCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return { characters, isLoading, error };
};

export { useCharacter };
