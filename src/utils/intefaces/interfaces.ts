import { LoDashImplicitNumberArrayWrapper } from "lodash";

export interface Response {
  [key: string]: string | number;
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
  mainChartHistory: any;
  firstRow: any;
  overlay: boolean;
  setPeriod: any;
  onFetchData: any;
  year: any;
  world: any;
  data: any;
  countriesStats: any;
  history: any;
  dispatch: any;
  fetchError: string | null;
  axiosLoading: any;
  axiosTotalReq: any;
  ifCountry: boolean;
}

export interface State {
  loading: boolean;
}
