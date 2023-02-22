import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { filterRecipes, sortRecipes } from "../../redux/actions";
import Search from "../Search/search";
import styles from "./nav.module.css"

export function Nav(props) {
  const { diets } = props;
  const dispatch = useDispatch();

  const [filters, setFilter] = useState([
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30",
  ]);

  function viewFilter() {
    let filter = document.getElementById("Filter");
    filter.hidden = !filter.hidden;
  }

  function viewSort() {
    let sort = document.getElementById("Sort");
    sort.hidden = !sort.hidden;
  }

  function addFilter(e) {
    const updatedFilters = filters.includes(e.target.value)
      ? filters.filter((d) => d !== e.target.value)
      : [...filters, e.target.value];
    setFilter(updatedFilters);
    dispatch(filterRecipes(updatedFilters));
  }

  function handleSort(e) {
    dispatch(sortRecipes(e.target.value))
  }

  return (
    <div>
      <div>
        <h1>HENRY en tu cocina</h1>
        <NavLink to={"/about"}>About</NavLink>
        <Search />
        <Link to={"/create"}>
          <button>Crear receta </button>
        </Link>
        <div className={styles.ordenyfiltro}>
          <div >
            <button onClick={viewSort}>Orden</button>
            <div className={styles.orden} id="Sort" hidden={true}>
              <label>
                Alfabético
                <select onChange={handleSort} defaultValue="Ascendente">
                  <option value='AASC'>Ascendente</option>
                  <option value='ADSC'>Descendente</option>
                </select>
              </label>
              <label>
                Saludable
                <select onChange={handleSort} defaultValue="Ascendente">
                  <option value='HASC'>Ascendente</option>
                  <option value='HDSC'>Descendente</option>
                </select>
              </label>
            </div>
          </div>
          <div>
            <button onClick={viewFilter}>Filtros</button>
            <div id="Filter" hidden={true}>
              {diets ? (
                diets.map((d) => (
                  <label key={d.title}>
                    <input
                      onClick={addFilter}
                      type={"checkbox"}
                      label={d.title}
                      key={d.id}
                      value={d.title}
                      defaultChecked={true}
                    />
                    {d.title}
                  </label>
                ))
              ) : (
                <h5>No hay tipo de dietas cargadas </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    diets: state.diets,
  };
}

export default connect(mapStateToProps, null)(Nav);
