import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    CATEGORY_ENDPOINT: get("CATEGORY_ENDPOINT").required().asUrlString(),
    PRODUCT_ENDPOINT: get("PRODUCT_ENDPOINT").required().asUrlString(),
    DEFAULT_API_PREFIX: get("DEFAULT_API_PREFIX").required().asString(),
    CATEGORY_API_PREFIX: get("CATEGORY_API_PREFIX").required().asString(),
    PRODUCT_API_PREFIX: get("PRODUCT_API_PREFIX").required().asString(),
}