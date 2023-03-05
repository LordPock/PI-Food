import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyMessage, filterRecipes, sortRecipes } from "../../redux/actions";
import Search from "../Search/search";
import styles from "./nav.module.css";

export function Nav(props) {
  const { diets } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const [filters, setFilter] = useState([]);

  const [hidden, setHidden] = useState(true);

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
    let filtro = diets && diets;
    let filt = [];
    filtro.forEach((d) => filt.push(d.title));
    setFilter(filt);
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
    setHidden(!hidden);
  }

  function handleHome() {
    navigate("/recipes");
  }


  return (
    <div className={styles.nav}>
      <div className={styles.navs}>
        <div className={styles.left}>
          <div onClick={handleHome} className={styles.ccreate}>
            <input placeholder="Volver a página principal" disabled={true} />
            <div className={styles.home}></div>
          </div>
          {location.pathname === '/recipes' ? <div>
            <Search />
          </div> : null}
          <div onClick={handleCreate} className={styles.ccreate}>
            <input placeholder="Añadir receta" disabled={true} />
            <div className={styles.create}></div>
          </div>
        </div>

        <div className={styles.center}>
          <img className={styles.logo} src="src/nav.png" alt="" />
          {location.pathname === '/recipes' ? <div
            className={!hidden ? styles.check : undefined}
            id="Filter"
            hidden={hidden}
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
          </div> : null }
        </div>

        <div className={styles.right}>
          <div onClick={handleAbout} className={styles.ccreate}>
            <div className={styles.about}></div>
            <input placeholder="Sobre mí" disabled={true} />
          </div>
          {location.pathname === '/recipes' ? <div className={styles.ccreate} onClick={handleHidden}>
            <div className={styles.filter}></div>
            <input placeholder="Filtrar" disabled={true} />
          </div> : null }
          {location.pathname === '/recipes' ? <div className={styles.ccreate}>
            <div className={styles.sort}> </div>
            <option
              className={styles.AASC}
              value="AASC"
              onClick={handleSort}
            ></option>
            <option
              className={styles.ADSC}
              value="ADSC"
              onClick={handleSort}
            ></option>
            <option
              className={styles.HASC}
              value="HASC"
              onClick={handleSort}
            ></option>
            <option
              className={styles.HDSC}
              value="HDSC"
              onClick={handleSort}
            ></option>
          </div> : null }
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
