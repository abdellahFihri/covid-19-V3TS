import React, { Component } from "react";
import Chart from "react-apexcharts";
import styles from "./chart.module.scss";
import { connect } from "react-redux";
interface State {
  [x: string]: any;
}
interface Props {
  data: any;
  title: any;
  country: string;
  history: any;
}

class dataChart extends Component<Props, State> {
  state: State = {
    options: {
      stroke: {
        show: true,
        curve: "straight",
        lineCap: "square",
        colors: undefined,
        width: 2,
        dashArray: 0,
      },
      markers: {
        size: 2,
        colors: ["#1289e8", "#f1a51b", "#169310", "#e57022", "#d62d33"],
        strokeColors: ["#1289e8", "#f1a51b", "#169310", "#e57022", "#d62d33"],
        strokeWidth: 2,
        showNullDataPoints: true,
      },
      tooltip: {
        enabled: true,

        shared: true,

        fillSeriesColor: false,
        theme: undefined,
        style: {
          fontSize: undefined,
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        x: {
          show: true,
          format: "dd MMM",
          formatter: undefined,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName: any) => seriesName,
          },
        },
        z: {
          formatter: undefined,
          title: "Size: ",
        },
        marker: {
          show: true,
        },
        items: {
          display: "flex",
        },
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
      },

      colors: ["#1289e8", "#f1a51b", "#169310", "#e57022", "#d62d33"],
      legend: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial",
        fontWeight: 500,
        offsetY: 5,
        position: "bottom",
        labels: {
          colors: ["#898989"],
        },
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: "570",
            },
          },
        },
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "300",
              offsetX: 5,
            },
          },
        },
        {
          breakpoint: 900,
          options: {
            chart: {
              width: "600",
            },
          },
        },
        {
          breakpoint: 414,
          options: {
            chart: {
              width: "380",
            },
            markers: {
              size: 0,
            },
          },
        },
      ],
      title: {
        text: "",
        align: "left",
        margin: 0,
        offsetX: 8,
        offsetY: 0,
        floating: true,
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#898989",
        },
      },
      chart: {
        id: "basic-bar",
        type: "line",
        width: "570",
        background: "",
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: "#3F51B5",
          opacity: 0.35,
        },
      },
      xaxis: {
        categories: [],
        type: "datetime",
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: false,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          minHeight: undefined,
          maxHeight: 120,
          style: {
            colors: "#5068e0",
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 500,
            cssClass: "apexcharts-xaxis-label",
          },
          offsetX: 0,
          offsetY: 0,
          format: undefined,
          formatter: undefined,
          datetimeUTC: true,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
      },
      yaxis: {
        tickAmount: 8,
        forceNiceScale: false,
        showAlways: false,
        logarithmic: false,

        labels: {
          style: {
            colors: "#5068e0",
            fontSize: "12px",
            fontWeight: 500,
          },
          formatter: function nFormatter(value: number) {
            if (value >= 1000000000) {
              return (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
            }
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
            }
            if (value >= 1000) {
              return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
            }
            return value;
          },
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  };

  componentDidMount() {
    const { title } = this.props;
    const { countryHistory } = this.props.history;
    const newState = [
      {
        name: "Global cases",
        data: countryHistory[0],
      },
      {
        name: "Active cases",
        data: countryHistory[1],
      },
      {
        name: "Recovered",
        data: countryHistory[2],
      },
      {
        name: "Critical",
        data: countryHistory[3],
      },
      {
        name: "Deaths",
        data: countryHistory[4],
      },
    ];
    this.setState({
      series: newState,
      options: {
        ...this.state.options,
        title: { ...this.state.title, text: title },
        xaxis: { categories: countryHistory[5] },
      },
    });
  }

  render() {
    const {
      options,
      options: {
        chart: { type, width },
      },
      series,
    } = this.state;
    const { country } = this.props;
    return (
      <div className={styles.container}>
        <span className={styles.title}>
          {country ? `showing results for ${country}` : ""}
        </span>

        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type={type}
                width={width}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    history: state.history,
  };
};
export default connect(mapStateToProps)(dataChart);
