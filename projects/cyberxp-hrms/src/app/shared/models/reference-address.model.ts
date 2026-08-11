export interface AddressReference {
  countries: Country[];
  regions: Region[];
  provinces: Province[];
  cities: City[];
}

export interface Country {
  id: number;
  countryName: string;
}

export interface Region {
  id: number;
  countryId: number;
  regionName: string;
}

export interface Province {
  id: number;
  regionId: number;
  provinceName: string;
}

export interface City {
  id: number;
  provinceId: number;
  cityOrMunicipalName: string;
}