import React from "react";
import "./PokemonList.css"; // Import CSS file for styling

export default function PokemonList({ pokemon }) {
  return (
    <div className="pokemon-container">
      {pokemon.map((poke, index) => (
        <div key={index} className="pokemon-item">
          <img src={poke.image} alt={poke.name} />
          <div>
            <a href={poke.url}>{poke.name}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
