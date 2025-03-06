import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loader } from '../../components/feedback/Loader';
import { RegisterFormData } from './types';
import * as S from './styles';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não conferem');
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        localStorage.setItem('user', JSON.stringify({ 
          name: formData.name, 
          email: formData.email 
        }));
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
            Criar Conta
          </h1>
          
          <Input 
            type="text"
            name="name" 
            placeholder="Nome completo" 
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          
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
          
          <Input 
            type="password"
            name="confirmPassword" 
            placeholder="Confirmar senha" 
            value={formData.confirmPassword}
            onChange={handleChange}
            error={error}
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
              {loading ? <Loader size="20px" centered={false} /> : 'Registrar'}
            </Button>
          </div>
          
          <S.Link onClick={() => navigate('/login')}>
            Já tem uma conta? Faça login
          </S.Link>
        </form>
      </Card>
    </Container>
  );
};

export default Register;