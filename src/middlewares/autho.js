import jwt from 'jsonwebtoken';

function autho(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {

        const decodedPayload = jwt.verify(token, process.env.CAPSTONE_SECRET_KEY);
        req.user = decodedPayload;
        next();

    } catch (ex) {
        res.status(400).send('Invalid token');
    }

}

export default autho;