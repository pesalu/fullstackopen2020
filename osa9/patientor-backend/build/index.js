"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
app.use(express_1.default.json());
const PORT = 3001;
const root = "/api";
app.get(`${root}/ping`, (_req, res) => {
    res.send("PING");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
