"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const dotenv_1 = require("dotenv");
const db_1 = require("./db");
const reservations_1 = require("./routes/reservations");
const priceListJob_1 = require("./job/priceListJob");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.static('./build'));
const allowedOrigins = ['http://localhost:3000', 'https://cosmosodysseyuptime.herokuapp.com/'];
const allowedMethods = ['GET', 'POST'];
const options = {
    origin: allowedOrigins,
    methods: allowedMethods,
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use('/TravelPrices', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://cosmos-odyssey.azurewebsites.net/api/v1.0',
    changeOrigin: true,
}));
app.use(reservations_1.reservationsRouter);
(0, db_1.connectDb)();
priceListJob_1.storePriceListsJob.invoke();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
