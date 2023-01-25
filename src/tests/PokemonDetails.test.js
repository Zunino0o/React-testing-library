import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('should first', () => {
    renderWithRouter(<App />);

    const infoBtn = screen.queryByRole('link', { name: /more details/i });
    expect(infoBtn).toBeInTheDocument();

    userEvent.click(infoBtn);
    expect(infoBtn).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /game locations of pikachu/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    )).toBeInTheDocument();

    const pkmLoc = screen.getAllByAltText(/pikachu location/i);
    pkmLoc.forEach((loc, index) => {
      expect(loc.src).toBe(pokemonList[0].foundAt[index].map);
    });

    const favPkm = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favPkm).toBeInTheDocument();

    userEvent.click(favPkm);
    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(star).toBeInTheDocument();
    userEvent.click(favPkm);
    expect(star).not.toBeInTheDocument();
  });
});
