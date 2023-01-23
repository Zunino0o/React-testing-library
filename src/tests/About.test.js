import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
//   test('A página contém as informações sobre a Pokédex', () => {
//     renderWithRouter(<About />);
//   });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const texts = ['This application simulates a Pokédex, a digital encyclopedia containing all Pokémon', 'One can filter Pokémon by type, and see more details for each one of them'];
    // console.log(texts);
    texts.forEach((frase) => {
      expect(screen.getByText(frase)).toBeInTheDocument();
    });
  });

  test('A página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    const { src } = screen.getByRole('img', {
      name: /pokédex/i,
    });

    const result = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(src).toBe(result);
  });
});
