import React, { Component } from "react";
import Chart from "react-apexcharts";
import styles from "./donut.module.scss";
import { connect } from "react-redux";
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
          color: "#898989",
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
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        offsetX: 0,
        offsetY: 0,
        labels: {
          colors: "#898989",
          useSeriesColors: false,
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          strokeColor: "#fff",
          fillColors: undefined,
          radius: 8,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0,
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
          customScale: 0.9,
          offsetX: 0,
          offsetY: 0,
          expandOnClick: true,
          dataLabels: {
            offset: 2,
            minAngleToShowLabel: 10,
          },
          donut: {
            size: "70%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "13px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#898989",
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "13px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#5068e0",
                offsetY: 8,
                formatter: function (val: string) {
                  return parseInt(val).toLocaleString();
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
                    .replace(/,/g, ".");
                },
              },
            },
          },
        },
      },
    },
  };

  componentDidMount() {
    const { data, selectedCountry } = this.props.donut;
    this.setState({
      series: data,
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
    const { data, selectedCountry } = this.props.donut;
    if (prevProps.donut.selectedCountry !== selectedCountry) {
      this.setState({
        series: data,
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
    console.log("data in donut", this.props.donut);
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
const mapStateToProps = (state: any) => {
  return {
    donut: state.data.donut,
  };
};

export default connect(mapStateToProps)(Donut);
