import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ITPM Task Manager navbar', () => {
  render(<App />);
  const navBrand = screen.getByText(/ITPM Task Manager/i);
  expect(navBrand).toBeInTheDocument();
});
