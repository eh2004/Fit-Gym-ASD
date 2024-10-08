import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import Registration from '../components/Registration';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Registration', () => {
  test('Error messages for empty fields are displayed on submit', async () => {
    render(<Registration />);

    const submitButton = screen.getByText('Register');

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Enter first name')).toBeVisible();
        expect(screen.getByText('Enter last name')).toBeVisible();
        expect(screen.getByText('Enter a valid email address')).toBeVisible();
        expect(screen.getByText('Must contain 10 digits')).toBeVisible();
        expect(screen.getByText('You must be at least 16 to enrol')).toBeVisible();
        expect(screen.getByText('Enter a valid street address')).toBeVisible();
        expect(screen.getByText('Enter a valid city')).toBeVisible();
        expect(screen.getByText('Enter a valid state')).toBeVisible();
        expect(screen.getByText('Enter a valid zip code')).toBeVisible();
        expect(screen.getByText('Enter a valid country')).toBeVisible();
        expect(screen.getByText('Must be 5 characters long')).toBeVisible();
        expect(screen.getByText('Must contain 3 digits and be 5 characters long')).toBeVisible();
        expect(screen.getByText('You must select a plan')).toBeVisible();
        expect(screen.getByText('Enter name on card')).toBeVisible();
        expect(screen.getByText('Enter a valid card number')).toBeVisible();
        expect(screen.getByText('Enter a valid cvv')).toBeVisible();
        expect(screen.getByText('Card must not be expired')).toBeVisible();
    });
  });
});

const generateDummyData = () => ({
    first_name: "Jane",
    last_name: "Doe",
    email_address: "jane.doa@gmail.com",
    phone_number: "0412121212",
    date_of_birth: "1990-01-12",
    gender: "female",
    street_address: "Example Street",
    city: "Sydney",
    state: "NSW",
    zip_code: "2000",
    country: "Australia",
    username: "janeusername",
    password: "janepass1234",
    name_on_card: "Ms Jane Doe",
    card_number: "12345678912345678910",
    cvv: "123",
    expiration_date: "2028-06-10",
    plan: "basic"
});

describe('Registration', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });
  
    test('Successfully submits valid details to db', async () => {
      render(<Registration />);
      screen.debug();

      const dummyData = generateDummyData();
      
      fetch.mockResponseOnce(JSON.stringify({ success: true }));
  
      fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: dummyData.first_name } });
      fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: dummyData.last_name } });
      fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: dummyData.email_address } });
      fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: dummyData.phone_number } });
      fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: dummyData.date_of_birth} });
      fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: dummyData.gender} });
      fireEvent.change(screen.getByLabelText(/Street Address/i), { target: { value: dummyData.street_address } });
      fireEvent.change(screen.getByLabelText(/City/i), { target: { value: dummyData.city } });
      fireEvent.change(screen.getByLabelText(/State/i), { target: { value: dummyData.state } });
      fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: dummyData.zip_code } });
      fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: dummyData.country } });
      fireEvent.change(screen.getByLabelText(/Choose a Username/i), { target: { value: dummyData.username } });
      fireEvent.change(screen.getByLabelText(/Choose a Password/i), { target: { value: dummyData.password } });
      fireEvent.click(screen.getByText(/Select Standard/i));
      fireEvent.change(screen.getByLabelText(/Name on Card/i), { target: { value: dummyData.name_on_card } });
      fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: dummyData.card_number} });
      fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: dummyData.cvv } });
      fireEvent.change(screen.getByLabelText(/Expiration Date/i), { target: { value: dummyData.expiration_date } });

      const submitButton = screen.getByText('Register');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText((content, element) => content.includes('Welcome'))).toBeInTheDocument();
      });
    });
  });


describe('Ensures sign up form inputs meet minimum requirements', () => {
  beforeEach(() => {
    render(<Registration />);
  });

  test('Displays error for invalid email address', () => {
    const emailInput = screen.getByLabelText(/Email address/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(emailInput, { target: { value: 'invalid.email' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Enter a valid email address')).toBeVisible();
  });

  test('Does not display error for valid email address', () => {
    const emailInput = screen.getByLabelText(/Email address/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(emailInput, { target: { value: 'valid.email@gmail.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Enter a valid email address')).not.toBeVisible();
  });
  
  test('Displays error if inputted dob makes user younger than 16', () => {
    const dobInput = screen.getByLabelText(/date of birth/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(dobInput, { target: { value: '2010-01-01' } });
    fireEvent.click(submitButton);

    const dobError = screen.getByText(/You must be at least 16 to enrol/i);
    expect(dobError).toBeVisible();
  });

  test('Does not display error for valid dob', () => {
    const dobInput = screen.getByLabelText(/date of birth/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(dobInput, { target: { value: '2000-02-12' } });
    fireEvent.click(submitButton);

    const dobError = screen.getByText(/You must be at least 16 to enrol/i);
    expect(dobError).not.toBeVisible();
  });

    test('Displays error if inputted dob makes user younger than 16', () => {
    const dobInput = screen.getByLabelText(/date of birth/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(dobInput, { target: { value: '2010-01-01' } });
    fireEvent.click(submitButton);

    const dobError = screen.getByText(/You must be at least 16 to enrol/i);
    expect(dobError).toBeVisible();
  });
});

