"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
// Ensure DB connection is established
database_1.default.once('open', () => {
    console.log('MongoDB connection ready');
});
app.get('/api/', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API', baseUrl });
});
app.use('/api', api_1.default);
app.listen(PORT, () => {
    console.log(`OctoFit backend running at ${baseUrl}`);
});
exports.default = app;
