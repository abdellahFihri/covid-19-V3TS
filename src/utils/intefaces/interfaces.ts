export interface Response {
  [key: string]: string;
}

export interface Data {
  [key: string]: any;
}

export interface Props {
  // chartData: any;
  TodayWorldData: any;
  allCountriesData: any;
  countryHistory: any;
  loading: boolean;
  selectedCountry: string;
  firstRow: any;
  
  world: any;
  data: any;
  countriesStats: any;
  history: any;
}

export interface State {
  // initialState: any[];
  // worldData: any[];
  // chartData: any;
  // countriesData: any[];
  // filteredCountriesData: any[];
  // countryHistory: any;
  // selectedCountry: string;
  // searchTerm: string;
  loading: boolean;
}
