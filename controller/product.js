const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { category: true } });
        return res.json(products);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            },
            include: { category: true }
        });
        if (!product) {
            return res.status(400).send({
                error: "Product not found"
            })
        }
        return res.json(product);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await prisma.product.create(
            {
                data: data
            }
        )
        return res.json({
            message: "Product added successfully",
            product: product
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

exports.updateProductById = async (req, res) => {
    try {
        const isExist = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });

        if (!isExist) {
            return res.status(400).send({
                error: "Product not found"
            })
        }

        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body,
            include: {
                category: true
            }
        });

        return res.json({
            message: "Product updated successfully",
            product: product
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        const isExist = await prisma.product.findUnique({
            where: {
                id: Number(req.params.id)
            },
        });
        if (!isExist) {
            return res.status(400).send({
                error: "Product not found"
            })
        }
        const product = await prisma.product.delete({
            where: {
                id: Number(req.params.id)
            },
        });

        return res.json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}