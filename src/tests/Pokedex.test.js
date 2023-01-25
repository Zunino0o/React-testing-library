import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemonList from '../data';

// const typesArr = pokemonList.map((pkm) => pkm.type);

describe('Teste o componente <Pokedex.js />', () => {
  test('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextBtn).toBeInTheDocument();
  });

  test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão & O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    const pika = screen.queryByText(/pikachu/i);
    expect(pika.textContent).toBe(pokemonList[0].name);
    expect(pika).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let index = 1; index < pokemonList.length; index += 1) {
      userEvent.click(nextBtn);
      const { name } = pokemonList[index];
      const pkm = screen.getByText(name);
      const prevPkm = screen.queryByText(pokemonList[index - 1].name);
      // console.log(pkm.textContent, name, index);
      expect(pkm.textContent).toBe(name);
      expect(pkm).toBeInTheDocument();
      expect(prevPkm).not.toBeInTheDocument();
      // console.log(prvPkmName.name, name);
      if (index === pokemonList.length - 1) {
        userEvent.click(nextBtn);
        //   console.log(pkm.textContent, name);
        expect(pika.textContent).toBe(pokemonList[0].name);
        expect(pika).toBeInTheDocument();
      }
    }
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    // console.log(typesArr);
    renderWithRouter(<App />);
    const TypeButtons = screen.getAllByTestId('pokemon-type-button');
    // console.log(button.length);
    TypeButtons.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);
    const TypeButtons = screen.getAllByTestId('pokemon-type-button');
    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    TypeButtons.forEach((btn) => {
      userEvent.click(btn);
      const typeName = btn.innerHTML;
      // console.log(typeName);
      const pkmByType = pokemonList.filter((pkm) => pkm.type === typeName);
      // console.log(pkmByType.length);

      pkmByType.forEach(() => {
        const pkmType = screen.getByTestId('pokemon-type').innerHTML;
        // console.log(pkm.name, pkmType);
        expect(pkmType).toBe(typeName);
        userEvent.click(nextBtn);
      });
    });
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    expect(allBtn).toBeInTheDocument();
  });

  test('O texto do botão deve ser All & deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(allBtn.innerHTML).toBe('All');

    userEvent.click(allBtn);

    pokemonList.forEach((pkm) => {
      const { name } = pkm;
      const pkmCard = screen.getByText(name);
      expect(pkmCard).toBeInTheDocument();
      userEvent.click(nextBtn);
    });
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {});
});
