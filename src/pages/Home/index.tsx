import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacters } from '../../services/api';
import { Character } from './types';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { Grid } from '../../components/layout/Grid';
import * as S from './styles';

const isValidValue = (value: string): boolean => {
  return !!value && !['unknown', 'n/a', 'none', 'undefined', 'null'].includes(value.toLowerCase());
};

const Home = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCharacters();
  }, [page, navigate]);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data = await getCharacters(page);
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterId = (url: string) => {
    const matches = url.match(/\/people\/(\d+)/);
    return matches ? matches[1] : '1';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getGenderBadgeColor = (gender: string) => {
    switch(gender.toLowerCase()) {
      case 'male': return '#4B7BEC';
      case 'female': return '#FF6B81';
      default: return '#A5B1C2';
    }
  };

  const calculateStatPercentage = (value: string, max: number) => {
    const num = parseInt(value);
    return isNaN(num) ? 0 : Math.min(100, (num / max) * 100);
  };

  const getFilmNumber = (filmUrl: string) => {
    const filmId = parseInt(filmUrl.split('/').filter(Boolean).pop() || '0');
    return filmId;
  };

  return (
    <Container>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
        }}
      >
        <h1>Star Wars - Personagens</h1>
        <Button onClick={handleLogout}>Sair</Button>
      </header>

      {loading ? (
        <Loader />
      ) : (
        <Grid>
          {characters.map((char, idx) => (
            <S.CharacterCard
              key={idx}
              onClick={() => navigate(`/character/${getCharacterId(char.url)}`)}
              hoverable={true}
            >
              <S.CardHeader>
                <S.CharacterName>{char.name}</S.CharacterName>
                {isValidValue(char.birth_year) && <S.BirthYear>{char.birth_year}</S.BirthYear>}
              </S.CardHeader>
              
              {isValidValue(char.height) && (
                <S.AttributeRow>
                  <S.AttributeLabel>Altura:</S.AttributeLabel>
                  <S.StatusBar width={calculateStatPercentage(char.height, 250)} />
                  <S.AttributeValue>{char.height} cm</S.AttributeValue>
                </S.AttributeRow>
              )}
              
              {isValidValue(char.mass) && (
                <S.AttributeRow>
                  <S.AttributeLabel>Peso:</S.AttributeLabel>
                  <S.StatusBar width={calculateStatPercentage(char.mass, 150)} color="#4BC0C0" />
                  <S.AttributeValue>{char.mass} kg</S.AttributeValue>
                </S.AttributeRow>
              )}
              
              {(isValidValue(char.eye_color) || isValidValue(char.hair_color)) && <S.Divider />}
              
              {isValidValue(char.eye_color) && (
                <S.AttributeRow>
                  <S.AttributeLabel>Olhos:</S.AttributeLabel>
                  <S.AttributeValue>{char.eye_color}</S.AttributeValue>
                </S.AttributeRow>
              )}
              
              {isValidValue(char.hair_color) && (
                <S.AttributeRow>
                  <S.AttributeLabel>Cabelo:</S.AttributeLabel>
                  <S.AttributeValue>{char.hair_color}</S.AttributeValue>
                </S.AttributeRow>
              )}
              
              <S.Divider />
              
              <S.Footer>
                {isValidValue(char.gender) && (
                  <S.Badge color={getGenderBadgeColor(char.gender)}>
                    {char.gender}
                  </S.Badge>
                )}
                
                {char.films && char.films.length > 0 && (
                  <S.FilmBadges>
                    {char.films.map((film, index) => (
                      <S.FilmBadge 
                        key={index} 
                        filmId={getFilmNumber(film)} 
                        title={`Episódio ${getFilmNumber(film)}`}
                      >
                        {getFilmNumber(film)}
                      </S.FilmBadge>
                    ))}
                  </S.FilmBadges>
                )}
              </S.Footer>
            </S.CharacterCard>
          ))}
        </Grid>
      )}

      <S.Pagination>
        <Button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          variant="outline"
        >
          Anterior
        </Button>
        <span>Página {page} de {totalPages}</span>
        <Button
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </S.Pagination>
    </Container>
  );
};

export default Home;