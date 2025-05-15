import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('App', () => {
    it('renders header text', () => {
        render(<App />);
        expect(screen.getByText(/Drive in Style/i)).toBeTruthy();
    });
});