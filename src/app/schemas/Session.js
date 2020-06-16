import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema(
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

export default mongoose.model('Session', SessionSchema);
