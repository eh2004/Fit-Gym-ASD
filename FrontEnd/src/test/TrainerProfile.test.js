import React from 'react';
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrainerProfile from "../components/TrainerProfile";

// Mocking fetch API for the trainer profile
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      trainer_id: "1",
      first_name: "John",
      last_name: "Doe",
      email_address: "john@example.com",
      phone_number: "123456789",
      street_address: "123 Main St",
      language: ["English", "Spanish"],
    }),
  })
);

// Mock react-modal's setAppElement to avoid errors in Jest environment
jest.mock('react-modal', () => {
  const Modal = ({ children }) => <div>{children}</div>;
  Modal.setAppElement = () => {};
  return Modal;
});

// Mock window.confirm for delete tests
beforeEach(() => {
  jest.clearAllMocks();
  global.confirm = jest.fn(() => true); // Mock confirm to always return true
});

afterEach(() => {
  delete global.confirm;
});

describe("TrainerProfile Component", () => {
  it("displays trainer profile once loaded", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Wait for the profile data to load and check if it's displayed
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/English, Spanish/i)).toBeInTheDocument();
  });

  it("allows editing the trainer profile", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Simulate clicking the "Update Info" button
    const editButton = await screen.findByText(/Update Info/i);
    fireEvent.click(editButton);

    // Simulate changing the trainer's name
    const nameInput = screen.getByLabelText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    // Simulate clicking the "Save" button
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Ensure the profile updates and shows the new name
    expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();
  });

  it("calls deleteProfile when Delete button is clicked", async () => {
    // Mock fetch for deletion
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Simulate clicking the "Delete Profile" button
    const deleteButton = await screen.findByText(/Delete Profile/i);
    fireEvent.click(deleteButton);

    // Expect confirm to be called
    expect(global.confirm).toHaveBeenCalledTimes(1);

    // Ensure the fetch was called twice (once for profile load, once for deletion)
    expect(global.fetch).toHaveBeenCalledTimes(2);

    // Ensure the profile data is removed after deletion
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });
});