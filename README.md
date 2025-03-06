# Star Wars Explorer - MCC Front-End Challenge

[Demo na Vercel](https://mmc-challenge.vercel.app/)

## Visão Geral

Uma aplicação web React desenvolvida como desafio técnico para a MCC (Minha Casa Construída). A aplicação oferece uma interface intuitiva e responsiva para explorar o universo Star Wars através da API pública SWAPI (Star Wars API). 

Este projeto demonstra habilidades em desenvolvimento front-end moderno, integrando diversas tecnologias como React, TypeScript, Redux, e Styled Components, com foco na experiência do usuário e organização de código.

## Tecnologias Principais

- **React 19**: Framework para construção da interface
- **TypeScript**: Tipagem estática para código mais seguro e manutenível
- **Vite 6.2.0**: Build tool para desenvolvimento rápido
- **Redux Toolkit 2.6.0**: Gerenciamento de estado global
- **Styled Components 6.1.15**: Estilização baseada em componentes
- **React Router 7.2.0**: Gerenciamento de rotas
- **Axios 1.8.1**: Cliente HTTP para requisições à API
- **React Query 5.67.1**: Gerenciamento de estado de servidor e caching

## Estrutura Detalhada do Projeto

```
src/
├── components/               # Componentes reutilizáveis
│   ├── feedback/            # Componentes para feedback (Loader)
│   ├── layout/              # Componentes de layout (Container, Grid)
│   └── ui/                  # Componentes de interface (Button, Card, Input, ThemeToggle)
├── context/                  # Context API
│   └── ThemeContext.tsx     # Gerenciamento do tema (claro/escuro)
├── hook/                     # Hooks personalizados
│   └── useTypedRedux.ts     # Hooks tipados para Redux
├── pages/                    # Páginas da aplicação
│   ├── CharacterDetail/     # Detalhes do personagem (index, types, styles)
│   ├── Home/                # Listagem de personagens (index, types, styles)
│   ├── Login/               # Página de login (index, types)
│   └── Register/            # Página de registro (index, types)
├── routes/                   # Configuração de rotas
│   └── index.tsx            # Definição de rotas protegidas e públicas
├── services/                 # Serviços de API
│   └── api.ts               # Configuração Axios e endpoints SWAPI
├── store/                    # Configuração Redux
│   ├── authSlice.ts         # Autenticação (login/logout)
│   ├── charactersSlice.ts   # Gerenciamento de personagens
│   ├── characterDetailSlice.ts # Detalhes do personagem
│   └── index.ts             # Configuração da store
└── styles/                   # Estilos globais
    ├── authStyles.ts        # Estilos compartilhados para login/registro
    └── global.ts            # Estilos globais e CSS variables
```

## Funcionalidades Detalhadas

### Sistema de Autenticação
- **Login e Registro**: Interface completa com validação de formulários
- **Persistência**: Simulação usando localStorage para manter sessão
- **Rotas Protegidas**: Acesso controlado às páginas com redirecionamento
- **Gerenciamento de Estado**: Uso do Redux para controle de autenticação

### Sistema de Temas
- **Temas Claro e Escuro**: Troca dinâmica de temas
- **Persistência de Preferência**: Salvo em localStorage
- **Variáveis CSS**: Design system com CSS variables para facilitar troca de temas
- **Toggle Customizado**: Componente interativo para troca de tema

### Consumo de API
- **Integração SWAPI**: Endpoints para buscar dados de Star Wars
- **Cache de Dados**: Implementação de caching para minimizar requisições
- **Manipulação de Erros**: Tratamento adequado de falhas na comunicação
- **Tipagem**: Interfaces TypeScript para todos os dados da API

### Paginação e Listagem
- **Paginação Controlada**: Navegação entre páginas de resultados
- **Estado de Loading**: Feedback visual durante carregamento
- **Dados Relacionados**: Carregamento de dados aninhados (planetas, veículos, etc)

### Componentes de UI
- **Arquitetura Escalável**: Componentes modulares e reutilizáveis
- **Estilização Avançada**: Styled Components com props dinâmicas
- **Sistema Responsivo**: Adaptação para diferentes tamanhos de tela
- **Interatividade**: Hover states, transições e animações

### Detalhes de Personagens
- **Visualização Completa**: Todos os dados disponíveis na API
- **Exibição Relacional**: Informações relacionadas (filmes, espécies, veículos)
- **Interação Expansível**: Cards expansíveis para mostrar detalhes
- **Navegação Contextual**: Botão de retorno para lista principal

## Implementação Técnica

### Gerenciamento de Estado
- **Redux Toolkit**: Store configurada com slices para diferentes domínios
- **Thunks Assíncronos**: Requisições à API através de createAsyncThunk
- **Estado Local**: useState para componentes isolados
- **Hooks Personalizados**: useAppDispatch e useAppSelector tipados

### Estilização
- **Design System**: Variáveis CSS para cores, espaçamentos e bordas
- **Responsividade**: Media queries e unidades relativas (rem, %)
- **Animações**: keyframes para transições suaves
- **Temas**: Alternância entre temas claro e escuro via data-theme

### Performance
- **Lazy Loading**: Carregamento sob demanda de componentes pesados
- **Caching**: Minimização de requisições repetidas à API
- **Memoização**: Otimização de re-renderizações
- **Estado de Loading**: Feedback visual durante carregamentos

### Acessibilidade
- **Semântica HTML**: Uso apropriado de elementos estruturais
- **Estados Focáveis**: Navigation via teclado
- **Contraste**: Cores acessíveis em ambos os temas
- **Feedback Visual**: Indicadores claros de interação

## Scripts Disponíveis

```bash
# Instalação de dependências
yarn install

# Desenvolvimento local em http://localhost:5173
yarn dev

# Build de produção
yarn build
```

## Decisões de Implementação

- **Axios vs Fetch**: Axios escolhido pela API mais robusta e tratamento de erros
- **Redux vs Context**: Redux para estado global complexo, Context apenas para tema
- **Styled Components**: Escolhido para encapsulamento de estilo e tematização
- **Paginação no Cliente**: Implementada por limitações da API SWAPI
- **TypeScript**: Uso extensivo de interfaces para modelar dados da API

## Roteamento e Navegação

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/character/:id" element={<CharacterDetail />} /> 
    <Route path="/" element={<Navigate to="/login" />} />
  </Routes>
</BrowserRouter>
```

## Dependências de Produção

- react-dom: ^19.0.0
- react-redux: ^9.2.0
- react-router-dom: ^7.2.0
- styled-components: ^6.1.15
- @reduxjs/toolkit: ^2.6.0
- @tanstack/react-query: ^5.67.1
- axios: ^1.8.1

## Autor

Eloan Ferreira