import * as Yup from 'yup';

import Cryptography from '../../lib/Cryptography.js';

import User from '../schemas/User.js';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const password_hash = await Cryptography.hash(password);

        const { _id } = await User.create({
            name,
            email,
            password_hash,
        });

        return res.status(201).json({ _id, name, email });
    }
}

export default new UserController();
