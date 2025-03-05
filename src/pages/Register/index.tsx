import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validação simples
    if (password !== confirmPassword) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }
    
    // Simulação de registro
    setTimeout(() => {
      if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email }));
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <h1>Criar Conta</h1>
        
        <S.Input 
          type="text" 
          placeholder="Nome completo" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
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
        
        <S.Input 
          type="password" 
          placeholder="Confirmar senha" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        {error && <p style={{ color: 'var(--error)', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>}
        
        <S.Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Registrar'}
        </S.Button>
        
        <S.Link onClick={() => navigate('/login')}>
          Já tem uma conta? Faça login
        </S.Link>
      </S.Form>
    </S.Container>
  );
};

export default Register;