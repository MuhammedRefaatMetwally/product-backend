import prisma from '../config/database.js';
export const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;
        const where = category ? { category: category } : {};
        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    variants: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.count({ where }),
        ]);
        const productsWithStock = products.map(product => ({
            ...product,
            price: product.price.toString(),
            inStock: product.variants.length > 0
                ? product.variants.some(variant => variant.stock > 0)
                : product.isAvailable,
        }));
        res.status(200).json({
            data: productsWithStock,
            meta: {
                total,
            },
        });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            error: 'Failed to fetch products',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
            },
        });
        if (!product) {
            return res.status(404).json({
                error: 'Product not found',
                message: `No product found with ID: ${id}`,
            });
        }
        const productWithStock = {
            ...product,
            price: product.price.toString(),
            inStock: product.variants.length > 0
                ? product.variants.some(variant => variant.stock > 0)
                : product.isAvailable,
        };
        res.status(200).json(productWithStock);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            error: 'Failed to fetch product',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, isAvailable = true, variants = [], } = req.body;
        if (!name || !price || !image || !category) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Name, price, image, and category are required',
            });
        }
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice < 0) {
            return res.status(400).json({
                error: 'Invalid price',
                message: 'Price must be a valid positive number',
            });
        }
        if (variants.length > 0) {
            for (const variant of variants) {
                if (!variant.name ||
                    !variant.value ||
                    typeof variant.stock !== 'number' ||
                    variant.stock < 0) {
                    return res.status(400).json({
                        error: 'Invalid variant data',
                        message: 'Each variant must have name, value, and non-negative stock',
                    });
                }
            }
        }
        const product = await prisma.product.create({
            data: {
                name: name.trim(),
                description: description?.trim() || null,
                price: numericPrice,
                image: image.trim(),
                category: category.trim(),
                isAvailable,
                variants: {
                    create: variants.map((variant) => ({
                        name: variant.name.trim(),
                        value: variant.value.trim(),
                        stock: parseInt(variant.stock, 10) || 0,
                    })),
                },
            },
            include: {
                variants: true,
            },
        });
        const productWithStock = {
            ...product,
            price: product.price.toString(),
            inStock: product.variants.length > 0
                ? product.variants.some(variant => variant.stock > 0)
                : product.isAvailable,
        };
        res.status(201).json({
            message: 'Product created successfully',
            data: productWithStock,
        });
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            error: 'Failed to create product',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
