import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import type { JSX } from 'react';

function ShowError(): JSX.Element {
  throw new Error('Boom!');
}

describe('ErrorBoundary component', () => {
  it('catches error and display fallback UI', () => {
    render(
      <ErrorBoundary>
        <ShowError></ShowError>
      </ErrorBoundary>,
    );
    expect(
      screen.getByText(/the intentional error happened/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/try to reload the page/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });
});
