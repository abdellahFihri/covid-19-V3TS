import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSearchTerm } from "../../redux/reducers/searchBar/searchBarSelector";
import styles from "./searchbar.module.scss";
interface Props {
  onChange: (event: { target: { value: any } }) => void;
  placeholder: string;
  value?: string;
  term: string;
}

const searchBar: React.FunctionComponent<Props> = ({
  onChange,
  placeholder,
  term,
}) => (
  <div className={styles.input}>
    {console.log("seRHCTERM", term)}
    <input
      type="text"
      name=""
      placeholder={placeholder}
      id=""
      value={term}
      onChange={onChange}
    />
  </div>
);
const mapStateToProps = createStructuredSelector({
  term: selectSearchTerm,
});
export default connect(mapStateToProps)(searchBar);
