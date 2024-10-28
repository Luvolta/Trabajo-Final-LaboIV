const jwt = require('jsonwebtoken');

const SECRET_KEY = 'tu_clave_secreta'; // Asegúrate de que sea la misma clave que usaste para firmar el token

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        req.userId = decoded.userId; // Guarda el userId en la solicitud para su uso posterior
        next();
    });
};

module.exports = authMiddleware;
