import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/paginaInexistente');
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/paginaInexistente');
    });

    const notFoundImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
