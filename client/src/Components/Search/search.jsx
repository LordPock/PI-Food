
import { connect } from "react-redux";
import { searchRecipe } from "../../redux/actions";

export function Search(props) {

  function HandleChange(e) {
    props.searchRecipe(e.target.value);
  }


  return (
    <div>
      <input

        title="input"
        type="string"
        onChange={HandleChange}
        placeholder="Buscar receta"
      />
      <button>Ver todas</button>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    searchRecipe: (title) => dispatch(searchRecipe(title)),
  };
}

export default connect(null, mapDispatchToProps)(Search);
