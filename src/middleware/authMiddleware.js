const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Asume que el token viene en el header 'Authorization: Bearer <token>'

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        req.userId = decoded.userId; // Guarda el userId en la solicitud para su uso posterior
        next();
    });
};

module.exports = authMiddleware;
