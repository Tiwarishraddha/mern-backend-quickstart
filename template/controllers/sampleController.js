import Sample from '../models/sampleModel.js';
import generateToken from '../utils/generateToken.js';

export const registerSample = async (req, res) => {
    const { name, email, password } = req.body;
    const sampleExists = await Sample.findOne({ email });

    if (sampleExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const sample = await Sample.create({ name, email, password });

    if (sample) {
        res.status(201).json({
            _id: sample._id,
            name: sample.name,
            email: sample.email,
            token: generateToken(sample._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
};
