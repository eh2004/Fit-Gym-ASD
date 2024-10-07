import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TrainerProfile from '../components/TrainerProfile';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      customer_id: 1,
      first_name: "John",
      email_address: "john@example.com",
      phone_number: "1234567890",
      street_address: "123 Main St",
      bio: "Bio for John"
    }),
  })
);

describe("TrainerProfile Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders loading state initially", () => {
    render(<TrainerProfile />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("displays customer info after loading", async () => {
    render(<TrainerProfile />);

    // Wait for the customer info to load
    const nameElement = await screen.findByText(/John/i);
    expect(nameElement).toBeInTheDocument();
    expect(screen.getByText(/Bio for John/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
  });

  test("edit customer info", async () => {
    render(<TrainerProfile />);

    // Wait for the customer info to load
    const editButton = await screen.findByText(/Update Info/i);
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // After saving, the new name should be displayed
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });
});