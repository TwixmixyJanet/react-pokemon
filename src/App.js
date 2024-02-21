import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true); // true because we want to show a loading spinner when the data is being fetched from the API.

  useEffect(() => {
    setLoading(true); // we set loading to true when the component mounts. This is because we want to show a loading spinner when the data is being fetched from the API.
    let cancel; // we use the cancel variable to cancel the request when the component unmounts. This is to prevent memory leaks.
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)), // we use the cancelToken property to cancel the request when the component unmounts. This is to prevent memory leaks.
      })
      .then((res) => {
        setLoading(false); // once the data is fetched, we set loading to false.
        setNextPageUrl(res.data.next); // next is a property of the response object from the API. It's a URL to the next page of results.
        setPrevPageUrl(res.data.previous); // previous is a property of the response object from the API. It's a URL to the previous page of results.
        setPokemon(res.data.results.map((p) => p.name));

        return () => {
          cancel();
          // cleanup function to cancel the request
        };
      });
  }, [currentPageUrl]); // every time currentPageUrl changes, useEffect will run. This is used because we want to fetch the data from the API every time the currentPageUrl changes. For the pagination! If this array is left blank, then it's because we don't want the useEffect to run every time the component re-renders.

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading..."; // if loading is true, we return "Loading...". This is because we want to show a loading spinner when the data is being fetched from the API.

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
