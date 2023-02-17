import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { filterRecipe } from "../../redux/actions";
import Search from "../Search/search";

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

  function addFilter(e) {
    if (filters.includes(e.target.value)) {
      setFilter(filters.filter((d) => d !== e.target.value));
    } else {
      setFilter([...filters, e.target.value]);
    }
    dispatch(filterRecipe(filters))
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
        <button onClick={viewFilter}>Filtros</button>
        <div id="Filter" hidden={true}>
          {diets ? (
            diets.map((d) => (
              <label>
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
  );
}

export function mapStateToProps(state) {
  return {
    diets: state.diets,
  };
}

export default connect(mapStateToProps, null)(Nav);
