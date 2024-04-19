// PokemonList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function PokemonList({ pokemon }) {
  // Add a null check before mapping over the pokemon array
  if (!pokemon || !pokemon.length) {
    return <div>No Pokemon data available</div>;
  }

  return (
    <div className="pokemon-container">
      {pokemon.map((poke, index) => (
        <div className="pokemon-item" key={index}>
          <div>
            <Link to={`/pokemon/${poke.name}`}>
              <img src={poke.image} alt={poke.name} />
            </Link>
          </div>
          <div className="pokemon-name">
            <Link to={`/pokemon/${poke.name}`}>
              <button className="pokemon-font-button">
                {formatPokemonName(poke.name)}
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to format Pokemon names
function formatPokemonName(name) {
  // Capitalize the first letter of each word
  return name.charAt(0).toUpperCase() + name.slice(1);
}
