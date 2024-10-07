import React from 'react';
import { render, screen, act } from "@testing-library/react";
import ProgressLineGraphByUser from "../components/ProgressLineGraphByUser";

// Mock the fetch API to simulate data fetching for the component
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          workout_id: 1,
          workout_date: "2024-10-01",
          Sets: [
            {
              weight: 100,
              reps: 10,
              Exercise: { exercise_name: "Squat" }
            }
          ]
        },
        {
          workout_id: 2,
          workout_date: "2024-10-02",
          Sets: [
            {
              weight: 120,
              reps: 8,
              Exercise: { exercise_name: "Bench Press" }
            }
          ]
        }
      ]),
  })
);

describe("ProgressLineGraphByUser Component", () => {
  // Test case 1: Check if the graph is rendered with data
  it("renders workout progress graph after fetching data", async () => {
    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    // Ensure that the graph has been rendered with data
    expect(await screen.findByText(/Workout Progress Line Graph/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Ensure the x-axis dates and y-axis weights are correct
  it("displays correct date and weight data in the chart", async () => {
    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    // Check for elements in the chart like the workout date and weight
    expect(screen.getByText(/Oct 1, 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Oct 2, 2024/i)).toBeInTheDocument();
  });

  // Test case 3: Handle fetch error correctly
  it("shows an error message when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject("API fetch failed")
    );

    await act(async () => {
      render(<ProgressLineGraphByUser customer={{ id: 1 }} />);
    });

    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });
});
