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

    return () => {
      setPokemonDetails(null);
    };
  }, [name]);

  const currentIndex = pokemon.findIndex((p) => p.name === name);
  const nextPokemon = pokemon[currentIndex + 1];
  const prevPokemon = pokemon[currentIndex - 1];

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
    <div className="pokedex-details">
      {pokemonDetails ? (
        <div className="pokemon-card">
          <h2 className="pokename">{pokemonDetails.name}</h2>
          <img
            src={pokemonDetails.sprites.other["official-artwork"].front_default}
            alt={pokemonDetails.name}
            className="pokemon-image"
          />
          <div className="pokemon-info">
            {/* Left side for Type, Height, Weight, and Abilities */}
            <div className="pokemon-info-left">
              <h3 className="stats-title">Type:</h3>
              <p>
                {pokemonDetails.types.map((type) => type.type.name).join(", ")}
              </p>
              <h3 className="stats-title">Height:</h3>
              <p>{pokemonDetails.height}</p>
              <h3 className="stats-title">Weight:</h3>
              <p>{pokemonDetails.weight}</p>
              <h3 className="stats-title">Abilities:</h3>
              <ul>
                {pokemonDetails.abilities.map((ability, index) => (
                  <li key={index} className="abilities-stats-bullet">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side for Base Stats */}
            <div className="pokemon-info-right">
              <h3 className="stats-title">Base Stats:</h3>
              <ul>
                {pokemonDetails.stats.map((stat, index) => (
                  <li key={index} className="base-stats-bullet">
                    <strong>{stat.stat.name}:</strong>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${stat.base_stat}%` }}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pokemon-navigation">
            {prevPokemon && (
              <Link to={`/pokemon/${prevPokemon.name}`}>
                <button
                  className="pokemon-font-button"
                  onClick={handleClickPrev}
                >
                  Previous
                </button>
              </Link>
            )}
            {nextPokemon && (
              <Link to={`/pokemon/${nextPokemon.name}`}>
                <button
                  className="pokemon-font-button"
                  onClick={handleClickNext}
                >
                  Next
                </button>
              </Link>
            )}
          </div>
          <div>
            <Link to="/">
              <button className="pokemon-font-button">
                Return to All Pokemon
              </button>
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
