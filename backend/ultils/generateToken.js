import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN || "12345678", {
        expiresIn: '14d',
    });
};

export default generateToken;