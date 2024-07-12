import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const zodParser = productValidationSchema.parse(req.body);
        const result = await productServices.createAProductIntoDB(zodParser);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        })
        
       } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
       }
}

const getAllProducts = async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    const result = await productServices.getProductsFromDB(searchTerm as string);
    res.status(200).json({
        success: true, 
        message: "Product retrieved successfully",
        data: result
    })
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await productServices.getSingleProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const data = req.body;

        const result = await productServices.updateProductByIdIntoDB(productId, data);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await productServices.deleteProductByIdFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
    }
}



export const ProductController = {
    createProduct, 
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
