import React from 'react';
import { render, screen, act } from "@testing-library/react";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

// Mock only the Line chart, leave ChartJS.register intact
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Mocked Line Chart</div>, // Mocked Line component
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

// Mock Hammer.js and chartjs-plugin-zoom (only the parts required for zoom)
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

jest.mock('chartjs-plugin-zoom', () => ({
  id: 'zoom',
  start: jest.fn(),
  stop: jest.fn(),
}));

describe("ProgressLineGraphByUser Component", () => {
  it("renders workout progress graph with mock data", async () => {
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

  it("displays an error message when fetch fails", async () => {
    // Mock fetch to return an error
    global.fetch.mockImplementationOnce(() => Promise.reject("API fetch failed"));

    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    // Check for the error message
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });
});
