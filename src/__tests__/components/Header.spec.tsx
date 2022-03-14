import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from '../../components/Header';

describe('Header', () => {
  it('should render component', () => {
    render(<Header />);

    expect(screen.queryByRole('img')).toBeInTheDocument();
  })
})
