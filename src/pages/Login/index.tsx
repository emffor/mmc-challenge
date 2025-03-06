import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/feedback/Loader';
import { LoginFormData } from './types';
import * as S from './styles';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        navigate('/home');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Container centerContent padding="2rem">
      <Card padding="2.5rem" style={{ maxWidth: '450px', width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ 
            marginBottom: '2rem', 
            fontSize: '2rem', 
            fontWeight: 600, 
            color: 'var(--text-primary)', 
            textAlign: 'center' 
          }}>
            Login
          </h1>
          
          <Input
            type="email"
            name="email"
            placeholder="E-mail" 
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <Input 
            type="password"
            name="password" 
            placeholder="Senha" 
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />
          
          <div style={{ marginTop: '1.5rem' }}>
            <Button 
              type="submit" 
              disabled={loading}
              size="large"
              fullWidth
            >
              {loading ? <Loader size="20px" centered={false} /> : 'Entrar'}
            </Button>
          </div>
          
          <S.Link onClick={() => navigate('/register')}>
            Não tem uma conta? Registre-se
          </S.Link>
        </form>
      </Card>
    </Container>
  );
};

export default Login;