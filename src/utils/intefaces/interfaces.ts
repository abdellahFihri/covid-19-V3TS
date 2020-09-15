export interface Response {
  [key: string]: string;
}

export interface Data {
  [key: string]: any;
}

export interface Props {}

export interface State {
  initialState: any[];
  worldData: any[];
  chartData: any;
  countriesData: any[];
  filteredCountriesData: any[];
  countryHistory: any;
  selectedCountry: string;
  searchTerm: string;
  loading: boolean;
}
