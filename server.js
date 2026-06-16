/* eslint-disable no-console */
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DIST_DIR = path.join(__dirname, 'dist');

// Serve the production build created by `parcel build`.
app.use(express.static(DIST_DIR));

// Single page app fallback: send index.html for any unknown route.
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Squid game server running at http://${HOST}:${PORT}`);
});
