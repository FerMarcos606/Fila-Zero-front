import { render, screen } from '@testing-library/react';
import App from './App';

test('muestra el nombre de la app', () => {
  render(<App />);
  expect(screen.getByText(/fila-zero/i)).toBeInTheDocument();
});
