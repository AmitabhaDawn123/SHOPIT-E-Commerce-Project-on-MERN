import express from "express";
const router =express.Router();
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { allOrders, deleteOrder, getOrderDetails, myOrders, newOrder, updateOrder } from "../controllers/orderControllers.js";


router.route('/orders/new').post(isAuthenticatedUser,newOrder)
router.route('/orders/:id').get(isAuthenticatedUser,getOrderDetails)
router.route('/me/orders').get(isAuthenticatedUser,myOrders)
router.route('/admin/orders').get(isAuthenticatedUser,allOrders)
router.route('/admin/orders/:id').put(isAuthenticatedUser,updateOrder)
router.route('/admin/orders/:id').delete(isAuthenticatedUser,deleteOrder)
export default router;
