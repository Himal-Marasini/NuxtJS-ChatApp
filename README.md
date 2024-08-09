# Application Setup

This document describes the steps required to set up and run the application, including configuring necessary environment variables.

## Install Dependencies

Make sure to install the dependencies:

```bash
pnpm install
```

## Environment Variables

To run this application, you need to configure the following environment variables:

- `SUPABASE_URL`  
  **Description:** The URL of your Supabase instance.  
  **Example Value:** `https://xyzcompany.supabase.co`

- `SUPABASE_KEY`  
  **Description:** The API key for your Supabase instance.  
  **Example Value:** `your-supabase-api-key`

- `NITRO_API_KEY_SECRET`  
  **Description:** A secret API key used for accessing protected endpoints.  
  **Example Value:** `your-secret-api-key`

## Setting Up Environment Variables

Follow these steps to set up the environment variables:

1. **Create a `.env` File:**

   In the root directory of your project, create a file named `.env`.

2. **Add Environment Variables:**

   Open the `.env` file and add the required environment variables using the format below:

   ```plaintext
   SUPABASE_URL=https://xyzcompany.supabase.co
   SUPABASE_KEY=your-supabase-api-key
   NITRO_API_KEY_SECRET=your-secret-api-key
   ```

# JWT Token Generation Guide

This guide explains how to generate a JWT (JSON Web Token) using your API key secret. You can use the [jwt.io](https://jwt.io) website to manually generate the token.

## Steps to Generate a JWT Token

1. **Access jwt.io:**

   Open your web browser and navigate to [jwt.io](https://jwt.io). This website provides a convenient tool for creating and decoding JWTs.

2. **Locate the JWT Debugger:**

   On the jwt.io homepage, you will find the JWT Debugger section. This is where you can create and verify JWTs.

3. **Go To The Verify Signature and replace your-256-bit-secret with api secret key from the .env file**

   `HMACSHA256(
base64UrlEncode(header) + "." +
base64UrlEncode(payload),
your-256-bit-secret)
`

4. **Copy the generated token & sent it on the header of api call**

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

# API Request Guide

This guide explains how to make an API request to the local server with an API key using `cURL`.

## Making a `cURL` Request with API Key

To interact with the API endpoint, you can use `cURL` to send an HTTP request. Below is an example of how to perform a `GET` request to the `/api/users` endpoint with an API key included in the headers.

### Example `cURL` Command

```bash
curl --location 'http://localhost:3000/api/users' \
--header 'api-key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dYkn6w8yucJqGh3tCjWvUi5NrR1c6qKZt6htMkkRd1I'

```
