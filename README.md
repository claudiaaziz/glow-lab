# Cozy Threads E-commerce Demo Application

This is a basic e-commerce web application for a new direct-to-consumer brand, Cozy Threads, showcasing Stripe's payment capabilities. The application includes a product catalog, a shopping cart, and a checkout flow integrated with Stripe's Payment Element for secure transactions.

## Features

-   **Product Catalog**: Displays a list of products, including images, titles, descriptions, and prices.
-   **Shopping Cart**: Allows customers to add or remove items from the shopping cart and view selected products.
-   **Secure Checkout**: Stripe Payment Element integration for safe transactions.
-   **Order Confirmation**: Clear success/failure states after purchase.
-   **Clean User Experience**: Clean, responsive interface with intuitive shopping cart and payment flow.

## Tech Stack

### Frontend

-   React 18
-   Vite
-   React Router
-   Regular CSS with component-specific stylesheets
-   Stripe Payment Element

### Backend

-   Node.js
-   Express
-   Stripe API

## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/claudiaaziz/stripe-take-home
    cd stripe-take-home
    ```

2. **Install Dependencies:**

    **Backend setup:**

    ```bash
    cd server
    npm i
    ```

    **Frontend setup:**

    ```bash
    cd client
    npm i
    ```

3. **Environment Setup:**

    Create a `.env` file in the `server` directory and add your Stripe keys:

    ```bash
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    PORT=3000
    ```

4. **Start the Application:**

    **Start backend server:**

    ```bash
    cd server
    npm run dev
    ```

    **In a new terminal, start the frontend:**

    ```bash
    cd client
    npm run dev
    ```

5. **Open your browser:**

    Navigate to [http://localhost:5173](http://localhost:5173).
