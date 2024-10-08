import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";

// Import the mock
import AboutUsPage from "../__mocks__/AboutUs.html"; // Adjust path if necessary

describe("Header Navigation Test", () => {
  test("navigates to About Us page when About link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
        <Routes>
          {/* Default route to avoid warnings */}
          <Route path="/" element={<div>Home</div>} />
          {/* Route for About Us page */}
          <Route path="/src/pages/AboutUs.html" element={<AboutUsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate clicking the About link
    const aboutLink = screen.getByText(/About/i);
    fireEvent.click(aboutLink);

  });
});
