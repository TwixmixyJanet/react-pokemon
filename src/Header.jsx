// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Header() {
  return (
    <header className="pokemon-header">
      <img
        src="https://pokedex.gabrielrapucci.com.br/_next/image?url=%2Fimages%2Fpokedex.png&w=384&q=75"
        alt="Pokédex"
      />
      {/* <h1 className="pokemon-title">Pokédex</h1> */}
      <nav>
        <ul className="pokemon-nav">
          <li>
            <Link to="/" className="pokemon-link">
              Home
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
