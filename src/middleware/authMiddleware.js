const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || 'secret'; // Asegúrate de que la clave secreta sea correcta

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    // Validación para verificar si el token está presente y sigue el formato esperado
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Formato de token incorrecto o no proporcionado.' });
    }

    // Obtener el valor del token sin "Bearer"
    const tokenValue = token.split(' ')[1];

    console.log('Token después de split:', tokenValue);
    console.log("Clave secreta utilizada:", secretKey);

    try {
        // Verificar el token
        const decoded = jwt.verify(tokenValue, secretKey);
        console.log('Token decodificado:', decoded);

        // Asignar datos decodificados a la solicitud
        req.userId = decoded.userId; // Ajusta esto según los datos que necesites

        // Continuar con la siguiente función de middleware o controlador
        next();
    } catch (err) {
        // Capturar cualquier error de verificación del token
        console.error('Error de verificación de token:', err);
        return res.status(401).json({ message: "Token inválido." });
    }
};

module.exports = authMiddleware;
