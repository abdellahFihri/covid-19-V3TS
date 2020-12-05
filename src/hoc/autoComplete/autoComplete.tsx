import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { connect } from "react-redux";
import { setComparable } from "../../redux/actions/index";
import { createStructuredSelector } from "reselect";
import { selectAll } from "../../redux/reducers/allCountries/allCountriesDataSelector";
import style from "./autoComplete.module.scss";

interface Props {
  id: string;
  all: any;
  label: string;
  setComparable: any;
}
const ComboBox = (props: Props) => {
  const { all, id, label, setComparable } = props;
  const [value, setValue] = useState<string | null | any>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Autocomplete
      autoComplete
      disableClearable
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
        setComparable({ country: newValue, id: id });
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id={id}
      options={all}
      getOptionLabel={(option: any) => option.iso3166a3}
      renderOption={(option: any) => (
        <React.Fragment>
          <div className={style.renderOption}>
            {" "}
            <span>{option.iso3166a3}</span>{" "}
            <span>
              {" "}
              <img
                src={`https://www.countryflags.io/${
                  option.iso3166a2 ? option.iso3166a2 : ""
                }/flat/32.png`}
                alt=""
              />{" "}
            </span>
          </div>
        </React.Fragment>
      )}
      style={{ width: "120px" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          size="small"
          color="primary"
        />
      )}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  all: selectAll,
});
export default connect(mapStateToProps, { setComparable })(ComboBox);
