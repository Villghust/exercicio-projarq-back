import * as Yup from 'yup';

import Cryptography from '../../lib/Cryptography';

import User from '../schemas/User';

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

        const userExists = await User.find({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const password_hash = await Cryptography.hash(password);

        const user = await User.create({
            name,
            email,
            password_hash,
        });

        return res.json(user);
    }
}

export default new UserController();
