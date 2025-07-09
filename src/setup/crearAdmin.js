import { Usuario } from "../data/models/Usuario.js";
import bcrypt from "bcrypt";

export async function crearAdminInicial() {
    
    const correo = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const nombre = process.env.ADMIN_NAME;

    const isExist = await Usuario.findOne({ where: { correo } });
    if (isExist) {
        console.log("El admin ya está registrado");
        return;
    }

    const contraseñaHash = await bcrypt.hash(password, 10);
    const nuevoAdmin = await Usuario.create({
        nombre,
        correo,
        password: contraseñaHash,
        rol: "admin"
    });

    console.log("Admin creado: ", correo)
}