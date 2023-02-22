import React, { useEffect } from "react";

export default function Paginado({ recipesPerPage, recipes, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNumber.push(i);
  }


  
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((p) => (
            <ul key={p}>
              <a onClick={() => paginado(p)}>{p}</a>
            </ul>
          ))}
      </ul>
    </nav>
  );
}
