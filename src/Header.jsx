// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import "./styles.css";

function Header({
  onSearch,
  nextPageUrl,
  prevPageUrl,
  gotoNextPage,
  gotoPrevPage,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="pokemon-header">
      <img
        src="https://pokedex.gabrielrapucci.com.br/_next/image?url=%2Fimages%2Fpokedex.png&w=384&q=75"
        alt="Pokédex"
      />
      {/* <h1 className="pokemon-title">Pokédex</h1> */}
      <div className="header-container">
        <nav>
          <ul className="pokemon-nav">
            <li>
              <Link to="/" className="pokemon-link">
                <button className="pokemon-font-button">Home</button>
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
        <div className="menu-pagination">
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </div>
        <div className="search-container pokedex-style">
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchQuery}
            onChange={handleSearch}
            className="pokedex-search-input"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
