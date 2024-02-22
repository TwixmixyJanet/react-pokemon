import React from "react";

function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
}

export default Pagination;
