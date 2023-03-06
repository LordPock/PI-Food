import React from "react";
import styles from "./paginado.module.css";

export default function Paginado({ recipesPerPage, recipes, paginado, currentPage }) {
  const pageNumber = [];
 
  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNumber.push(i);
    }

  return (
    <div className={styles.paginado}>
      <button
        onClick={() => paginado(1)}
        key={"primero"}
        className={styles.primero}
      />
      <button
        onClick={() => {currentPage > 1 && paginado(currentPage - 1)}}
        key={"anterior"}
        className={styles.anterior}
      />
      <ul>
        {pageNumber &&
          pageNumber.map((p) => (
            <a onClick={() => paginado(p)} key={p} className={currentPage === p ? styles.current : undefined}>
              {p}
            </a>
          ))}
      </ul>
      <button
        onClick={() => {currentPage < pageNumber.length   && paginado(currentPage + 1)}}
        key={"siguiente"}
        className={styles.siguiente}
      />
      <button
        onClick={() => paginado(pageNumber.length)}
        key={"ultimo"}
        className={styles.ultimo}
      />
    </div>
  );
}
