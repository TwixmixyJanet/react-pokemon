// PokemonList.jsx
import React from "react";
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
            <a href={`/pokemon/${poke.name}`}>
              <img src={poke.image} alt={poke.name} />
            </a>
          </div>
          <div className="pokemon-name">
            <a href={`/pokemon/${poke.name}`}>{formatPokemonName(poke.name)}</a>
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
