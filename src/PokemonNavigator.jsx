import { useEffect, useState } from "react";
import usePokemonNavigator from "./usePokemonNavigator";
import axios from "axios";

const PokemonNavigator = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure the API URL ends with ".json" for Firebase Realtime Database
        const response = await axios.get(
          "https://react-projrct-cfffa-default-rtdb.firebaseio.com/users.json"
        );

        const data = response.data;

        // Check if data is an array
        if (Array.isArray(data)) {
          // Map the data to include both names and image URLs
          const pokemonData = data.map((pokemon) => ({
            name: pokemon.name,
            image: pokemon.image, // Assuming 'image' key contains the URL
          }));
          setPokemonList(pokemonData);
        } else {
          console.error("Invalid API data format. Expected an array.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use the custom hook
  const {
    currentPokemon,
    currentIndex,
    isFirst,
    isLast,
    selectPokemon,
    nextPokemon,
    prevPokemon,
  } = usePokemonNavigator(pokemonList);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Get the current Pokémon's data (name and image)
  const currentPokemonData = pokemonList[currentIndex];
  const currentPokemonName = currentPokemonData ? currentPokemonData.name : "";
  const currentPokemonImage = currentPokemonData ? currentPokemonData.image : "";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Pokemon Navigator</h1>

      {/* Dropdown */}
      <select
        value={currentIndex}
        onChange={(e) => selectPokemon(Number(e.target.value))}
      >
        {pokemonList.map((pokemon, index) => (
          <option key={index} value={index}>
            {pokemon.name}
          </option>
        ))}
      </select>

      <div style={{ margin: "20px 0" }}>
        {/* Previous Button */}
        <button onClick={prevPokemon} disabled={isFirst}>
          Prev
        </button>

        {/* Current Pokemon */}
        <div style={{ margin: "20px 0" }}>
          <span style={{ margin: "0 15px", fontSize: "1.2em" }}>
            {currentPokemonName || "No Pokemon Selected"}
          </span>
        </div>

        {/* Display the current Pokémon's image */}
        {currentPokemonImage && (
          <div>
            <img
              src={currentPokemonImage}
              alt={currentPokemonName}
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}

        {/* Next Button */}
        <button onClick={nextPokemon} disabled={isLast}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonNavigator;
