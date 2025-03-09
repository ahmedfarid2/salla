"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
mongoose_1.default
    .connect("mongodb://admin:passphrase@localhost:27017/dentacarts?authSource=admin")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Failed to connect MongoDB: ${err}`));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
