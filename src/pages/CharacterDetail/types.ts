export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  length: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
};

export type Vehicle = {
  name: string;
  model: string;
  manufacturer: string;
  vehicle_class: string;
  length: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
};

export type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  language: string;
};

export type Film = {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
};

export type Planet = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
};