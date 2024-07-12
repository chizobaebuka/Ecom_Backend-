"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the user validation schema
const userValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email of the customer is required",
        invalid_type_error: "Email must be a string and valid",
    }).email(),
    password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(6, { message: "Password must be at least 6 characters long" }),
    role: zod_1.z.string({
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
    }).default("user")
});
exports.default = userValidationSchema;
