import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(title).toBeInTheDocument();
  });

  describe('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    test('O botão deve conter o texto Próximo Pokémon', () => {
      renderWithRouter(<App />);

      const nextBtn = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(nextBtn.textContent).toBe('Próximo Pokémon');
    });

    test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão & O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
      renderWithRouter(<App />);

      const allBtn = screen.getByRole('button', {
        name: /all/i,
      });
      userEvent.click(allBtn);
      const pika = screen.getByText(/pikachu/i);
      expect(pika.textContent).toBe(pokemonList[0].name);

      const nextBtn = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      for (let index = 1; index < pokemonList.length; index += 1) {
        userEvent.click(nextBtn);
        const { name } = pokemonList[index];
        const pkm = screen.getByText(name);
        // console.log(pkm.textContent, name, index);
        expect(pkm.textContent).toBe(name);
        if (index === pokemonList.length - 1) {
          userEvent.click(nextBtn);
          //   console.log(pkm.textContent, name);
          expect(pika.textContent).toBe(pokemonList[0].name);
        }
      }
    });
  });

  test('é mostrado apenas um Pokémon por vez', () => {});

  describe('A Pokédex tem os botões de filtro', () => {
    test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {});

    test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {});

    test('O texto do botão deve corresponder ao nome do tipo', () => {});

    test('O botão All precisa estar sempre visível', () => {});
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {});

    test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {});

    test('Ao carregar a página, o filtro selecionado deverá ser All', () => {});
  });
});
