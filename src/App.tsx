import React,{Component} from 'react';
import './App.css';
import Chart from './chart/chart';
import Donut from './chart/donut';
import Paper from './hoc/paper/paper';
import Infos from './infos/infos';
import NavBar from './navbar/bar';
import Spinner from './hoc/spinner/spinner';
import _ from 'lodash';
import Container from './hoc/container/container';
import StatsCard from './hoc/statsCard/card';
import SearchBar from './hoc/searchbar/searchbar';
import CovidRequest from './axios/axios';
require('dotenv').config()

interface Props{}
interface State{
  initialState:any[],
  worldData:any[],
  chartData:any,
  countriesData:any[],
  filteredCountriesData:any[],
  countryHistory:any,
  selectedCountry:string,
  searchTerm:string,
  loading:boolean
}



class App extends Component<Props,State> {
 

   
    
  
  state:State={
    initialState:[],
worldData:[],
chartData:'',
countriesData:[],
countryHistory:'',
filteredCountriesData:[],
selectedCountry:'the world',
searchTerm:'',
loading:false
  }


request(){
  this.setState({
    worldData:[],
  chartData:'',
  countriesData:[],
  filteredCountriesData:[],
  countryHistory:'',
  searchTerm:'',
  selectedCountry:'the world'

  })


  CovidRequest.get("worldstat.php"
  
  )
    .then((response):void=>{
 
      interface Response{
        [key:string]:string;
      }
      const data:Response=response.data;
      const {total_cases,new_cases,active_cases,total_deaths,new_deaths,total_recovered,serious_critical,total_cases_per_1m_population,statistic_taken_at}=data;
      this.setState({chartData:data})
      const dataArray=[total_cases,new_cases,active_cases,total_deaths,new_deaths,total_recovered,serious_critical,total_cases_per_1m_population,statistic_taken_at];
      const takeOffComma=dataArray.map(number=>number.replace(/,/g,''));
     
      this.setState({worldData:takeOffComma,initialState:takeOffComma});
    })
    .catch((error):any=>{
      console.log(error)
    })


CovidRequest.get("cases_by_country.php"

  )
  .then((response)=>{
   
    let worldData=response.data.countries_stat;
    let refinedData=worldData=worldData.sort(function(a: { death: number; }, b: { death: number; }){return a.death-b.death})
    this.setState({countriesData:refinedData,
      filteredCountriesData:refinedData
    })
    
  })
  .catch((error)=>{
    console.log(error)
  })
}










 componentDidMount(){
 
this.request();

document.title = `Covid 19 Stats in ${this.state.selectedCountry}`;
  }
  
  
   handleSelectedCountry=(id:any)=>{
    this.setState({chartData:'',selectedCountry:''})
     this.setState({countryHistory:'',loading:true})
     let selected=id;
     this.setState({selectedCountry:selected})
 

CovidRequest.get("cases_by_particular_country.php",{
    
    "params":{
    "country":`${selected}`
    }
    })
    .then((response)=>{
      console.log('response of  history ',response.data);
      const getStat=response.data.stat_by_country;
  
    getStat.map((item: { record_date: string | any[]; })=>item.record_date=item.record_date.slice(0,10));
   
    let filteredData:any[] = _.uniqBy(getStat,'record_date');
    let allHistory=this.historyData(filteredData)
  console.log('allHistory',allHistory)
  this.setState({countryHistory:allHistory,selectedCountry:selected,loading:false})
    })
    .catch((error)=>{
      console.log(error)
    })

    CovidRequest.get("latest_stat_by_country.php", {
   
      "params":{
    "country":`${selected}`
      }
      })
      .then((response)=>{
        interface Data{
          [key:string]:any;
        }
       
        const data:Data=response.data.latest_stat_by_country[0];
        console.log('data',data)
        const {total_cases,new_cases,active_cases,total_deaths,new_deaths,total_recovered,serious_critical,total_cases_per1m}=data;
        this.setState({chartData:data})
        const dataArray:any[]=[total_cases,new_cases,active_cases,total_deaths,new_deaths,total_recovered,serious_critical,total_cases_per1m];
        const takeOffComma:number[]=dataArray.map(number=>parseInt(number.replace(/,/g,'')));
     
        this.setState({worldData:takeOffComma});
     
      
      })
      .catch((error)=>{
        console.log(error)
      })
   }

