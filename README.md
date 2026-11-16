# Hexagon Intelligence Toolkit

A futuristic, static client-side login concept for the Hexagon Intelligence Toolkit.

## Features
- Single access key checked with the browser Web Crypto API (SHA-256)
- Hexagon Wire Guardian math challenge with 30 possible questions
- Session-only dashboard access
- Responsive dark interface with neon-blue accents
- Expandable dashboard module placeholders

## Run locally
Open `index.html` in a modern browser. For Web Crypto API support, use localhost or HTTPS:
```bash
python -m http.server 8000
```
Then visit http://localhost:8000.

## GitHub Pages
In the repository settings, open **Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

## Security note
This is a front-end demonstration, not a secure authentication system. The key hash and verification logic are delivered to every visitor and can be inspected or bypassed. The math challenge is also client-side and is not bot-proof. Do not use this to protect sensitive information. Real access control requires server-side verification.

The access key itself is not stored in this repository; only its SHA-256 digest is included in the client code.