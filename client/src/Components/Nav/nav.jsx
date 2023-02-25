import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { emptyMessage, filterRecipes, sortRecipes } from "../../redux/actions";
import Search from "../Search/search";
import styles from "./nav.module.css";

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

  const [hidden, setHidden] = useState({
    sort: true,
    filter: true
  })

  function viewFilter() {
    setHidden({...hidden, filter: !hidden.filter});
  }

  function viewSort() {
    setHidden({...hidden, sort: !hidden.sort});
  }

  function addFilter(e) {
    const updatedFilters = filters.includes(e.target.value)
      ? filters.filter((d) => d !== e.target.value)
      : [...filters, e.target.value];
    setFilter(updatedFilters);
    dispatch(filterRecipes(updatedFilters));
  }

  function handleSort(e) {
    dispatch(sortRecipes(e.target.value));
  }

  function handleCreate() {
    dispatch(emptyMessage());
  }

  return (
    <div>
      <div>
        <h1>HENRY en tu cocina</h1>
        <NavLink to={"/about"}>About</NavLink>
        <Search />
        <Link  to={"/create"}>
          <button onClick={handleCreate}>Crear receta </button>
        </Link>
        <div className={styles.container}>
          <div className={styles.ordenyfiltro}>
            <div className={styles.orden} >
              <div>
              <button className={styles.button} onClick={viewSort}>&#x23eb; &#x23ec; &#10835;</button>
              </div>
              <div className={!hidden.sort && styles.select} id="Sort" hidden={hidden.sort}>
                <label>
                  Alfabético
                  <select onChange={handleSort} defaultValue="">
                    <option value="AASC">Ascendente</option>
                    <option value="ADSC">Descendente</option>
                  </select>
                </label>
                <label>
                  Saludable
                  <select onChange={handleSort} defaultValue="">
                    <option value="HASC">Ascendente</option>
                    <option value="HDSC">Descendente</option>
                  </select>
                </label>
              </div>
            </div>
            <div className={styles.filtro}>
              <div>
                <div>
                <button onClick={viewFilter}>Filtros</button>
                </div>
                <div className={!hidden.filter && styles.check} id="Filter" hidden={hidden.filter}>
                  {diets ? (
                    diets.map((d) => (
                      <div>
                        <input
                          onClick={addFilter}
                          type={"checkbox"}
                          label={d.title}
                          key={d.id}
                          value={d.title}
                          defaultChecked={true}
                        /><label className={styles.box} key={d.title}>
                        {d.title}
                      </label>
                      </div>
                    ))
                  ) : (
                    <h5>No hay tipo de dietas cargadas </h5>
                  )}
                </div>
                
              </div>
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
