import { z } from "zod";

const orderValidationSchema = z.object({
    email: z.string({
        required_error: "Email of the customer is required",
        invalid_type_error: "Email must be a string and valid",
    }).email(),
    productId: z.string({
        required_error: "Product Id is required",
        invalid_type_error: "Product Id must be a string of mongodb_id",
    }),
    quantity: z.number({
        required_error: "Quantity of the product is required",
        invalid_type_error: "Quantity must be a number",
    }).min(1),
    price: z.number({
        required_error: "Price of the product is required",
        invalid_type_error: "Price must be a number",
    }).positive()
});
 
export default orderValidationSchema;