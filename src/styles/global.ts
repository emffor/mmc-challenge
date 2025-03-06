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
    --container-padding-mobile: 0.75rem;
    --container-padding-tablet: 1.25rem;
    --container-padding-desktop: 2rem;
  }

  [data-theme='dark'] {
    --bg-primary: #121212; 
    --bg-secondary: #1e1e1e; 
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --accent: #F9A826;
    --accent-hover: #ffb84d;
    --card-bg: #1e1e1e; 
    --success: #34c759;
    --error: #ff3b30;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }
  
  button {
    cursor: pointer;
    font-family: 'Inter', 'Roboto', sans-serif;
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    padding: var(--container-padding-desktop);
    
    @media (max-width: 768px) {
      padding: var(--container-padding-tablet);
    }
    
    @media (max-width: 480px) {
      padding: var(--container-padding-mobile);
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  a:focus, button:focus, input:focus, select:focus, textarea:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--text-secondary);
    border-radius: 3px;
    opacity: 0.5;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }
`;