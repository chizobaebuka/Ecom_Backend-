"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: { type: String },
    value: { type: String }
}, { _id: false });
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number },
    inStock: { type: Boolean }
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category: { type: String },
    tags: { type: [String] },
    variants: { type: [variantSchema] },
    inventory: { type: inventorySchema }
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
