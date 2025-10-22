import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Meet Your Real Neighbors/i);
  expect(headingElement).toBeInTheDocument();
});
