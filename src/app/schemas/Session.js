import { Schema, model } from 'mongoose';

const SessionSchema = new Schema(
    {
        is_valid: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default model('Session', SessionSchema);
