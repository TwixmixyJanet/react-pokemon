import React from "react";
import "./styles.css";

export default function PokemonList({ pokemon }) {
  // Add a null check before mapping over the pokemon array
  if (!pokemon || !pokemon.length) {
    return <div>No Pokemon data available</div>;
  }

  return (
    <div className="pokemon-container">
      {" "}
      {/* Apply the container class */}
      {pokemon.map((poke, index) => (
        <div className="pokemon-item" key={index}>
          {" "}
          {/* Apply the item class */}
          <div>
            <img src={poke.image} alt={poke.name} />
          </div>
          <div>
            <a href={`/pokemon/${poke.name}`}>{poke.name}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
