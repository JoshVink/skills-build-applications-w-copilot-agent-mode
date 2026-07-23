import express from 'express';
import db from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

// Ensure DB connection is established
db.once('open', () => {
  console.log('MongoDB connection ready');
});

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend running at ${baseUrl}`);
});

export default app;
