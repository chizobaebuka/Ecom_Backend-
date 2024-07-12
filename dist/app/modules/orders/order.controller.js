"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const product_model_1 = require("../products/product.model");
const order_services_1 = require("./order.services");
const order_model_1 = require("./order.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod validation of the req body
        const zodValidation = order_validation_1.default.safeParse(req.body);
        if (!zodValidation.success) {
            const errorLists = zodValidation.error.issues.map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: errorLists
            });
        }
        const existingOrder = yield order_model_1.OrderModel.findOne({ email: zodValidation.data.email }).exec();
        if (existingOrder) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email."
            });
        }
        const product = yield product_model_1.Product.findById(zodValidation.data.productId).exec();
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
        if (product) {
            product.inventory.quantity -= zodValidation.data.quantity;
            product.inventory.inStock = product.inventory.quantity === 0 ? false : true;
            const newOrder = yield order_services_1.orderServices.createANewOrder(zodValidation.data);
            yield product.save();
            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: newOrder
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const orders = yield order_services_1.orderServices.getAllOrdersFromDB(email);
        if (orders.length === 0) {
            return res.status(200).json({
                success: false,
                message: `No orders found for the specified email, ${email}`,
                data: []
            });
        }
        return res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went worng",
            error: err
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders
};
