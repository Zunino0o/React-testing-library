import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const FAV_PKM = 'Favorite Pokémon';

describe('Teste o componente <App.js />', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeBtn = screen.getByRole('link', { name: 'Home' });
    // console.log(homeBtn);
    const aboutBtn = screen.getByRole('link', { name: 'About' });
    const favPkmBtn = screen.getByRole('link', { name: FAV_PKM });

    expect(homeBtn).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(favPkmBtn).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const homeBtn = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon' },
    );
    expect(homeTitle).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const aboutBtn = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex' },
    );
    expect(aboutTitle).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página de Favorite Pokémon, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const favPkmBtn = screen.getByRole('link', { name: FAV_PKM });
    userEvent.click(favPkmBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole(
      'heading',
      { name: FAV_PKM },
    );
    expect(favoriteTitle).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
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

  test('', () => {});
});
