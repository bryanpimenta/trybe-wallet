import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';
import App from '../../App';

describe('Testes para a página Wallet', () => {
  const initialEntries = ['/carteira'];
  const DEFAULT_EXEMPLE1 = {
    id: 0,
    value: '10',
    currency: 'USD',
    method: 'Cartão crédito',
    tag: 'Lazer',
    description: 'RTX 2060',
    exchangeRates: mockData,
  };
  const DEFAULT_EXEMPLE2 = {
    id: 1,
    value: '25',
    currency: 'USD',
    method: 'Cartão débito',
    tag: 'Lazer',
    description: 'Kaisa Chibi',
    exchangeRates: mockData,
  };

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Verificando o Header', () => {
    const initialState = {
      wallet: {
        expenses: [DEFAULT_EXEMPLE1, DEFAULT_EXEMPLE2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    expect(screen.getByTestId('total-field')).toHaveTextContent('166.36');
  });

  test('Verificar se os elementos da rota aparecem', () => {
    const initialState = { user: { email: 'buraia@teste.com' } };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });
    const btnAddExpense = screen.getByRole('button', { name: /adicionar despesa/i, });

    expect(screen.getByText(/buraia@teste\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();
    expect(screen.getByText("0.00")).toBeInTheDocument();
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('currency-input')).toBeInTheDocument();
    expect(screen.getByTestId('method-input')).toBeInTheDocument();
    expect(screen.getByTestId('tag-input')).toBeInTheDocument();

    expect(btnAddExpense).toBeInTheDocument();
  });

  test('Verifica o botao de editar', () => {
    const initialState = {
      wallet: {
        expenses: [DEFAULT_EXEMPLE1, DEFAULT_EXEMPLE2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
        editor: false,
        idToEdit: 0,
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnsEdit = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(btnsEdit[0]);

    const valueInput = screen.getByTestId('value-input');
    userEvent.type(valueInput, '0');

    expect(valueInput).toHaveValue('100');
    const btnFinishedEdit = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(btnFinishedEdit);
    
    expect(screen.getByTestId('total-field').innerHTML).toBe('594.14');
    expect(valueInput.innerHTML).toBe('');
  });

  test('Verifica o botao de deletar', () => {
    const initialState = {
      wallet: {
        expenses: [DEFAULT_EXEMPLE1, DEFAULT_EXEMPLE2],
        currencies: Object.keys(mockData).filter((currency) => currency !== 'USDT'),
      },
    };
    renderWithRouterAndRedux(<App />, { initialState, initialEntries });

    const btnsDelete = screen.getAllByRole('button', {
      name: /excluir/i,
    });
    
    userEvent.click(btnsDelete[0]);
    expect(screen.getByTestId('total-field').innerHTML).toBe('118.83');
  });

  test('Verificando se os inputs são limpos ao add despensa', () => {
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '25');
    userEvent.type(descriptionInput, 'Kaisa Chibi');
    userEvent.click(btnAddExpense);

    expect(valueInput.innerHTML).toBe('');
    expect(descriptionInput.innerHTML).toBe('');
  });
});