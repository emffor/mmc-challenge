import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacter, getStarship } from '../../services/api';
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

const CharacterDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [filmTitles, setFilmTitles] = useState<{ [key: string]: string }>({});
    const [starships, setStarships] = useState<{ [key: string]: Starship }>({});
  
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
        
        const filmMap: { [key: string]: string } = {};
        
        data.films.forEach((filmUrl: string) => {
          const filmId = filmUrl.split('/').filter(Boolean).pop();
          filmMap[filmUrl] = `Episódio ${Number(filmId)}`;
        });
        
        setFilmTitles(filmMap);
        
        // Buscar detalhes das naves
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
              <p>{character.homeworld.split('/').filter(Boolean).pop() || 'Desconhecido'}</p>
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
          
          <S.FilmsList>
            <h2>Aparece em</h2>
            <ul>
              {character.films.map((film, index) => (
                <S.FilmItem key={index}>
                  {filmTitles[film] || `Filme ${index + 1}`}
                </S.FilmItem>
              ))}
            </ul>
          </S.FilmsList>
          
          {character.species.length > 0 && (
            <S.FilmsList>
              <h2>Espécies</h2>
              <ul>
                {character.species.map((species, index) => (
                  <S.FilmItem key={index}>
                    {species.split('/').filter(Boolean).pop() || `Espécie ${index + 1}`}
                  </S.FilmItem>
                ))}
              </ul>
            </S.FilmsList>
          )}
          
          {character.vehicles.length > 0 && (
            <S.FilmsList>
              <h2>Veículos</h2>
              <ul>
                {character.vehicles.map((vehicle, index) => (
                  <S.FilmItem key={index}>
                    {vehicle.split('/').filter(Boolean).pop() || `Veículo ${index + 1}`}
                  </S.FilmItem>
                ))}
              </ul>
            </S.FilmsList>
          )}
          
          {character.starships.length > 0 && (
            <S.FilmsList>
              <h2>Naves</h2>
              <ul>
                {character.starships.map((starshipUrl, index) => {
                  const starship = starships[starshipUrl];
                  return (
                    <S.FilmItem key={index} style={{ 
                      display: 'block',
                      width: '100%', 
                      padding: '1rem',
                      marginBottom: '0.5rem' 
                    }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        {starship ? starship.name : `Nave ${index + 1}`}
                      </h3>
                      {starship ? (
                        <div style={{ fontSize: '0.9rem' }}>
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