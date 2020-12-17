import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faFilter,
  faSortAmountDown,
  faSortAmountUpAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setTableFilter } from "../../redux/actions/index";
import style from "./sortingArrows.module.scss";
import { listFiltering } from "../../redux/reducers/allCountries/allCountriesDataSelector";
interface Props {
  value: string;
  setTableFilter: (arg0: any) => void;
  filter: any;
}
const SortingArrows: React.FunctionComponent<Props> = ({
  value,
  setTableFilter,
  filter,
}) => {
  const [order, setOrder] = useState("");
  const [localValue, setLocalValue] = useState("");
  function orderIcon() {
    switch (order) {
      case "asc":
        return faSortAmountUpAlt;
      case "desc":
        return faSortAmountDown;
      default:
        return faFilter;
    }
  }
  return (
    <div className={style.main}>
      <div className={style.arrows}>
        {[
          { icon: faSortUp, operator: "asc" },
          { icon: faSortDown, operator: "desc" },
        ].map((i: any) => (
          <FontAwesomeIcon
            key={i.operator}
            icon={i.icon}
            className={style.icon}
            size="lg"
            onClick={() => {
              setTableFilter({ operator: i.operator, value: value });
              setOrder(i.operator);
              setLocalValue(value);
            }}
          />
        ))}
        {/* <FontAwesomeIcon
          icon={faSortUp}
          className={style.icon}
          size="lg"
          onClick={() => {
            setTableFilter({ operator: "asc", value: value });
            setOrder("asc");
            setLocalValue(value);
          }}
        />
        <FontAwesomeIcon
          icon={faSortDown}
          className={style.icon}
          size="lg"
          onClick={() => {
            setTableFilter({ operator: "desc", value: value });
            setOrder("desc");
            setLocalValue(value);
          }}
        /> */}
      </div>{" "}
      <div className={style.sideIcon}>
        <FontAwesomeIcon
          icon={localValue !== filter.value ? faFilter : orderIcon()}
          size="lg"
        />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  filter: listFiltering,
});
export default connect(mapStateToProps, { setTableFilter })(SortingArrows);
