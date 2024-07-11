import { Product } from "./product.model";
import { TProduct } from "./products.interface";

const createAProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
}

const getProductsFromDB = async (searchTerm = "") => {
    // to search by a particular letter of the search
    const query = searchTerm ? {name: {$regex: searchTerm, $options: "i"}} : {};
    const data = await Product.find(query);
    return data;
}

const getSingleProductFromDB = async (id: String) => {
    const result = await Product.findById(id);
    return result;
}

const updateProductByIdIntoDB = async (productId: String, productData: TProduct) => {
    const result = await Product.findByIdAndUpdate(productId, productData, { new: true });
    return result;
}

const deleteProductByIdFromDB = async (productId: String) => {
    const result = await Product.findByIdAndDelete(productId);
    return result;
}

export const productServices = {
    createAProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateProductByIdIntoDB,
    deleteProductByIdFromDB
};