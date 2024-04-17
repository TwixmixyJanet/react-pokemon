import React from "react";
import "./styles.css";

function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {gotoPrevPage && (
        <button className="pokemon-font-button" onClick={gotoPrevPage}>
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button className="pokemon-font-button" onClick={gotoNextPage}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
