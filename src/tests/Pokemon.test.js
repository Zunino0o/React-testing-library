import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe(' Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    pokemonList.forEach((pkm) => {
      expect(screen.queryByTestId('pokemon-name').innerHTML).toBe(pkm.name);
      expect(screen.queryByTestId('pokemon-type').innerHTML).toBe(pkm.type);
      expect(screen.queryByTestId('pokemon-weight').innerHTML).toBe(`Average weight: ${pkm.averageWeight.value} ${pkm.averageWeight.measurementUnit}`);
      expect(screen.getByAltText(`${pkm.name} sprite`).src).toBe(pkm.image);

      userEvent.click(nextBtn);
    });
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido & e existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const infoBtn = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(infoBtn).toBeInTheDocument();
    userEvent.click(infoBtn);
    expect(history.location.pathname).toBe('/pokemon/25');

    const favBtn = screen.getByText('Pokémon favoritado?');
    userEvent.click(favBtn);

    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });

    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
