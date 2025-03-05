import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-primary: #f2f4f8; 
    --bg-secondary: #e8edf2; 
    --text-primary: #283B6B;
    --text-secondary: #5A6987;
    --accent: #F9A826;
    --accent-hover: #ffb84d;
    --card-bg: #ffffff; 
    --success: #34c759;
    --error: #ff3b30;
    --border-radius: 8px;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    --transition: all 0.3s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  
  button {
    cursor: pointer;
    font-family: 'Inter', 'Roboto', sans-serif;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem;
    width: 100%;
  }
`;