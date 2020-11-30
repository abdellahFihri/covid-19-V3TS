import React from "react";
import Container from "../hoc/container/container";
import CompareRadar from "../compare/compareRadar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Col, Row } from "reactstrap";
import MixedChart from "../chart/mixedChart/mixedBarChart";
import {
  selectCountryName_1,
  selectCountryName_2,
  selectHistory_1,
  selectHistory_2,
  selectIso_1,
  selectIso_2,
} from "../redux/reducers/comparableCountries/comparableCountriesSelector";
interface Props {
  iso1: string;
  iso2: String;
  country1: string;
  country2: string;
  history1: any;
  history2: any;
}
const CompareCountries: React.FunctionComponent<Props> = ({
  iso1,
  iso2,
  country1,
  country2,
  history1,
  history2,
}) => {
  console.log("DATA IM COMPARECOUNTRIES PAGE", history2);
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <CompareRadar />
        </Col>
        <Col lg={6}>
          <Row>
            <Col>
              <MixedChart data={history1} />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <MixedChart data={history2} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = createStructuredSelector({
  iso1: selectIso_1,
  iso2: selectIso_2,
  country1: selectCountryName_1,
  country2: selectCountryName_2,
  history1: selectHistory_1,
  history2: selectHistory_2,
});
export default connect(mapStateToProps)(CompareCountries);
