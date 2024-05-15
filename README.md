
---

# Bank Search Web Application

This is a React web application that allows users to search for banks and view branch details.

## Setup

1. Clone the repository:
   ```
   git clone <repository_url>
   ```

2. Install dependencies:
   ```
   cd <project_directory>
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- **Bank Selection:** Choose a bank from the dropdown list to search for its branches.
- **Search:** Click the "Search" button to fetch branch details for the selected bank.
- **Pagination:** Navigate through multiple pages of branch results using the pagination buttons.

## Dependencies

- **React:** Frontend library for building user interfaces.
- **Chakra UI:** Component library for React applications, providing styled components and layouts.
- **Axios:** Promise-based HTTP client for making API requests.
- **@chakra-ui/icons:** Icons package for Chakra UI components.

## Project Structure

- **`src/App.js`:** Main component containing the application logic and UI.
- **`src/index.js`:** Entry point for rendering the React application.
- **`public/index.html`:** HTML file where the React app is injected.
- **`package.json`:** Configuration file listing project dependencies and scripts.

## API Integration

The application integrates with a bank search API hosted at `http://bank-search-api.vercel.app`.

---
