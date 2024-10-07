// Import the necessary jest-dom matchers for testing

import '@testing-library/jest-dom'; // Correct import for jest-dom matchers
// You can also add any global setup or configuration here
// For example, you could mock global objects or add custom jest matchers if needed

// Example: Mock window.confirm globally for tests if needed
global.confirm = jest.fn(() => true);  // Mock confirm to always return true