/**
 * Geo location model
 */
export interface Geo {
  lat: string;
  lng: string;
}

/**
 * Address model 
 */
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

/**
 * Company model
 */
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/**
 * User model 
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
