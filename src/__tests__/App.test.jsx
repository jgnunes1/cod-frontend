import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders App component', () => {
  render(<App />);

  // Verifica se o cabeçalho está sendo renderizado
  expect(screen.getByText('Cabeçalho')).toBeInTheDocument();

  // Verifica se o rodapé está sendo renderizado
  expect(screen.getByText('Rodapé')).toBeInTheDocument();

  // Verifica se as rotas estão funcionando corretamente
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Estudo')).toBeInTheDocument();
  expect(screen.getByText('Pessoas')).toBeInTheDocument();
  expect(screen.getByText('Cursos')).toBeInTheDocument();
  expect(screen.getByText('Json')).toBeInTheDocument();
  expect(screen.getByText('Sobre')).toBeInTheDocument();
});

// Você pode adicionar mais testes para verificar o comportamento das rotas,
// por exemplo, testar se a rota "/login" redireciona para a página de login correta, etc.
