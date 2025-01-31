# QR Code SCB Payment Integration

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### SCB Developers Web

1. Register at [SCB Developer Portal](https://developer.scb).
   - Create a new application [here](https://developer.scb/#/management/apps).
   - Authenticate using the Token Generator [here](https://developer.scb/#/tools/token-generator).
     - Save the following variables to your `.env.local` file: `API_KEY`, `API_SECRET`, `ACCESS_TOKEN`.
2. Get Customer Profile from the menu [Playground >> Customer Profile].
   - Use the Pin code from this page.
3. Install the SCB Easy simulator app on your mobile phone [Playground >> Simulator login with QR code >> SCB Easy simulator App].
   - Follow the instructions provided.

### Terminal

1. Install `react-qr-code`:
   ```bash
   npm install react-qr-code

### Next.js

#### API Integration
The project integrates with the SCB API to create QR codes for payments. The main API call is implemented in the POST function in route.ts.

#### Environment Variables
Make sure to set the following environment variables in your .env.local file:
SCB_API_KEY: Your SCB API Key.
SCB_API_SECRET: Your SCB API Secret.
SCB_ACCESS_TOKEN: Your SCB API access token.

#### Coding
Configure a textbox to get ref1, ref2, and amount, and add a button to create a QR code