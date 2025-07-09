import { UserService } from "../services/UserService.js";

const userService = new UserService();

export class UserController {
    async registrar(req, res) {
        try {
            const nuevoUsuario = await userService.registrarUsuario(req.body);
            res.status(201).json({
                message: "Usuario registrado correctamente",
                data: nuevoUsuario
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const result = await userService.login(req.body);
            res.status(200).json({
                message: "Login exitoso",
                token: result.token,
                usuario: result.usuario
        });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    // perfil user
    async verPerfil(req, res) {
        try {
            const perfil = await userService.obtenerPerfil(req.usuario.id);
            res.status(200).json(perfil);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}