import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import style from "./overlay.module.scss";
import { Spinner } from "reactstrap";
import {
  selectOverlayCountry,
  selectOverlayIso,
} from "../../redux/reducers/overlay/overlaySelector";
interface Props {
  iso: string;
  selectedCountry: string;
}
const Overlay: React.FunctionComponent<Props> = (props) => {
  const { iso, selectedCountry } = props;

  return (
    <div className={style.overlay}>
      <span
        className={style.span}
      >{`Collecting data for ${selectedCountry}`}</span>
      <img
        src={`https://flagcdn.com/${iso.toLocaleLowerCase()}.svg`}
        width="50"
        alt=""
      />
      <div className={style.spinners}>
        {[0, 1, 2].map((i: number) => (
          <Spinner type="grow" color="light" size="sm" key={i} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedCountry: selectOverlayCountry,
  iso: selectOverlayIso,
});

export default connect(mapStateToProps)(Overlay);
