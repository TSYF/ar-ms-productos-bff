import { Matcher } from "@/utils";

export interface Product {
    id: number,
    images: string,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
    stock: number,
    categoryId: number
}

export const productMatcher: Matcher = {
    id: "number",
    images: "string",
    name: "string",
    description: "string",
    price: "number",
    isActive: "boolean",
    stock: "number",
    categoryId: "number"
};