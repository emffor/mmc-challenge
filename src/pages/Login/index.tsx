import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('user', JSON.stringify({ email }));
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <S.Input 
          type="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <S.Input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <S.Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </S.Button>
        <S.Link onClick={() => navigate('/register')}>
          Não tem uma conta? Registre-se
        </S.Link>
      </S.Form>
    </S.Container>
  );
};

export default Login;