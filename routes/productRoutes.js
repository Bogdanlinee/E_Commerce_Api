const express = require('express');
const router = express.Router();
const { auth, authorizePermissions } = require('../middleware/authentication');
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
} = require('../controllers/productController');

router.route('/uploadImage').post(uploadImage);
router.route('/')
  .get(getAllProducts)
  .post(auth, authorizePermissions('admin'), createProduct);
router.route('/:id')
  .get(getSingleProduct)
  .patch(auth, authorizePermissions('admin'), updateProduct)
  .delete(auth, authorizePermissions('admin'), deleteProduct);

module.exports = router;