import express from 'express'
import { getProductDetails,getProducts,newProduct,updateProduct,deleteProduct, createProductReview, getProductReviews, deleteReview} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';
const router= express.Router();

router.route("/products").get(getProducts);
router.route("/products").post(newProduct);
router.route("/products/:id").get(getProductDetails);//admin
router.route("/products/:id").put(updateProduct);//admin
router.route("/products/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);//admin
router.route("/reviews").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(isAuthenticatedUser,getProductReviews);
router.route("/admin/reviews").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview);

// isAuthenticatedUser,authorizeRoles("admin"),
// admin/




export default router;
