const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");

const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");

const {
  getProductById,
  createProduct,
  getProduct,
  getPhoto,
  removeProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);
router.get("/products", getAllProducts);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

module.exports = router;
