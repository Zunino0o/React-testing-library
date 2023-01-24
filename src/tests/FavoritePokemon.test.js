import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Teste o componente <FavoritePokemon.js />', () => {
  describe('Ao favoritar a partir da página de detalhes teste se:', () => {
    test('É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
      renderWithRouter(<FavoritePokemon />);

      const favPkms = screen.getByText(/no favorite pokémon found/i);

      expect(favPkms).toBeInTheDocument();
    });
    test('Apenas são exibidos os Pokémon favoritados', () => {
      renderWithRouter(<App />);

      const infoBtn = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(infoBtn);

      const favCheckbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado\?/i,
      });
      userEvent.click(favCheckbox);

      const favPkmBtn = screen.getByRole('link', {
        name: /favorite pokémon/i,
      });
      userEvent.click(favPkmBtn);

      const pikachu = screen.getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
    });
  });
});