   handleReset=()=>{
    this.request()
   }
   
   handleChange=(event: { target: { value: any; }; })=>{
  
   let term=event.target.value;
  
   term.length? term=term[0].toUpperCase() + term.slice(1)
   :term=''

   
    
   
    this.setState({searchTerm:event.target.value});
    let arrayOfCountries=this.state.countriesData;
    let filteredCountries= arrayOfCountries.filter(function(country){
      return country.country_name.includes(term)
      
    })
    this.setState({filteredCountriesData:filteredCountries})
  }
  private historyData(filteredData: any[]) {
    return [
      filteredData.map((day: { total_cases: string; }) => parseInt(day.total_cases.replace(/,/g, ''))),
      filteredData.map((day: { active_cases: string; }) => parseInt(day.active_cases.replace(/,/g, ''))),
      filteredData.map((day: { total_recovered: string; }) => parseInt(day.total_recovered.replace(/,/g, ''))),
      filteredData.map((day: { serious_critical: string; }) => parseInt(day.serious_critical.replace(/,/g, ''))),
      filteredData.map((day: { total_deaths: string; }) => parseInt(day.total_deaths.replace(/,/g, ''))),
      filteredData.map((day: { record_date: any; }) => day.record_date)
    ];
  }

  render(){

    const{worldData,initialState,chartData,selectedCountry,filteredCountriesData}=this.state;
  
   

  return (
    <div>
      <NavBar />
  <div id="main-title"> visualization of  statistics per country</div>
 
{
  !worldData.length?
  <Spinner/>
  :
 <Container>
   <div className="row">
     <div className="col-lg-3"> 
     <div className="row">
 <StatsCard  colSize={6}  title="Total cases" end={worldData[0]}/>
 <StatsCard  colSize={6} title="Last 24h cases" end={worldData[1]}/>
 </div>
 <div className="row">
 
 <Paper className="col-lg-12"
 title="Countries Summary"
bar={ <SearchBar
placeholder="Country quick search"
value={this.state.searchTerm}
onChange={this.handleChange}
/>}
 col1="Country"
 col2="Cases"
 col3="Deaths"
 col4="Recovered"
 
 >
   
  <div className="country" >
   
   <span onClick={this.handleReset} >The world</span> <span>{initialState[0]}
    </span>
    <span>{initialState[3]}
    </span>
    <span>{initialState[5]}
    </span></div>
{
  filteredCountriesData.length?
filteredCountriesData.map(country=>{
 return (<div className="country" key={Math.random()} >
   <span onClick={()=>this.handleSelectedCountry(country.country_name)}  id={country.country_name} >{country.country_name}</span> <span>{country.cases.replace(',','.')}
    </span>
    <span>{country.deaths.replace(',','.')}
    </span>
    <span>{country.total_recovered.replace(',','.')}
    </span></div>)
 }):<Spinner/>

 }
   </Paper>
 
   </div>
   
 </div>
 < div className="col-lg-4">
{ chartData?
 <Donut data={chartData}
  labels={['Active cases','Recovered','Deaths']}
  title={`Deaths/Recovering ratio in ${selectedCountry}`}
  />
  :<Spinner/>
 }
 <div className="row">
 <Infos
 info1={worldData[6] < worldData[2]
  ?worldData[6]
  :parseInt(worldData[2])
}
 info2={worldData[7]}
 info3={worldData[4]}
 />
</div>
</div>
<div className="col-lg-5"> 
<div className="row">
<StatsCard  colSize={6} title="Total deaths" end={worldData[3]}/>
<StatsCard  colSize={6} title="Total recovered" end={worldData[5]}/>
</div>
<div className="row">
  {
this.state.countryHistory?
<Container>
  <Chart country=''   data={this.state.countryHistory} title={`Evolution of COVID-19 in ${this.state.selectedCountry}`} />
  </Container>
  :
  this.state.loading?
  <Spinner/>
  :
  ''
  }
 
</div>

</div>

</div>
</Container>
}
<div id="footer">
<span id="update"> Last updated: {worldData[8] || this.state.chartData.record_date}</span>
<span id="update"> Developed by Abdellah Fihri</span>
</div>
  </div>
  );
}
}

export default App;
