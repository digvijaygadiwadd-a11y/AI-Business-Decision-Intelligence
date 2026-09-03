import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders core application heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Dynamic Question/i);
    expect(headingElement).toBeDefined();
  });
});
