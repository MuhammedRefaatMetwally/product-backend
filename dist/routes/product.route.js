import express from 'express';
import { getAllProducts, getProductById, createProduct, } from '../controllers/product.controller.js';
const router = express.Router();
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products with optional category filtering
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *         example: Electronics
 *     responses:
 *       200:
 *         description: Successfully retrieved products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               data:
 *                 - id: "clp1x2y3z4a5b6c7d8e9f0"
 *                   name: "iPhone 15 Pro"
 *                   description: "Latest iPhone with advanced features"
 *                   price: "999.99"
 *                   image: "https://example.com/iphone.jpg"
 *                   category: "Electronics"
 *                   isAvailable: true
 *                   inStock: true
 *                   variants: []
 *                   createdAt: "2024-01-15T10:30:00Z"
 *                   updatedAt: "2024-01-15T10:30:00Z"
 *               meta:
 *                 total: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a specific product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *         example: clp1x2y3z4a5b6c7d8e9f0
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *             example:
 *               id: "clp1x2y3z4a5b6c7d8e9f0"
 *               name: "iPhone 15 Pro"
 *               description: "Latest iPhone with advanced features"
 *               price: "999.99"
 *               image: "https://example.com/iphone.jpg"
 *               category: "Electronics"
 *               isAvailable: true
 *               inStock: true
 *               variants:
 *                 - id: "clp1x2y3z4a5b6c7d8e9f1"
 *                   name: "Color"
 *                   value: "Space Black"
 *                   stock: 50
 *               createdAt: "2024-01-15T10:30:00Z"
 *               updatedAt: "2024-01-15T10:30:00Z"
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Product not found"
 *               message: "No product found with ID: clp1x2y3z4a5b6c7d8e9f0"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getProductById);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with optional variants
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *           examples:
 *             simple_product:
 *               summary: Simple product without variants
 *               value:
 *                 name: "MacBook Pro 16\""
 *                 description: "Powerful laptop for professionals"
 *                 price: 2499.99
 *                 image: "https://example.com/macbook.jpg"
 *                 category: "Electronics"
 *                 isAvailable: true
 *             product_with_variants:
 *               summary: Product with variants
 *               value:
 *                 name: "iPhone 15 Pro"
 *                 description: "Latest iPhone with advanced features"
 *                 price: 999.99
 *                 image: "https://example.com/iphone.jpg"
 *                 category: "Electronics"
 *                 isAvailable: true
 *                 variants:
 *                   - name: "Color"
 *                     value: "Space Black"
 *                     stock: 50
 *                   - name: "Storage"
 *                     value: "256GB"
 *                     stock: 30
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_fields:
 *                 value:
 *                   error: "Missing required fields"
 *                   message: "Name, price, image, and category are required"
 *               invalid_price:
 *                 value:
 *                   error: "Invalid price"
 *                   message: "Price must be a valid positive number"
 *               invalid_variants:
 *                 value:
 *                   error: "Invalid variant data"
 *                   message: "Each variant must have name, value, and non-negative stock"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createProduct);
export default router;
