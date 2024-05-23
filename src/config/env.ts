import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    INDEX_ENDPOINT: get("INDEX_ENDPOINT").required().asUrlString(),
    DEFAULT_API_PREFIX: get("DEFAULT_API_PREFIX").required().asString(),
    DEFAULT_PRODUCT_API_PREFIX: get("DEFAULT_PRODUCT_API_PREFIX").required().asString()
}