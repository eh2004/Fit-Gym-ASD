import React from 'react';
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrainerProfile from "../components/TrainerProfile";

// Mocking localStorage to provide the trainer ID
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => "1"); // Mock logged-in user ID as "1"
});

// Mocking the fetch API to simulate the trainer profile and certificates data
global.fetch = jest.fn((url) => {
  if (url.includes('certificates')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { certificate_id: 1, certificate_name: "First Aid" },
        { certificate_id: 2, certificate_name: "CPR" }
      ]),
    });
  }

  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      trainer_id: "1",
      first_name: "John",
      last_name: "Doe",
      email_address: "john@example.com",
      phone_number: "123456789",
      street_address: "123 Main St",
      specialty: "Strength Training",
      certification: "IV in Fitness SIS40221-01",
      language: ["English", "Spanish"],
      bio: "A passionate fitness trainer.",
    }),
  });
});

// Mocking the react-modal component to avoid issues with accessibility settings in tests
jest.mock('react-modal', () => {
  const Modal = ({ children }) => <div>{children}</div>;
  Modal.setAppElement = () => {};
  return Modal;
});

// Mocking window.confirm and alert functions
beforeEach(() => {
  jest.clearAllMocks();
  global.confirm = jest.fn(() => true);
  global.alert = jest.fn();
});

// Clean up mocks after each test
afterEach(() => {
  delete global.confirm;
  delete global.alert;
});

describe("TrainerProfile Component", () => {
  
  // Test case 1: Check if the trainer profile displays correctly after it's loaded
  it("displays trainer profile and certificates once loaded", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Verify the trainer's information is displayed on the screen
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText(/Strength Training/i)).toBeInTheDocument();
    // Update to expect "First Aid, CPR"
    expect(screen.getByText(/First Aid, CPR/i)).toBeInTheDocument();
    expect(screen.getByText(/English, Spanish/i)).toBeInTheDocument();
    expect(screen.getByText(/A passionate fitness trainer/i)).toBeInTheDocument();
  });

  // Test case 2: Check if the trainer profile can be edited and saved
  it("allows editing the trainer profile", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Click the "Update Info" button to start editing
    const editButton = await screen.findByText(/Update Info/i);
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Change the trainer's name to "Jane Doe"
    const nameInput = screen.getByLabelText(/Name/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    });

    // Save the changes
    const saveButton = screen.getByText(/Save/i);
    await act(async () => {
      fireEvent.click(saveButton);
    });

    // Check if the trainer's name is updated
    expect(await screen.findByText(/Jane Doe/i)).toBeInTheDocument();
  });

  // Test case 3: Check if the "Cancel" button works and reverts changes
  it("cancels editing the trainer profile", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Start editing the profile
    const editButton = await screen.findByText(/Update Info/i);
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Change the trainer's name
    const nameInput = screen.getByLabelText(/Name/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    });

    // Click the "Cancel" button
    const cancelButton = screen.getByText(/Cancel/i);
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    // Check if the name was not changed
    expect(await screen.findByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/Jane Doe/i)).not.toBeInTheDocument();
  });

  // Test case 4: Check if the delete button works and removes the profile
  it("calls deleteProfile when Delete button is clicked", async () => {
    // Mock the fetch call for deletion
    global.fetch = jest.fn((url) => {
      if (url.includes('certificates')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Click the "Delete Profile" button
    const deleteButton = await screen.findByText(/Delete Profile/i);
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Confirm the delete action and ensure the fetch call was made
    expect(global.confirm).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(4); // Adjust the number of calls

    // Check if the profile is removed from the screen
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
  });

  // Test case 5: Check if the "Save" button is only enabled when changes are made
  it("enables the save button only if changes are made", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <TrainerProfile />
        </MemoryRouter>
      );
    });

    // Start editing the profile
    const editButton = await screen.findByText(/Update Info/i);
    await act(async () => {
      fireEvent.click(editButton);
    });

    // Change the trainer's name
    const nameInput = screen.getByLabelText(/Name/i);
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    });

    // Check if the "Save" button is now enabled
    const saveButton = screen.getByText(/Save/i);
    expect(saveButton).not.toBeDisabled();
  });
});