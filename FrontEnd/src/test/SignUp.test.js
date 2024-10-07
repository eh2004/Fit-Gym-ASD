import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SignUp from '../react-pages/SignUp.jsx';

test('Validates that first name has at least two characters', async () => {
    render(<SignUp />);

    const firstNameInput = screen.getByLabelText(/First Name/i);

    fireEvent.change(firstNameInput, { target: { value: 'a' } });

    const submitButton = screen.getByText(/Register/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText(/Enter first name/i)).toBeVisible();
    });

    fireEvent.change(firstNameInput, { target: { value: 'Test' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.queryByText(/Enter first name/i)).not.toBeInTheDocument();
    });
});
