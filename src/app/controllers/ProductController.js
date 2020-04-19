import * as Yup from 'yup';

import Product from '../schemas/Product';

class ProductController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.string().required(),
            stock_quantity: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Product is invalid' });
        }

        const product = await Product.create(req.body);

        res.status(201).json(product);
    }

    async list(req, res) {
        const products = await Product.find({});

        return res.status(200).json(products);
    }

    async update(req, res) {
        const { stock_quantity } = await Product.findById(
            req.params.product_id
        );

        const stockQuantity = stock_quantity - req.body.stock_quantity;

        const product = await Product.findByIdAndUpdate(req.params.product_id, {
            stock_quantity: stockQuantity,
        });

        return res.status(200).json(product);
    }
}

export default new ProductController();
