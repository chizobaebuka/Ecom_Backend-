import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant, } from './products.interface';

const variantSchema = new Schema<TVariant>({
    type: { type: String },
    value: { type: String }
}, { _id: false})

const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number },
    inStock: { type: Boolean }
}, { _id: false})


const productSchema = new Schema<TProduct>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    category: { type: String},
    tags: { type: [String]},
    variants: { type: [variantSchema] },
    inventory: { type: inventorySchema }
})

export const Product = model<TProduct>('Product', productSchema);

