# Assignment A: UPI Payment Flow (Frontend)

This is the frontend for the UPI Payment Flow assignment, built with React and Vite.

The user interface displays an order summary and a "Pay via UPI" button. When the user initiates a payment, the app:
1.  Calls the backend to create an order.
2.  Redirects the user to the generated UPI deep-link.
3.  Continuously polls the backend to check for payment confirmation and updates the UI to a "Success" state once confirmed.

## Tech Stack 🛠️
-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast front-end build tool.
-   **Axios**: For making HTTP requests to the backend.

## How to Run Locally 🚀

1.  Navigate to the `assignment-a/frontend` directory.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to `http://localhost:5173`.

**Note:** The UPI payment flow must be tested on a **mobile device** that has UPI apps installed. Use the "Network" URL provided by Vite to access the app from your phone on the same Wi-Fi network.
