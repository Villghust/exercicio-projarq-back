import * as Yup from 'yup';

import Cryptography from '../../lib/Cryptography';

import jwt from 'jsonwebtoken';

import User from '../schemas/User';

import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'You must type a valid user email and password',
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isPasswordValid = await Cryptography.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        const { _id, name } = user;

        return res.json({
            user: { _id, name, email },
            token: jwt.sign({ _id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
