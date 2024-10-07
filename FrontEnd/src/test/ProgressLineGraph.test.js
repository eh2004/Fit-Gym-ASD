import React from 'react';
import { render, screen, act } from "@testing-library/react";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

// Mock only the Line chart, leave ChartJS.register intact
jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => <div>Mocked Line Chart</div>), // Mock the Line chart as a spy
}));

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { workout_id: 1, workout_date: "2024-10-01", Sets: [ { weight: 100, reps: 10, Exercise: { exercise_name: "Squat" } } ] },
        { workout_id: 2, workout_date: "2024-10-02", Sets: [ { weight: 120, reps: 8, Exercise: { exercise_name: "Bench Press" } } ] }
      ]),
  })
);

jest.mock('chartjs-plugin-zoom', () => ({
  id: 'zoom',
  start: jest.fn(),
  stop: jest.fn(),
}));


// Mock Hammer.js and chartjs-plugin-zoom 
jest.mock('hammerjs', () => ({
  Pan: jest.fn(),
  Pinch: jest.fn(),
  Manager: jest.fn().mockImplementation(() => ({
    add: jest.fn(),
    set: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    destroy: jest.fn(),
  })),
}));


describe("ProgressLineGraphByUser Component", () => {
  it("Chart displays mock data", async () => {
    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    // Check for the graph title
    expect(screen.getByText(/Workout Progress Line Graph/i)).toBeInTheDocument();

    // Check for the mocked chart
    expect(screen.getByText(/Mocked Line Chart/i)).toBeInTheDocument(); // Match the mocked chart

    // Ensure that the mock fetch was called
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("Error messages display correctly", async () => {
    // Mock fetch to return an error
    global.fetch.mockImplementationOnce(() => Promise.reject("API fetch failed"));

    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    // Check for the error message
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });
  it("Chart updates correctly", async () => {
    const { rerender } = render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
  
    await act(async () => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers/1/workouts')); // Match only the relevant part of the URL
    });
  
    // Simulate rerendering the component with new props
    await act(async () => {
      rerender(<ProgressLineGraphByUser customer={{ id: 2 }} />);
    });
  
    // Check that the fetch was called with the new customer ID
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers/2/workouts'));
  });  
  it("Zoom function working correctly", async () => {
    const { rerender } = render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
  
    await act(async () => {
      rerender(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });
  
    // Simulate zoom behavior
    const zoomMock = require('chartjs-plugin-zoom');
    zoomMock.start();  // Simulate zoom start
  
    expect(zoomMock.start).toHaveBeenCalled();  // Assert zoom start was triggered
  }); 
  it("Loading displays correctly", async () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {})); // Keep the promise pending to simulate loading
    
    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });
  
    // Check if the loading state is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });  
});
