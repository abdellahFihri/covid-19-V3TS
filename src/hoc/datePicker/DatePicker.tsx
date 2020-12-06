import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { pickerFormatter } from "../../utils/utilities/helpers";
import {
  selectIfCountry,
  selectPeriodRange,
} from "../../redux/reducers/period/periodSelector";
import { fetchCountrySelectedDate } from "../../redux/actions/index";

interface Props {
  country: string;
  ifCountry: boolean;
  periodRange: string;
  fetchCountrySelectedDate: any;
  dispatch: any;
}
const CovidDatePicker = (props: Props) => {
  const { country, ifCountry, periodRange, fetchCountrySelectedDate } = props;
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        inputVariant="standard"
        value={selectedDate}
        size="small"
        color="primary"
        onChange={(date: any) => {
          handleDateChange(date);
        }}
        onAccept={(date: any) =>
          fetchCountrySelectedDate({
            selectedCountry: country,
            date: date,
            period: periodRange,
          })
        }
        disableFuture
        label="specify period by date"
        margin="dense"
        disabled={!ifCountry}
        minDate={new Date("2020-01-01")}
        format="dd/MM/yyyy"
      />
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  ifCountry: selectIfCountry,

  periodRange: selectPeriodRange,
});
export default connect(mapStateToProps, { fetchCountrySelectedDate })(
  CovidDatePicker
);
