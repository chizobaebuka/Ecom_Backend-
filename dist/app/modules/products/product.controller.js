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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        const zodParser = product_validation_1.default.parse(req.body);
        const result = yield product_service_1.productServices.createAProductIntoDB(zodParser);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    const result = yield product_service_1.productServices.getProductsFromDB(searchTerm);
    res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: result
    });
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSingleProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const result = yield product_service_1.productServices.updateProductByIdIntoDB(productId, data);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.deleteProductByIdFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
