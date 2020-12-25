import React from 'react';
import { render, screen } from '@testing-library/react';
import Editor from './components/Editor';

test('renders print button', () => {
  render(<Editor />);
  const linkElement = screen.getByText(/print/i);
  expect(linkElement).toBeInTheDocument();
});
