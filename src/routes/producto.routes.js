
import express from "express";
import { ProductoController } from "../controllers/ProductoController.js";
import { permitirRol, verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
const productoController = new ProductoController();

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestión y búsqueda de productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", verificarToken, (req, res) => productoController.listarProductos(req, res));

/**
 * @swagger
 * /productos/buscar:
 *   post:
 *     summary: Buscar productos por frase inteligente (IA)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [frase]
 *             properties:
 *               frase:
 *                 type: string
 *                 example: "productos electrónicos de menos de 100 soles importados de Japón"
 *     responses:
 *       200:
 *         description: Productos filtrados
 */
router.post("/buscar", verificarToken, (req, res) => productoController.buscarPorFiltros(req, res));

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, precio, categoria, pais_importacion, descripcion]
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               pais_importacion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post("/", verificarToken, permitirRol("admin"), (req, res) => productoController.crearProducto(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", verificarToken, (req, res) => productoController.obtenerProducto(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               categoria:
 *                 type: string
 *               pais_importacion:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/:id", verificarToken, permitirRol("admin"), (req, res) => productoController.actualizarProducto(req, res));

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", verificarToken, permitirRol("admin"),  (req, res) => productoController.eliminarProducto(req, res));

export default router;