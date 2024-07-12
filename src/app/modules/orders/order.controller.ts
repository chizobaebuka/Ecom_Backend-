import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { Product } from "../products/product.model";
import { orderServices } from "./order.services";
import { OrderModel } from "./order.model";

const createOrder = async (req: Request, res: Response) => {
    try {
        // zod validation of the req body
        const zodValidation = orderValidationSchema.safeParse(req.body);
        if (!zodValidation.success) {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: errorLists
            });
        }

        const existingOrder = await OrderModel.findOne({ email: zodValidation.data.email }).exec();
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email."
            });
        }

        const product = await Product.findById(zodValidation.data.productId).exec();
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.inventory.quantity < zodValidation.data.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available"
            });
        }

        if(product) {
            product.inventory.quantity -= zodValidation.data.quantity;
            product.inventory.inStock = product.inventory.quantity === 0 ? false : true
            const newOrder = await orderServices.createANewOrder(zodValidation.data);
            await product.save();

            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: newOrder
            });
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    const { email } = req.query
    try {
        const orders = await orderServices.getAllOrdersFromDB(email as string | undefined)
        if(orders.length === 0) {
            return res.status(200).json({
                success: false,
                message: `No orders found for the specified email, ${email}`,
                data: []
            })
        }

        return res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went worng",
            error: err
        })
    }
}

export const OrderController = {
    createOrder,
    getAllOrders
}
