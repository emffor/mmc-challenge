import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacter, getStarship, getVehicle, getSpecies, getFilm, getPlanet } from '../../services/api';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/feedback/Loader';
import * as S from './styles';
import {
  Character,
  Starship,
  Vehicle,
  Species,
  Film,
  Planet
} from './types';

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
  const touchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverDelayTime = 300;
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || 
                          'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice);
      setIsSmallScreen(window.matchMedia('(max-width: 380px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCharacter();
  }, [id, navigate]);

  const handleMouseEnter = (
    itemUrl: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (isMobile) return;
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    hoverTimer.current = setTimeout(() => {
      setter(itemUrl);
    }, hoverDelayTime);
  };

  const handleMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (isMobile) return;
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setter(null);
  };

  const handleItemClick = (
    itemUrl: string,
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    currentState: string | null,
    event: React.MouseEvent
  ) => {
    const target = event.target as HTMLElement;
    const isCloseButton = target.classList.contains('close-btn');
    if (isCloseButton) {
      if (currentState === itemUrl) {
        setter(null);
      }
      event.stopPropagation();
    } else if (isMobile) {
      if (currentState !== itemUrl) {
        setter(itemUrl);
      }
    }
  };

  const handleCloseItem = (
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    event: React.MouseEvent
  ) => {
    setter(null);
    event.stopPropagation();
  };

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setLoadingAnimation(true);
      
      const data = await getCharacter(id || '1');
      setCharacter(data);
      const fetchPromises = [];
      if (data.starships.length > 0) {
        fetchPromises.push(
          Promise.all(
            data.starships.map(async (starshipUrl: string) => {
              const starshipId = starshipUrl.split('/').filter(Boolean).pop();
              if (starshipId) {
                try {
                  const starshipData = await getStarship(starshipId);
                  return { url: starshipUrl, data: starshipData };
                } catch (error) {
                  console.error(`Erro ao buscar detalhes da nave ${starshipId}:`, error);
                  return null;
                }
              }
              return null;
            })
          ).then((results) => {
            const starshipsData: { [key: string]: Starship } = {};
            results.filter(Boolean).forEach((item) => {
              if (item) {
                starshipsData[item.url] = item.data;
              }
            });
            setStarships(starshipsData);
          })
        );
      }
      if (data.vehicles.length > 0) {
        fetchPromises.push(
          Promise.all(
            data.vehicles.map(async (vehicleUrl: string) => {
              const vehicleId = vehicleUrl.split('/').filter(Boolean).pop();
              if (vehicleId) {
                try {
                  const vehicleData = await getVehicle(vehicleId);
                  return { url: vehicleUrl, data: vehicleData };
                } catch (error) {
                  console.error(`Erro ao buscar detalhes do veículo ${vehicleId}:`, error);
                  return null;
                }
              }
              return null;
            })
          ).then((results) => {
            const vehiclesData: { [key: string]: Vehicle } = {};
            results.filter(Boolean).forEach((item) => {
              if (item) {
                vehiclesData[item.url] = item.data;
              }
            });
            setVehicles(vehiclesData);
          })
        );
      }
      if (data.species.length > 0) {
        fetchPromises.push(
          Promise.all(
            data.species.map(async (speciesUrl: string) => {
              const speciesId = speciesUrl.split('/').filter(Boolean).pop();
              if (speciesId) {
                try {
                  const speciesData = await getSpecies(speciesId);
                  return { url: speciesUrl, data: speciesData };
                } catch (error) {
                  console.error(`Erro ao buscar detalhes da espécie ${speciesId}:`, error);
                  return null;
                }
              }
              return null;
            })
          ).then((results) => {
            const speciesData: { [key: string]: Species } = {};
            results.filter(Boolean).forEach((item) => {
              if (item) {
                speciesData[item.url] = item.data;
              }
            });
            setSpecies(speciesData);
          })
        );
      }
      if (data.films.length > 0) {
        fetchPromises.push(
          Promise.all(
            data.films.map(async (filmUrl: string) => {
              const filmId = filmUrl.split('/').filter(Boolean).pop();
              if (filmId) {
                try {
                  const filmData = await getFilm(filmId);
                  return { url: filmUrl, data: filmData };
                } catch (error) {
                  console.error(`Erro ao buscar detalhes do filme ${filmId}:`, error);
                  return null;
                }
              }
              return null;
            })
          ).then((results) => {
            const filmsData: { [key: string]: Film } = {};
            results.filter(Boolean).forEach((item) => {
              if (item) {
                filmsData[item.url] = item.data;
              }
            });
            setFilms(filmsData);
          })
        );
      }
      if (data.homeworld) {
        fetchPromises.push(
          (async () => {
            const planetId = data.homeworld.split('/').filter(Boolean).pop();
            if (planetId) {
              try {
                const planetData = await getPlanet(planetId);
                setHomeworld(planetData);
              } catch (error) {
                console.error(`Erro ao buscar detalhes do planeta ${planetId}:`, error);
              }
            }
          })()
        );
      }
      await Promise.allSettled(fetchPromises);
    } catch (error) {
      console.error('Erro ao buscar detalhes do personagem:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setLoadingAnimation(false);
      }, 300);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('pt-BR');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return dateString;
    }
  };

  useEffect(() => {
    return () => {
      if (touchTimer.current) clearTimeout(touchTimer.current);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <Container padding={isSmallScreen ? '0.75rem' : 'clamp(1rem, 4vw, 2rem)'}>
      {!loading && (
        <Button 
          onClick={() => navigate('/home')} 
          variant="outline" 
          size={isSmallScreen ? 'small' : 'medium'}
          style={{ marginBottom: 'clamp(1.5rem, 4vw, 2rem)' }}
        >
          ← Voltar para lista
        </Button>
      )}
      
      {loading ? (
        <S.LoaderWrapper>
          <Loader text="Carregando detalhes do personagem..." />
        </S.LoaderWrapper>
      ) : character ? (
        <S.CharacterCardWrapper $isLoading={loadingAnimation}>
          <Card padding={isSmallScreen ? '1rem 0.75rem' : 'clamp(1.25rem, 5vw, 2.5rem)'}>
            <h1>{character.name}</h1>
            <S.InfoGrid $isSmallScreen={isSmallScreen}>
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
              <S.InfoItem $fullWidth={isSmallScreen}>
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
              <S.FilmsList $isSmallScreen={isSmallScreen}>
                <h2>Filmes</h2>
                <ul>
                  {character.films.map((filmUrl, index) => {
                    const film = films[filmUrl];
                    const isExpanded = hoveredFilm === filmUrl;
                    return (
                      <S.FilmItem
                        key={index}
                        $expanded={isExpanded}
                        $isSmallScreen={isSmallScreen}
                        onMouseEnter={() => handleMouseEnter(filmUrl, setHoveredFilm)}
                        onMouseLeave={() => handleMouseLeave(setHoveredFilm)}
                        onClick={(e) => handleItemClick(filmUrl, setHoveredFilm, hoveredFilm, e)}
                        aria-expanded={isExpanded}
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
                                <p><strong>Texto de abertura:</strong> {film.opening_crawl.substring(0, isSmallScreen ? 70 : 100)}...</p>
                              </div>
                            ) : (
                              <p>Carregando detalhes...</p>
                            )}
                          </div>
                        )}
                        <S.CloseButton 
                          className="close-btn"
                          $isExpanded={isExpanded}
                          $isSmallScreen={isSmallScreen}
                          onClick={(e) => isExpanded && handleCloseItem(setHoveredFilm, e)}
                          aria-label="Fechar detalhes"
                        />
                      </S.FilmItem>
                    );
                  })}
                </ul>
              </S.FilmsList>
            )}
          
            {character.species.length > 0 && (
              <S.FilmsList $isSmallScreen={isSmallScreen}>
                <h2>Espécies</h2>
                <ul>
                  {character.species.map((speciesUrl, index) => {
                    const speciesItem = species[speciesUrl];
                    const isExpanded = hoveredSpecies === speciesUrl;
                    return (
                      <S.FilmItem
                        key={index}
                        $expanded={isExpanded}
                        $isSmallScreen={isSmallScreen}
                        onMouseEnter={() => handleMouseEnter(speciesUrl, setHoveredSpecies)}
                        onMouseLeave={() => handleMouseLeave(setHoveredSpecies)}
                        onClick={(e) => handleItemClick(speciesUrl, setHoveredSpecies, hoveredSpecies, e)}
                        aria-expanded={isExpanded}
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
                        <S.CloseButton 
                          className="close-btn"
                          $isExpanded={isExpanded}
                          $isSmallScreen={isSmallScreen}
                          onClick={(e) => isExpanded && handleCloseItem(setHoveredSpecies, e)}
                          aria-label="Fechar detalhes"
                        />
                      </S.FilmItem>
                    );
                  })}
                </ul>
              </S.FilmsList>
            )}
          
            {character.vehicles.length > 0 && (
              <S.FilmsList $isSmallScreen={isSmallScreen}>
                <h2>Veículos</h2>
                <ul>
                  {character.vehicles.map((vehicleUrl, index) => {
                    const vehicle = vehicles[vehicleUrl];
                    const isExpanded = hoveredVehicle === vehicleUrl;
                    return (
                      <S.FilmItem
                        key={index}
                        $expanded={isExpanded}
                        $isSmallScreen={isSmallScreen}
                        onMouseEnter={() => handleMouseEnter(vehicleUrl, setHoveredVehicle)}
                        onMouseLeave={() => handleMouseLeave(setHoveredVehicle)}
                        onClick={(e) => handleItemClick(vehicleUrl, setHoveredVehicle, hoveredVehicle, e)}
                        aria-expanded={isExpanded}
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
                        <S.CloseButton 
                          className="close-btn"
                          $isExpanded={isExpanded}
                          $isSmallScreen={isSmallScreen}
                          onClick={(e) => isExpanded && handleCloseItem(setHoveredVehicle, e)}
                          aria-label="Fechar detalhes"
                        />
                      </S.FilmItem>
                    );
                  })}
                </ul>
              </S.FilmsList>
            )}
          
            {character.starships.length > 0 && (
              <S.FilmsList $isSmallScreen={isSmallScreen}>
                <h2>Naves</h2>
                <ul>
                  {character.starships.map((starshipUrl, index) => {
                    const starship = starships[starshipUrl];
                    const isExpanded = hoveredStarship === starshipUrl;
                    return (
                      <S.FilmItem
                        key={index}
                        $expanded={isExpanded}
                        $isSmallScreen={isSmallScreen}
                        onMouseEnter={() => handleMouseEnter(starshipUrl, setHoveredStarship)}
                        onMouseLeave={() => handleMouseLeave(setHoveredStarship)}
                        onClick={(e) => handleItemClick(starshipUrl, setHoveredStarship, hoveredStarship, e)}
                        aria-expanded={isExpanded}
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
                        <S.CloseButton 
                          className="close-btn"
                          $isExpanded={isExpanded}
                          $isSmallScreen={isSmallScreen}
                          onClick={(e) => isExpanded && handleCloseItem(setHoveredStarship, e)}
                          aria-label="Fechar detalhes"
                        />
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
          </Card>
        </S.CharacterCardWrapper>
      ) : (
        <p>Personagem não encontrado.</p>
      )}
    </Container>
  );
};

export default CharacterDetail;