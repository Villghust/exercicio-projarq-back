import bcryptjs from 'bcryptjs';

const bcrypt = {
    hash: async (password) => {
        return await bcryptjs.hash(password, 8);
    },

    compare: async (password, passwordHash) => {
        return await bcryptjs.compare(password, passwordHash);
    },
};

export default bcrypt;
