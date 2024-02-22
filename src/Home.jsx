import React from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";

const MainPage = ({
  pokemon,
  nextPageUrl,
  prevPageUrl,
  gotoNextPage,
  gotoPrevPage,
}) => {
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
};

export default MainPage;
