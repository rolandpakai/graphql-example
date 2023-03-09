import { 
  getAlProducts, 
  getProductsByPrice, 
  getProductById, 
  addNewProduct,
  addNewProductReview,
} from "./products.model.js"

export default {
  Query: {
    products: () => {
      return getAlProducts();
    },
    productsByPrice: (_, args) => {
      return getProductsByPrice(args.min, args.max);
    },
    product: (_, args) => {
      return getProductById(args.id);
    }
  },
  Mutation: {
    addNewProduct: (_, args) => {
      return addNewProduct(args.id, args.description, args.price);
    },
    addNewProductReview: (_, args) => {
      return addNewProductReview(args.id, args.rating, args.comment);
    }
  }
}