import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Products API',
            version: '1.0.0',
            description: 'A simple Express API for managing products',
            contact: {
                name: 'API Support',
                email: 'support@products.com',
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? process.env.API_URL || 'product-backend-production-158b.up.railway.app'
                    : 'http://localhost:3000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    required: ['name', 'price', 'image', 'category'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the product',
                            example: 'clp1x2y3z4a5b6c7d8e9f0',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the product',
                            example: 'iPhone 15 Pro',
                        },
                        description: {
                            type: 'string',
                            nullable: true,
                            description: 'The description of the product',
                            example: 'Latest iPhone with advanced features',
                        },
                        price: {
                            type: 'string',
                            description: 'The price of the product',
                            example: '999.99',
                        },
                        image: {
                            type: 'string',
                            description: 'The image URL of the product',
                            example: 'https://example.com/iphone.jpg',
                        },
                        category: {
                            type: 'string',
                            description: 'The category of the product',
                            example: 'Electronics',
                        },
                        isAvailable: {
                            type: 'boolean',
                            description: 'Whether the product is available',
                            example: true,
                        },
                        inStock: {
                            type: 'boolean',
                            description: 'Whether the product is in stock',
                            example: true,
                        },
                        variants: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/ProductVariant',
                            },
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Product creation date',
                            example: '2024-01-15T10:30:00Z',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Product last update date',
                            example: '2024-01-15T10:30:00Z',
                        },
                    },
                },
                ProductVariant: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The auto-generated id of the variant',
                            example: 'clp1x2y3z4a5b6c7d8e9f1',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the variant',
                            example: 'Color',
                        },
                        value: {
                            type: 'string',
                            description: 'The value of the variant',
                            example: 'Space Black',
                        },
                        stock: {
                            type: 'integer',
                            description: 'Stock quantity for this variant',
                            example: 50,
                        },
                    },
                },
                CreateProductRequest: {
                    type: 'object',
                    required: ['name', 'price', 'image', 'category'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the product',
                            example: 'iPhone 15 Pro',
                        },
                        description: {
                            type: 'string',
                            description: 'The description of the product',
                            example: 'Latest iPhone with advanced features',
                        },
                        price: {
                            type: 'number',
                            description: 'The price of the product',
                            example: 999.99,
                        },
                        image: {
                            type: 'string',
                            description: 'The image URL of the product',
                            example: 'https://example.com/iphone.jpg',
                        },
                        category: {
                            type: 'string',
                            description: 'The category of the product',
                            example: 'Electronics',
                        },
                        isAvailable: {
                            type: 'boolean',
                            description: 'Whether the product is available',
                            example: true,
                        },
                        variants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        example: 'Color',
                                    },
                                    value: {
                                        type: 'string',
                                        example: 'Space Black',
                                    },
                                    stock: {
                                        type: 'integer',
                                        example: 50,
                                    },
                                },
                            },
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            example: 'Error message',
                        },
                        message: {
                            type: 'string',
                            example: 'Detailed error description',
                        },
                    },
                },
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Product',
                            },
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                total: {
                                    type: 'integer',
                                    example: 10,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};
const specs = swaggerJSDoc(options);
export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Acquisitions API Documentation',
    }));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
};
export default specs;
