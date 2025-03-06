import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacters } from '../../services/api';
import * as S from './styles';
import { Character } from './types';

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
    <S.Container>
      <S.Header>
        <h1>Star Wars - Personagens</h1>
        <S.Button onClick={handleLogout}>
          Sair
        </S.Button>
      </S.Header>
      
      {loading ? (
        <S.Loader>
          <div className="spinner"></div>
        </S.Loader>
      ) : (
        <S.Grid>
          {characters.map((char, idx) => (
            <S.Card 
              key={idx} 
              onClick={() => navigate(`/character/${getCharacterId(char.url)}`)}
            >
              <h2>{char.name}</h2>
              <p><strong>Gênero:</strong> {char.gender}</p>
              <p><strong>Nascimento:</strong> {char.birth_year}</p>
            </S.Card>
          ))}
        </S.Grid>
      )}
      
      <S.Pagination>
        <S.Button 
          disabled={page === 1 || loading} 
          onClick={() => setPage(p => p - 1)}
        >
          Anterior
        </S.Button>
        <span>Página {page} de {totalPages}</span>
        <S.Button 
          disabled={page === totalPages || loading} 
          onClick={() => setPage(p => p + 1)}
        >
          Próxima
        </S.Button>
      </S.Pagination>
    </S.Container>
  );
};

export default Home;