import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetails from "./PokemonDetails";
import axios from "axios";
import Header from "./Header";
import Home from "./Home";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0); // Track the index of the current Pokemon
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    let cancel;

    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        Promise.all(
          res.data.results.map(async (p) => {
            const pokemonResponse = await axios.get(p.url);
            return {
              name: p.name,
              url: p.url,
              image: pokemonResponse.data.sprites.front_default,
            };
          })
        ).then((pokemonData) => {
          setPokemon(pokemonData);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      });

    return () => {
      cancel && cancel(); // Cancel request on component unmount
    };
  }, [currentPageUrl]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPageUrl(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0&${searchQuery}`
      );
    } else {
      setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon");
    }
  }, [searchQuery]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  function handleSearch(query) {
    setSearchQuery(query.toLowerCase());
  }

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchQuery)
  );

  return (
    <Router basename="/react-pokemon">
      <Header
        onSearch={handleSearch}
        nextPageUrl={nextPageUrl}
        prevPageUrl={prevPageUrl}
        gotoNextPage={gotoNextPage}
        gotoPrevPage={gotoPrevPage}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              pokemon={filteredPokemon}
              nextPageUrl={nextPageUrl}
              prevPageUrl={prevPageUrl}
              gotoNextPage={gotoNextPage}
              gotoPrevPage={gotoPrevPage}
            />
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <PokemonDetails
              pokemon={filteredPokemon}
              currentPokemonIndex={currentPokemonIndex}
              setCurrentPokemonIndex={setCurrentPokemonIndex}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
