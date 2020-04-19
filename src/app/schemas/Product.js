import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock_quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model('Product', ProductSchema);
