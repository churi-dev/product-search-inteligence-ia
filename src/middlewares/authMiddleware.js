import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

export function permitirRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({ message: "Acceso no autorizado" });
        }
        next();
    }
}