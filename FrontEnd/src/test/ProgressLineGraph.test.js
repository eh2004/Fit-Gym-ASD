import React from 'react';
import { render, screen, act } from "@testing-library/react";
import ProgressLineGraphByUser from "../components/LineGraphByUser";

// Mock canvas getContext for Chart.js
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    rotate: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    measureText: jest.fn().mockReturnValue({ width: 100 }),
    transform: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  }));
});

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

// Mock Hammer.js and chartjs-plugin-zoom
jest.mock('hammerjs', () => {
  return {
    Pan: jest.fn(),
    Pinch: jest.fn(),
    Manager: jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      set: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      destroy: jest.fn(),
    })),
  };
});

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

    // Check for the graph title and canvas
    expect(screen.getByText(/Workout Progress Line Graph/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument(); // Ensure canvas renders

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
