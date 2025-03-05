import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacter, getStarship, getVehicle, getSpecies, getFilm, getPlanet } from '../../services/api';
import * as S from './styles';

type Character = {
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

type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  starship_class: string;
  url: string;
};

type Vehicle = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

const CharacterDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [starships, setStarships] = useState<{ [key: string]: Starship }>({});
  const [vehicles, setVehicles] = useState<{ [key: string]: Vehicle }>({});
  const [species, setSpecies] = useState<{ [key: string]: Species }>({});
  const [films, setFilms] = useState<{ [key: string]: Film }>({});
  const [homeworld, setHomeworld] = useState<Planet | null>(null);

  const [hoveredFilm, setHoveredFilm] = useState<string | null>(null);
  const [hoveredSpecies, setHoveredSpecies] = useState<string | null>(null);
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);
  const [hoveredStarship, setHoveredStarship] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCharacter();
  }, [id, navigate]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const data = await getCharacter(id || '1');
      setCharacter(data);

      const starshipsData: { [key: string]: Starship } = {};
      for (const starshipUrl of data.starships) {
        const starshipId = starshipUrl.split('/').filter(Boolean).pop();
        if (starshipId) {
          try {
            const starshipData = await getStarship(starshipId);
            starshipsData[starshipUrl] = starshipData;
          } catch (error) {
            console.error(`Erro ao buscar detalhes da nave ${starshipId}:`, error);
          }
        }
      }
      setStarships(starshipsData);

      const vehiclesData: { [key: string]: Vehicle } = {};
      for (const vehicleUrl of data.vehicles) {
        const vehicleId = vehicleUrl.split('/').filter(Boolean).pop();
        if (vehicleId) {
          try {
            const vehicleData = await getVehicle(vehicleId);
            vehiclesData[vehicleUrl] = vehicleData;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do veículo ${vehicleId}:`, error);
          }
        }
      }
      setVehicles(vehiclesData);

      const speciesData: { [key: string]: Species } = {};
      for (const speciesUrl of data.species) {
        const speciesId = speciesUrl.split('/').filter(Boolean).pop();
        if (speciesId) {
          try {
            const speciesDataItem = await getSpecies(speciesId);
            speciesData[speciesUrl] = speciesDataItem;
          } catch (error) {
            console.error(`Erro ao buscar detalhes da espécie ${speciesId}:`, error);
          }
        }
      }
      setSpecies(speciesData);

      const filmsData: { [key: string]: Film } = {};
      for (const filmUrl of data.films) {
        const filmId = filmUrl.split('/').filter(Boolean).pop();
        if (filmId) {
          try {
            const filmData = await getFilm(filmId);
            filmsData[filmUrl] = filmData;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do filme ${filmId}:`, error);
          }
        }
      }
      setFilms(filmsData);

      if (data.homeworld) {
        const planetId = data.homeworld.split('/').filter(Boolean).pop();
        if (planetId) {
          try {
            const planetData = await getPlanet(planetId);
            setHomeworld(planetData);
          } catch (error) {
            console.error(`Erro ao buscar detalhes do planeta ${planetId}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do personagem:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate('/home')}>
        ← Voltar para lista
      </S.BackButton>

      {loading ? (
        <S.Loader>
          <div className="spinner"></div>
        </S.Loader>
      ) : character ? (
        <S.Card>
          <h1>{character.name}</h1>

          <S.InfoGrid>
            <S.InfoItem>
              <h3>Altura</h3>
              <p>{character.height} cm</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Peso</h3>
              <p>{character.mass} kg</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Cor do cabelo</h3>
              <p>{character.hair_color}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Cor da pele</h3>
              <p>{character.skin_color}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Cor dos olhos</h3>
              <p>{character.eye_color}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Nascimento</h3>
              <p>{character.birth_year}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Gênero</h3>
              <p>{character.gender}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Planeta Natal</h3>
              {homeworld ? (
                <div>
                  <p><strong>Nome:</strong> {homeworld.name}</p>
                  <p><strong>Clima:</strong> {homeworld.climate}</p>
                  <p><strong>Terreno:</strong> {homeworld.terrain}</p>
                  <p><strong>População:</strong> {homeworld.population}</p>
                  <p><strong>Diâmetro:</strong> {homeworld.diameter} km</p>
                </div>
              ) : (
                <p>Carregando detalhes...</p>
              )}
            </S.InfoItem>
            <S.InfoItem>
              <h3>Data de Criação</h3>
              <p>{formatDate(character.created)}</p>
            </S.InfoItem>
            <S.InfoItem>
              <h3>Última Edição</h3>
              <p>{formatDate(character.edited)}</p>
            </S.InfoItem>
          </S.InfoGrid>

          {character.films.length > 0 && (
            <S.FilmsList>
              <h2>Filmes</h2>
              <ul>
                {character.films.map((filmUrl, index) => {
                  const film = films[filmUrl];
                  const isExpanded = hoveredFilm === filmUrl;
                  return (
                    <S.FilmItem
                      key={index}
                      $expanded={isExpanded}
                      onMouseEnter={() => setHoveredFilm(filmUrl)}
                      onMouseLeave={() => setHoveredFilm(null)}
                    >
                      <h3>{film ? film.title : `Filme ${index + 1}`}</h3>
                      {isExpanded && (
                        <div className="details">
                          {film ? (
                            <div>
                              <p><strong>Episódio:</strong> {film.episode_id}</p>
                              <p><strong>Diretor:</strong> {film.director}</p>
                              <p><strong>Produtor:</strong> {film.producer}</p>
                              <p><strong>Data de lançamento:</strong> {formatDate(film.release_date)}</p>
                              <p><strong>Texto de abertura:</strong> {film.opening_crawl.substring(0, 100)}...</p>
                            </div>
                          ) : (
                            <p>Carregando detalhes...</p>
                          )}
                        </div>
                      )}
                    </S.FilmItem>
                  );
                })}
              </ul>
            </S.FilmsList>
          )}

          {character.species.length > 0 && (
            <S.FilmsList>
              <h2>Espécies</h2>
              <ul>
                {character.species.map((speciesUrl, index) => {
                  const speciesItem = species[speciesUrl];
                  const isExpanded = hoveredSpecies === speciesUrl;
                  return (
                    <S.FilmItem
                      key={index}
                      $expanded={isExpanded}
                      onMouseEnter={() => setHoveredSpecies(speciesUrl)}
                      onMouseLeave={() => setHoveredSpecies(null)}
                    >
                      <h3>{speciesItem ? speciesItem.name : `Espécie ${index + 1}`}</h3>
                      {isExpanded && (
                        <div className="details">
                          {speciesItem ? (
                            <div>
                              <p><strong>Classificação:</strong> {speciesItem.classification}</p>
                              <p><strong>Designação:</strong> {speciesItem.designation}</p>
                              <p><strong>Altura média:</strong> {speciesItem.average_height} cm</p>
                              <p><strong>Vida média:</strong> {speciesItem.average_lifespan} anos</p>
                              <p><strong>Linguagem:</strong> {speciesItem.language}</p>
                            </div>
                          ) : (
                            <p>Carregando detalhes...</p>
                          )}
                        </div>
                      )}
                    </S.FilmItem>
                  );
                })}
              </ul>
            </S.FilmsList>
          )}

          {character.vehicles.length > 0 && (
            <S.FilmsList>
              <h2>Veículos</h2>
              <ul>
                {character.vehicles.map((vehicleUrl, index) => {
                  const vehicle = vehicles[vehicleUrl];
                  const isExpanded = hoveredVehicle === vehicleUrl;
                  return (
                    <S.FilmItem
                      key={index}
                      $expanded={isExpanded}
                      onMouseEnter={() => setHoveredVehicle(vehicleUrl)}
                      onMouseLeave={() => setHoveredVehicle(null)}
                    >
                      <h3>{vehicle ? vehicle.name : `Veículo ${index + 1}`}</h3>
                      {isExpanded && (
                        <div className="details">
                          {vehicle ? (
                            <div>
                              <p><strong>Modelo:</strong> {vehicle.model}</p>
                              <p><strong>Fabricante:</strong> {vehicle.manufacturer}</p>
                              <p><strong>Classe:</strong> {vehicle.vehicle_class}</p>
                              <p><strong>Comprimento:</strong> {vehicle.length} m</p>
                              <p><strong>Velocidade máxima:</strong> {vehicle.max_atmosphering_speed}</p>
                              <p><strong>Capacidade de carga:</strong> {vehicle.cargo_capacity}</p>
                            </div>
                          ) : (
                            <p>Carregando detalhes...</p>
                          )}
                        </div>
                      )}
                    </S.FilmItem>
                  );
                })}
              </ul>
            </S.FilmsList>
          )}

          {character.starships.length > 0 && (
            <S.FilmsList>
              <h2>Naves</h2>
              <ul>
                {character.starships.map((starshipUrl, index) => {
                  const starship = starships[starshipUrl];
                  const isExpanded = hoveredStarship === starshipUrl;
                  return (
                    <S.FilmItem
                      key={index}
                      $expanded={isExpanded}
                      onMouseEnter={() => setHoveredStarship(starshipUrl)}
                      onMouseLeave={() => setHoveredStarship(null)}
                    >
                      <h3>{starship ? starship.name : `Nave ${index + 1}`}</h3>
                      {isExpanded && (
                        <div className="details">
                          {starship ? (
                            <div>
                              <p><strong>Modelo:</strong> {starship.model}</p>
                              <p><strong>Fabricante:</strong> {starship.manufacturer}</p>
                              <p><strong>Classe:</strong> {starship.starship_class}</p>
                              <p><strong>Comprimento:</strong> {starship.length} m</p>
                              <p><strong>Velocidade máxima:</strong> {starship.max_atmosphering_speed}</p>
                              <p><strong>Hyperdrive:</strong> {starship.hyperdrive_rating}</p>
                            </div>
                          ) : (
                            <p>Carregando detalhes...</p>
                          )}
                        </div>
                      )}
                    </S.FilmItem>
                  );
                })}
              </ul>
            </S.FilmsList>
          )}

          <S.InfoItem style={{ marginTop: '1.5rem' }}>
            <h3>URL na API</h3>
            <p style={{ fontSize: '0.9rem', wordBreak: 'break-all' }}>{character.url}</p>
          </S.InfoItem>
        </S.Card>
      ) : (
        <p>Personagem não encontrado.</p>
      )}
    </S.Container>
  );
};

export default CharacterDetail;