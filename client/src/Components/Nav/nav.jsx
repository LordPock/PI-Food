import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDiets, emptyMessage, filterRecipes, sortRecipes } from "../../redux/actions";
import Search from "../Search/search";
import styles from "./nav.module.css";

export function Nav(props) {
  const { diets } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilter] = useState([]);

  const [hidden, setHidden] = useState({
    sort: true,
    filter: true,
    alf: true,
    health: true,
    menu: true,
  });

  const [checked, setChecked] = useState(11);

  function addFilter(e) {
    !e.target.checked ? setChecked(checked - 1) : setChecked(checked + 1);
    const updatedFilters = filters.includes(e.target.value)
      ? filters.filter((d) => d !== e.target.value)
      : [...filters, e.target.value];
    setFilter(updatedFilters);
    dispatch(filterRecipes(updatedFilters));
  }

  useEffect(() => {
    // if (checked === 0) {
    let filtro = diets && diets;
   console.log(filtro);
    let filt = [];
    filtro.forEach((d) => filt.push(d.title));
    setFilter(filt);
    // }
  }, [diets]);

  function handleSort(e) {
    dispatch(sortRecipes(e.target.value));
  }

  function handleCreate() {
    dispatch(emptyMessage());
    navigate("/create");
  }

  function handleAbout() {
    navigate("/about");
  }

  function handleHidden(e) {
    setHidden({ ...hidden, [e.target.id]: !hidden[e.target.id] });
  }
  console.log(filters);
  return (
    <div className={styles.nav}>
      <div className={styles.navs}>
        <div className={styles.container}>
          <div onClick={handleHidden} id="menu" className={styles.menu}>
            Menu
            {hidden.menu ? <div>&#x2B;</div> : <div>&#x207B;</div>}
          </div>
          <div
            className={!hidden.menu ? styles.submenu : undefined}
            hidden={hidden.menu}
          >
            <div id="create" onClick={handleCreate}>
              Añadir receta
            </div>
            <div id="filter" onClick={handleHidden}>
              Filtrar
            </div>
            <div className={styles.ordenar} id="sort" onClick={handleHidden}>
              Ordenar
              {hidden.sort ? <span>&#x2B;</span> : <span>&#x207B;</span>}
            </div>
            <div
              className={!hidden.sort ? styles.submenuitems : undefined}
              id="alf"
              hidden={hidden.sort}
              onClick={handleHidden}
            >
              Alfabeticamente
              {hidden.alf ? <span>&#x2B;</span> : <span>&#x207B;</span>}
            </div>

            <option hidden={hidden.alf} value="AASC" onClick={handleSort}>
              Ascendente
            </option>

            <option hidden={hidden.alf} value="ADSC" onClick={handleSort}>
              Descendente
            </option>

            <div
              className={!hidden.sort ? styles.submenuitems : undefined}
              onClick={handleHidden}
              id="health"
              hidden={hidden.sort}
            >
              Saludable
              {hidden.health ? <span>&#x2B;</span> : <span>&#x207B;</span>}
            </div>
            <option hidden={hidden.health} value="HASC" onClick={handleSort}>
              Ascendente
            </option>
            <option hidden={hidden.health} value="HDSC" onClick={handleSort}>
              Descendente
            </option>

            <div onClick={handleAbout}>About</div>
          </div>
        </div>

        <div className={styles.center}>
          <img className={styles.logo} src="src/nav.png" alt="" />
          <div
            className={!hidden.filter ? styles.check : undefined}
            id="Filter"
            hidden={hidden.filter}
          >
            {diets ? (
              diets.map((d) => (
                <div key={d.id}>
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
        <div>
          <Search />
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
