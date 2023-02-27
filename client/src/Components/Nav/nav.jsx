import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { emptyMessage, filterRecipes, sortRecipes } from "../../redux/actions";
import Search from "../Search/search";
import styles from "./nav.module.css";

export function Nav(props) {
  const { diets } = props;
  const dispatch = useDispatch();

  const [filters, setFilter] = useState([]);

  const [hidden, setHidden] = useState({
    sort: true,
    filter: true,
    alf: true,
    health: true,
    menu: true,
  });

  useEffect(() => {
    let filtro = diets && diets;
    let filt = [];
    filtro.forEach((d) => filt.push(d.title));
    setFilter(filt);
  }, [diets]);

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

  function handleHidden(e) {
    setHidden({ ...hidden, [e.target.id]: !hidden[e.target.id] });
  }

  return (
    <div className={styles.nav}>
      <div className={styles.navs}>
        <div className={styles.container}>
          <div onClick={handleHidden} id="menu" className={styles.menu}>
            Menu
          </div>
          <div className={!hidden.menu && styles.submenu} hidden={hidden.menu}>
            <div id="filter" onClick={handleHidden}>
              Filtrar
            </div>
            <div id="sort" onClick={handleHidden}>
              Ordenar
            </div>
            <div className={!hidden.sort && styles.orden}>
            <div id="alf" hidden={hidden.sort} onClick={handleHidden} >
              Alfabeticamente
              </div>
              <div
                id="optalf"
                // className={!hidden.alf && styles.orden1}
                hidden={hidden.alf}
              >
                <option value="AASC" onClick={handleSort}>
                  Ascendente
                </option>
                <option value="ADSC" onClick={handleSort}>
                  Descendente
                </option>
                
              
            </div>
            <div onClick={handleHidden} id="health" hidden={hidden.sort}>
              Saludable
              <div
                id="opthealth"
                // className={!hidden.health && styles.orden1}
                hidden={hidden.health}
              >
                <option value="HASC" onClick={handleSort}>
                  Ascendente
                </option>
                <option value="HDSC" onClick={handleSort}>
                  Descendente
                </option>
              </div>
            </div>
          </div>
          <div>
          <NavLink to={"/about"}>About</NavLink>
        </div>
        </div>

          </div>
          
        <div>
          <img className={styles.logo} src="src/nav.png" alt="" />
        </div>
        
        <div></div>
        <div></div>
      </div>
      <div>
        <Search />
        <Link to={"/create"}>
          <button onClick={handleCreate}>Crear receta </button>
        </Link>
      </div>
      <div
        className={!hidden.filter && styles.check}
        id="Filter"
        hidden={hidden.filter}
      >
        {diets ? (
          diets.map((d) => (
            <div>
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
            </div>
          ))
        ) : (
          <h5>No hay tipo de dietas cargadas </h5>
        )}
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
