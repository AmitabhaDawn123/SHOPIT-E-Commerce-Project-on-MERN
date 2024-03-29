import express from 'express'
import { logout,loginUser,registerUser, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUsersDetails, updateUser, deleteUser } from '../controllers/authControllers.js';
import {authorizeRoles, isAuthenticatedUser} from '../middlewares/auth.js';
const router= express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserProfile);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),allUsers);
router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getUsersDetails);
router.route("/admin/users/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateUser);
router.route("/admin/users/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);



export default router;
