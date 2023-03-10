import { connect } from "react-redux";
import { searchRecipe } from "../../redux/actions";
import styles from "./search.module.css";

export function Search(props) {
  function HandleChange(e) {
    props.searchRecipe(e.target.value);
  }

  return (
    <div className={styles.container}>
      <input
        title="input"
        type="string"
        onChange={HandleChange}
        placeholder="Buscar receta"
      />
      <div className={styles.button}></div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    searchRecipe: (title) => dispatch(searchRecipe(title)),
  };
}

export default connect(null, mapDispatchToProps)(Search);
