import React, { Component } from "react";
import Chart from "react-apexcharts";
import styles from "./donut.module.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectWorldRow, selectSelectedCountry } from "../redux/reducers/worldDataSelector";
import { numberWithCommas } from "../utils/utilities/helpers";
interface Props {}

interface State {
  [x: string]: any;
}

class Donut extends Component<State, Props> {
  state: State = {
    options: {
      chart: {
        type: "donut",
      },
    },
    series: [],
    chartOptions: {
      responsive: [
        {
          breakpoint: 414,
          options: {
            chart: {
              type: "pie",
            },
          },
        },
      ],
      title: {
        text: "title",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: "Helvetica, Arial, sans-serif",
          color: "#3d3d3d",
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        fontSize: "12px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 400,
        // formatter: undefined,
        // inverseOrder: false,
        // width: undefined,
        // height: undefined,
        // tooltipHoverFormatter: undefined,
        // offsetX: 0,
        // offsetY: 0,
        labels: {
          colors: "#3d3d3d",
          useSeriesColors: false,
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          // fillColors: undefined,
          radius: 8,
          // customHTML: undefined,
          // onClick: undefined,
          // offsetX: 0,
          // offsetY: 0,
        },
        itemMargin: {
          horizontal: 5,
          vertical: 0,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      labels: [],
      colors: ["#F1A51B", "#169310", "#D62D33"],
      plotOptions: {
        pie: {
          customScale: 1,
          offsetX: 0,
          offsetY: 0,
          expandOnClick: true,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10,
          },
          donut: {
            size: "70%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#3d3d3d",
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "12px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#5068e0",
                offsetY: 8,
                formatter: function (val: string) {
                  return numberWithCommas(val);
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total",
                fontSize: "13px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,

                color: "#5068e0",
                formatter: function (w: any) {
                  return w.globals.seriesTotals
                    .reduce((a: number, b: number) => {
                      return a + b;
                    }, 0)
                    .toLocaleString()
                    .replace(/,/g, ",");
                },
              },
            },
          },
        },
      },
    },
  };

  componentDidMount() {
    // const { data, selectedCountry } = this.props.donut;
    const { worldRow, selectedCountry } = this.props
    this.setState({
      series: [worldRow.active_cases, worldRow.recovered, worldRow.deaths],
      chartOptions: {
        ...this.state.chartOptions,
        title: {
          text: `Death/Recovery ratio in ${selectedCountry}`,
        },
        labels: ["Active cases", "Recovered", "Deaths"],
      },
    });
  }
  componentDidUpdate(prevProps: any) {
    const { worldRow, selectedCountry } = this.props;
    if (prevProps.selectedCountry !== selectedCountry) {
      this.setState({
        series: [worldRow.active_cases, worldRow.recovered, worldRow.deaths],
        chartOptions: {
          ...this.state.chartOptions,
          title: {
            text: `Death/Recovery ratio in ${selectedCountry}`,
          },
        },
      });
    }
  }

  render() {
    // console.log("data in donut", this.props.donut);
    const { chartOptions, series, options } = this.state;
    // console.log("series ", series);
    return (
      <div className={styles.donut}>
        <div className={styles.donutcontainer}>
          <Chart
            options={chartOptions}
            series={series}
            type={options.chart.type}
            width="100%"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  worldRow: selectWorldRow,
  selectedCountry:selectSelectedCountry
})


export default connect(mapStateToProps)(Donut);
