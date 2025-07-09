import { UserRepository } from "../data/repositories/UsuarioRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // registro
    async registrarUsuario({ nombre, correo, password }) {
        const existUser = await this.userRepository.buscarPorCorreo(correo);

        if (existUser) {
            throw new Error("El correo ya está registrado.");
        }

        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.crearUsuario({
            nombre, 
            correo,
            password: contrasenaHash,
            rol: "cliente"
        });

        return {
            id: newUser.id,
            nombre: newUser.nombre,
            correo: newUser.correo,
            rol: newUser.rol
        };
    }

    // login
    async login({ correo, password }) {
        const usuario = await this.userRepository.buscarPorCorreo(correo);
        if (!usuario) {
            throw new Error("Correo o constraseña incorrectos.");
        }

        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            throw new Error("Correo o contraseña incorrectos.");
        }

        // generar token
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return {
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        };
    }

    // obtener usuario
    async obtenerPerfil(id) {
        const user = await this.userRepository.buscarPorId(id);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        return {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol
        };
    }
}