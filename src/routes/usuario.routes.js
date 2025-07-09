import express from "express";
import { UserController } from "../controllers/UserController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express();
const usuarioController = new UserController();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, correo, password]
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post("/register", (req, res) => usuarioController.registrar(req, res));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con correo y password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [correo, password]
 *             properties:
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token generado
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", (req, res) => usuarioController.login(req, res));


/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario
 *       401:
 *         description: Token inválido o expirado
 */
router.get("/perfil", verificarToken, (req, res) => usuarioController.verPerfil(req, res));

export default router;