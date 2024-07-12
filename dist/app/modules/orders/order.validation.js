"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email of the customer is required",
        invalid_type_error: "Email must be a string and valid",
    }).email(),
    productId: zod_1.z.string({
        required_error: "Product Id is required",
        invalid_type_error: "Product Id must be a string of mongodb_id",
    }),
    quantity: zod_1.z.number({
        required_error: "Quantity of the product is required",
        invalid_type_error: "Quantity must be a number",
    }).min(1),
    price: zod_1.z.number({
        required_error: "Price of the product is required",
        invalid_type_error: "Price must be a number",
    }).positive()
});
exports.default = orderValidationSchema;
