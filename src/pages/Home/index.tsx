import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacters } from '../../services/api';
import { Character } from './types';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/feedback/Loader';
import { Grid } from '../../components/layout/Grid';
import { Card } from '../../components/ui/Card';

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
            <Card
              key={idx}
              onClick={() => navigate(`/character/${getCharacterId(char.url)}`)}
              hoverable={true}
            >
              <h2>{char.name}</h2>
              <p>
                <strong>Gênero:</strong> {char.gender}
              </p>
              <p>
                <strong>Nascimento:</strong> {char.birth_year}
              </p>
            </Card>
          ))}
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