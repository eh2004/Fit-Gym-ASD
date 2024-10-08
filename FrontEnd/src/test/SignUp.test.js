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

  test('Displays errors if fields do not meet the minimum length requirements', () => {
    const firstName = screen.getByLabelText(/First Name/i);
    const lastName = screen.getByLabelText(/Last Name/i);
    const streetAddress = screen.getByLabelText(/Street Address/i);
    const city = screen.getByLabelText(/City/i);
    const state = screen.getByLabelText(/State/i);
    const zipCode = screen.getByLabelText(/Zip Code/i);
    const country = screen.getByLabelText(/Country/i);
    const username = screen.getByLabelText(/Choose a Username/i);
    const password = screen.getByLabelText(/Choose a Password/i);
    const nameOnCard = screen.getByLabelText(/Name on Card/i);
    const cardNumber = screen.getByLabelText(/Card Number/i);
    const cvv = screen.getByLabelText(/CVV/i);

    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(firstName, { target: { value: 'a' } });
    fireEvent.change(lastName, { target: { value: 'a' } });
    fireEvent.change(streetAddress, { target: { value: 'abc' } });
    fireEvent.change(city, { target: { value: 'a' } });
    fireEvent.change(state, { target: { value: 'a' } });
    fireEvent.change(country, { target: { value: 'a' } });
    fireEvent.change(zipCode, { target: { value: '123' } });
    fireEvent.change(username, { target: { value: 'abcd' } });
    fireEvent.change(password, { target: { value: 'abcd' } });
    fireEvent.change(nameOnCard, { target: { value: 'abcd' } });
    fireEvent.change(cardNumber, { target: { value: '12121212121212' } });
    fireEvent.change(cvv, { target: { value: '12' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Enter first name/i)).toBeVisible();
    expect(screen.getByText(/Enter last name/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid street address/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid city/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid state/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid zip code/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid country/i)).toBeVisible();
    expect(screen.getByText(/Must be 5 characters long/i)).toBeVisible();
    expect(screen.getByText(/Must contain 3 digits and be 5 characters long/i)).toBeVisible();
    expect(screen.getByText(/Enter name on card/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid card number/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid cvv/i)).toBeVisible();
  });

  test('Fields do not display errors when filled in correctly (with minimum valid values).', () => {
    const firstName = screen.getByLabelText(/First Name/i);
    const lastName = screen.getByLabelText(/Last Name/i);
    const streetAddress = screen.getByLabelText(/Street Address/i);
    const city = screen.getByLabelText(/City/i);
    const state = screen.getByLabelText(/State/i);
    const zipCode = screen.getByLabelText(/Zip Code/i);
    const country = screen.getByLabelText(/Country/i);
    const username = screen.getByLabelText(/Choose a Username/i);
    const password = screen.getByLabelText(/Choose a Password/i);
    const nameOnCard = screen.getByLabelText(/Name on Card/i);
    const cardNumber = screen.getByLabelText(/Card Number/i);
    const cvv = screen.getByLabelText(/CVV/i);

    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(firstName, { target: { value: 'ab' } });
    fireEvent.change(lastName, { target: { value: 'ab' } });
    fireEvent.change(streetAddress, { target: { value: 'abcd' } });
    fireEvent.change(city, { target: { value: 'ab' } });
    fireEvent.change(state, { target: { value: 'ab' } });
    fireEvent.change(country, { target: { value: 'ab' } });
    fireEvent.change(zipCode, { target: { value: '1234' } });
    fireEvent.change(username, { target: { value: 'abcde' } });
    fireEvent.change(password, { target: { value: 'abcd123' } });
    fireEvent.change(nameOnCard, { target: { value: 'abcde' } });
    fireEvent.change(cardNumber, { target: { value: '121212121212121' } });
    fireEvent.change(cvv, { target: { value: '123' } });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Enter first name/i)).not.toBeVisible();
    expect(screen.getByText(/Enter last name/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid street address/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid city/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid state/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid zip code/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid country/i)).not.toBeVisible();
    expect(screen.getByText(/Must be 5 characters long/i)).not.toBeVisible();
    expect(screen.getByText(/Must contain 3 digits and be 5 characters long/i)).not.toBeVisible();
    expect(screen.getByText(/Enter name on card/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid card number/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid cvv/i)).not.toBeVisible();
  });

  test('Displays error if card is expired.', () => {
    const expirationDate = screen.getByLabelText(/Expiration Date/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(expirationDate, { target: { value: '2023-10-21' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/Card must not be expired/i)).toBeVisible();
  });

  test('Does not display an error when expiration date is set to a future date.', () => {
    const expirationDate = screen.getByLabelText(/Expiration Date/i);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(expirationDate, { target: { value: '2026-10-21' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/Card must not be expired/i)).not.toBeVisible();
  });

  test('Displays error if phone number, cvv and card number fields contain non-numeric characters.', () => {
    const phoneNumber = screen.getByLabelText(/Phone Number/i);
    const cardNumber = screen.getByLabelText(/Card Number/i);
    const cvv = screen.getByLabelText(/CVV/i);

    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(phoneNumber, { target: { value: '041234a678' } });
    fireEvent.change(cardNumber, { target: { value: '123456m890123456' } });
    fireEvent.change(cvv, { target: { value: '1o3' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Enter a valid card number/i)).toBeVisible();
    expect(screen.getByText(/Enter a valid cvv/i)).toBeVisible();
    expect(screen.getByText(/Must contain 10 digits/i)).toBeVisible();
  });

  test('Does not display errors if phone number, cvv and card number fields contain numeric characters only of a valid length.', () => {
    const phoneNumber = screen.getByLabelText(/Phone Number/i);
    const cardNumber = screen.getByLabelText(/Card Number/i);
    const cvv = screen.getByLabelText(/CVV/i);

    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(phoneNumber, { target: { value: '0498765432' } });
    fireEvent.change(cardNumber, { target: { value: '1029384756829384' } });
    fireEvent.change(cvv, { target: { value: '789' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Enter a valid card number/i)).not.toBeVisible();
    expect(screen.getByText(/Enter a valid cvv/i)).not.toBeVisible();
    expect(screen.getByText(/Must contain 10 digits/i)).not.toBeVisible();
  });

  test('Displays error if password does not contain at least three digits.', () => {
    const password = screen.getByLabelText(/Choose a Password/);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(password, {target: { value: 'mypass23' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/Must contain 3 digits and be 5 characters long/i)).toBeVisible();
  });

  test('Does not display any error if password does contains at least three digits and meets min length requirements.', () => {
    const password = screen.getByLabelText(/Choose a Password/);
    const submitButton = screen.getByRole('button', { name: /Register/i });

    fireEvent.change(password, {target: { value: 'mypass123' }});
    fireEvent.click(submitButton);

    expect(screen.getByText(/Must contain 3 digits and be 5 characters long/i)).not.toBeVisible();
  });

});

//npm test -- src/test/SignUp.test.js --watchAll=false --reporters=default --reporters=jest-junit