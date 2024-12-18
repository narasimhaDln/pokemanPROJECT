import { useState } from "react";

export default function usePokemonNavigator(pokemonList) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectPokemon = (index) => {
    setCurrentIndex(index);
  };

  const nextPokemon = () => {
    if (currentIndex < pokemonList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevPokemon = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return {
    currentPokemon: pokemonList[currentIndex] || "", // Handle empty list gracefully
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === pokemonList.length - 1,
    selectPokemon,
    nextPokemon,
    prevPokemon,
  };
}
