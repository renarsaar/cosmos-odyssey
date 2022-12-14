import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from 'dotenv';

import { connectDb } from './db';

import { reservationsRouter } from './routes/reservations';
import { storePriceListsJob } from './job/priceListJob';

config();

const app: Express = express();

app.use(express.static('./build'));

const allowedOrigins = ['http://localhost:3000', 'https://cosmosodysseyuptime.herokuapp.com/'];
const allowedMethods = ['GET', 'POST'];
const options: CorsOptions = {
  origin: allowedOrigins,
  methods: allowedMethods,
};

app.use(cors(options));

app.use(express.json());

app.use('/TravelPrices', createProxyMiddleware({
  target: 'http://cosmos-odyssey.azurewebsites.net/api/v1.0',
  changeOrigin: true,
}));

app.use(reservationsRouter);

connectDb();

storePriceListsJob.invoke();

const PORT: string | number = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
