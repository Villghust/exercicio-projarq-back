import * as Yup from 'yup';

import Purchase from '../schemas/Purchase';

class PurchaseController {
    async store(req, res) {
        const schema = Yup.object().shape({
            total_price: Yup.number().required(),
            product_list: Yup.array(
                Yup.object().shape({
                    id: Yup.string().required(),
                    price: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        let totalPrice = 0;

        req.body.product_list.forEach(
            (product) => (totalPrice += product.price)
        );

        if (req.body.total_price !== totalPrice) {
            return res.status(400).json({
                error:
                    "Total price must be the sum of all the products's price",
            });
        }

        const { _id, total_price, product_list } = await Purchase.create(
            req.body
        );

        return res.status(201).json({ _id, total_price, product_list });
    }

    async list(req, res) {
        const purchases = await Purchase.find()
            .sort({ createdAt: 'desc' })
            .limit(20);

        return res.status(200).json(
            purchases.map((purchase) => {
                const { _id, total_price, product_list, createdAt } = purchase;

                return { _id, total_price, product_list, createdAt };
            })
        );
    }
}

export default new PurchaseController();
