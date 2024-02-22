import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

function PokemonDetails({
  pokemon,
  currentPokemonIndex,
  setCurrentPokemonIndex,
}) {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemonDetails();

    // Cleanup function
    return () => {
      setPokemonDetails(null); // Clear state on unmount
    };
  }, [name]);

  // Find index of current pokemon in the pokemon array
  const currentIndex = pokemon.findIndex((p) => p.name === name);

  // Get the next and previous pokemon names
  const nextPokemon = pokemon[currentIndex + 1];
  const prevPokemon = pokemon[currentIndex - 1];

  // Handle clicking next/previous buttons
  const handleClickNext = () => {
    if (nextPokemon) {
      setCurrentPokemonIndex(currentIndex + 1);
    }
  };

  const handleClickPrev = () => {
    if (prevPokemon) {
      setCurrentPokemonIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      {pokemonDetails ? (
        <div>
          <h2 className="pokename">{pokemonDetails.name}</h2>
          <img
            src={pokemonDetails.sprites.other["official-artwork"].front_default}
            alt={pokemonDetails.name}
          />
          <p>Type: {pokemonDetails.types[0].type.name}</p>
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          <h3>Abilities</h3>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>

          <h3>Base Stats</h3>
          <ul>
            {pokemonDetails.stats.map((stat, index) => (
              <li key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <div>
            {prevPokemon && (
              <Link to={`/pokemon/${prevPokemon.name}`}>
                <button onClick={handleClickPrev}>Previous</button>
              </Link>
            )}
            {nextPokemon && (
              <Link to={`/pokemon/${nextPokemon.name}`}>
                <button onClick={handleClickNext}>Next</button>
              </Link>
            )}
          </div>
          <div>
            <Link to="/">
              <button>Return to All Pokemon</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading Pokemon details...</p>
      )}
    </div>
  );
}

export default PokemonDetails;
