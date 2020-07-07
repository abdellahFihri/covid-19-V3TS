
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import styles from './donut.module.scss';
interface Props{}

interface State{
  [x: string]: any;
}

class Donut extends Component <State,Props> {



    state:State = {
      options: {
        chart:{
          type:'donut'
        },
       

      },
      series: [],
      chartOptions: {
       
        responsive:[
         
          {
            breakpoint:414,
            options: {
              
      chart:{
    type:'pie'
      }
            },
           
          },
        ],
        title: {
            text: 'title',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '15px',
              fontWeight:  'bold',
              fontFamily:  'Helvetica, Arial, sans-serif',
              color:  '#898989'
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center', 
            floating: false,
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: '#898989',
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        },
        labels: [],
        colors: ['#F1A51B', '#169310', '#D62D33'],
        plotOptions: {
           
            pie: {
              customScale: 1,
              offsetX: 0,
              offsetY: 0,
              expandOnClick: true,
              dataLabels: {
                  offset: 0,
                  minAngleToShowLabel: 10
              }, 
              donut: {
                size: '68%',
                background: 'transparent',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    color: '#898989',
                    offsetY: 0
                  },
                  value: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    color: '#5068e0',
                    offsetY: 8,
                    formatter: function (val:number) {
                      return val
                    }
                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'Total',
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    color: '#5068e0',
                    formatter: function (w:any) {
                      return w.globals.seriesTotals.reduce((a:number, b:number) => {
                        return a + b
                      }, 0)
                    }
                  }
                },
                
              },      
            }
          }
        
      }
      
    }

componentDidMount(){
    this.setState({series:'',chartOptions:{...this.state.chartOptions,title:{...this.state.chartOptions.title,text:''},labels:''}})

    const{active_cases,total_recovered,total_deaths}=this.props.data;
    const dataArray=[active_cases,total_recovered,total_deaths];
    const noComma=dataArray.map(number=>
        number.replace(/,/g,'')
    )
const chartArray=noComma.map(number=>parseFloat(number));
this.setState({series:chartArray,chartOptions:{...this.state.chartOptions,title:{text:this.props.title},labels:this.props.labels}})

}
  render() {
const {chartOptions,series,options}=this.state;
    return (
        <div className={styles.donut}>
      <div className={styles.donutcontainer}>
        <Chart options={chartOptions} series={series}  type={options.chart.type} width='100%'  />
      </div>
      </div>
    );
  }
}

export default Donut;