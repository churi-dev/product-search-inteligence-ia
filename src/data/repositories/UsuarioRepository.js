import { Usuario } from "../models/Usuario.js";

export class UserRepository {

    // buscar por correo
    async buscarPorCorreo(correo) {
        return await Usuario.findOne({ where: { correo } });
    }

    // buscar por id 
    async buscarPorId(id) {
        return await Usuario.findByPk(id);
    }

    // crear nuevo usuario
    async crearUsuario(data) {
        return await Usuario.create(data);
    }
}