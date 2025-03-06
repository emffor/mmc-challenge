import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacters } from '../../services/api';
import { Character } from './types';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/ui/Card';
import { colorMap } from '../../utils/color-map';

const getColorFromString = (str: string, defaultColor = '#999999') => {
  if (!str || str === 'n/a' || str === 'none' || str === 'unknown') {
    return defaultColor;
  }
  
  const firstColor = str.split(',')[0].trim().toLowerCase();
  
  return colorMap[firstColor] || defaultColor;
};

const getCharacterSymbol = (character: Character) => {
  if (character.name.includes('Darth') || character.name.includes('Emperor')) {
    return '⚡'; 
  }
  
  if (character.name.includes('Skywalker') || character.name.includes('Kenobi') || character.name.includes('Yoda')) {
    return '✨'; 
  }
  
  if (character.name.startsWith('R') && character.name.includes('-') || 
      character.name.startsWith('C-')) {
    return '🤖'; 
  }
  
  if (character.gender === 'female') {
    return '♀️';
  }
  
  if (character.gender === 'male') {
    return '♂️';
  }
  
  return '👽';
};

const getForceSide = (character: Character) => {
  if (character.name.includes('Darth') || character.name.includes('Emperor') || 
      character.name.includes('Maul') || character.name.includes('Grievous')) {
    return 'dark';
  }
  
  if (character.name.includes('Skywalker') || character.name.includes('Kenobi') || 
      character.name.includes('Yoda') || character.name.includes('Windu') || 
      character.name.includes('Organa')) {
    return 'light';
  }
  
  return 'neutral';
};

const StatBar = ({ label, value, maxValue }: { label: string; value: string; maxValue: number }) => {
  const numValue = parseInt(value);
  const percentage = isNaN(numValue) ? 0 : Math.min(100, (numValue / maxValue) * 100);
  
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={{ 
        height: '4px', 
        background: '#e0e0e0', 
        borderRadius: '2px', 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          width: `${percentage}%`, 
          height: '100%', 
          background: 'var(--accent)', 
          borderRadius: '2px' 
        }} />
      </div>
    </div>
  );
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

  const renderFilmBadges = (films: string[]) => {
    return (
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        flexWrap: 'wrap', 
        marginTop: '8px' 
      }}>
        {films.map((film, index) => {
          const episodeId = parseInt(film.split('/').filter(Boolean).pop() || '0');
          return (
            <div key={index} style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              background: `hsl(${episodeId * 40}, 70%, 60%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {episodeId}
            </div>
          );
        })}
      </div>
    );
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
          {characters.map((char, idx) => {
            const forceSide = getForceSide(char);
            const cardGradient = forceSide === 'dark' 
              ? 'linear-gradient(135deg, #300, #700)' 
              : forceSide === 'light'
                ? 'linear-gradient(135deg, #359, #67b)' 
                : 'linear-gradient(135deg, #444, #666)';
            
            const borderColor = forceSide === 'dark' 
              ? '#f00' 
              : forceSide === 'light' 
                ? '#2196f3' 
                : '#999';
            
            return (
              <Card
                key={idx}
                onClick={() => navigate(`/character/${getCharacterId(char.url)}`)}
                hoverable={true}
                style={{ 
                  borderTop: `3px solid ${borderColor}`,
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'relative',
                  background: cardGradient,
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                  margin: '-1.5rem -1.5rem 1rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '5rem',
                    opacity: '0.8',
                    color: 'white',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                  }}>
                    {getCharacterSymbol(char)}
                  </div>
                  
                  <div style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    padding: '4px 8px',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '0.7rem',
                    borderRadius: '4px'
                  }}>
                    {char.birth_year}
                  </div>
                </div>
                
                <h2 style={{ marginBottom: '1rem' }}>{char.name}</h2>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '4px', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    background: getColorFromString(char.eye_color),
                    border: '1px solid #ddd',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)'
                  }} title={`Cor dos olhos: ${char.eye_color}`} />
                  
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    background: getColorFromString(char.hair_color),
                    border: '1px solid #ddd',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)'
                  }} title={`Cor do cabelo: ${char.hair_color}`} />
                  
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    borderRadius: '50%', 
                    background: getColorFromString(char.skin_color),
                    border: '1px solid #ddd',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)'
                  }} title={`Cor da pele: ${char.skin_color}`} />
                </div>
                
                <StatBar label="Altura" value={`${char.height} cm`} maxValue={250} />
                <StatBar label="Peso" value={`${char.mass} kg`} maxValue={150} />
                
                <div style={{ 
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 10px', 
                    backgroundColor: 
                      char.gender === 'male' ? '#bbdefb' : 
                      char.gender === 'female' ? '#ffcdd2' : 
                      '#f5f5f5',
                    color: 
                      char.gender === 'male' ? '#1565c0' : 
                      char.gender === 'female' ? '#c62828' : 
                      '#424242',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {char.gender !== 'n/a' ? char.gender : 'droide'}
                  </span>
                  
                  {char.films && renderFilmBadges(char.films)}
                </div>
              </Card>
            );
          })}
        </Grid>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <Button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
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
      </div>
    </Container>
  );
};

export default Home;