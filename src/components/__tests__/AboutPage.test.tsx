/* eslint-disable import/no-unresolved */
/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import AboutPage from '../../pages/AboutPage';

describe('AboutPage Component', () => {
  it('renders the heading', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /about this app/i }),
    ).toBeInTheDocument();
  });

  it('displays the author name', () => {
    render(<AboutPage />);
    expect(
      screen.getByText(/author: khayitbek mirsoatov/i),
    ).toBeInTheDocument();
  });

  it('has a link to RS School React course', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: /rs school react course/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/react/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
