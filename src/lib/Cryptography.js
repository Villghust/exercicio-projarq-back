import { hash, compare } from 'bcryptjs';

module.exports = {
    hash: async (password) => {
        return await hash(password, 8);
    },

    compare: async (password, oldPassword) => {
        return await compare(password, oldPassword);
    },
};
