import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const PurchaseSchema = new Schema(
    {
        total_price: {
            type: Number,
            required: true,
        },
        product_list: {
            type: [ProductSchema],
            required: true,
        },
        session_id: {
            type: Schema.Types.ObjectId,
            ref: 'Session',
            required: true,
        },
        payment_type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model('Purchase', PurchaseSchema);
