import bcrypt from 'bcryptjs';

module.exports = {
    hash: (password) => {
        return bcrypt.hash(password, 8);
    },

    compare: (password, oldPassword) => {
        return bcrypt.compare(password, oldPassword);
    },
};
