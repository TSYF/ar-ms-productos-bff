import express from 'express';
const morgan = require("morgan");
import productRouter  from '@/routes/product';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX, DEFAULT_PRODUCT_API_PREFIX } = process.env;

app.use(`${DEFAULT_API_PREFIX}${DEFAULT_PRODUCT_API_PREFIX}`, productRouter);
app.listen(PORT || 8000, () => console.log("MS-PRODUCT-BFF STARTED"));