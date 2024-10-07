import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import Registration from '../components/Registration';

describe('App component', () => {
  test('displays validation errors for empty required fields on submit', async () => {
    render(<Registration />);

    const submitButton = screen.getByText('Register');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Enter first name')).toBeInTheDocument();
    });
  });
});
