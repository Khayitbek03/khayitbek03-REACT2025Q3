import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader component', () => {
  it('renders the loading text', () => {
    render(<Loader></Loader>);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
