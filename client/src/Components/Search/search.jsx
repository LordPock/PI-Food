
import { connect } from "react-redux";
import { searchRecipe } from "../../redux/actions";
import styles from './search.module.css'

export function Search(props) {

  function HandleChange(e) {
    props.searchRecipe(e.target.value);
  }


  return (
    <div className={styles.container}>
      <button ></button>
      <div hidden={true}>
      <input

        title="input"
        type="string"
        onChange={HandleChange}
        placeholder="Buscar receta"
      />
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    searchRecipe: (title) => dispatch(searchRecipe(title)),
  };
}

export default connect(null, mapDispatchToProps)(Search);
