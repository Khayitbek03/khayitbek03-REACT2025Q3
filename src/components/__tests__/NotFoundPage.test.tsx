/* eslint-disable import/no-unresolved */
/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../pages/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('renders the 404 message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByRole('heading', { name: /404 - page not found/i }),
    ).toBeInTheDocument();
  });
});
