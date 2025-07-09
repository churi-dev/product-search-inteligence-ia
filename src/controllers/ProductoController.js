import { ProductoService } from "../services/ProductoService.js";

const productoService = new ProductoService();

export class ProductoController {

    // GET
    async listarProductos(req, res) {
        try {
            const productos = await productoService.listarProductos();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //   POST buscar filtros
    async buscarPorFiltros(req, res) {
        try {
            const filtros = req.body;
            const productos = await productoService.buscarProductosPorFiltros(filtros);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // POST: /productos/
    async crearProducto(req, res) {
        try {
            const newProducto = await productoService.crearProducto(req.body);
            res.status(201).json(newProducto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // GET: /productos/:id
    async obtenerProducto(req, res) {
        try {
            const { id } = req.params;
            const producto = await productoService.obtenerProducto(id);
            res.status(200).json(producto);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    } 

    // PUT: /productos/:id
    async actualizarProducto(req, res) {
        try {
            const { id } = req.params;
            const productoActualizado = await productoService.actualizarProducto(id, req.body);
            res.status(200).json(productoActualizado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // DELETE /productos/:id
    async eliminarProducto(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await productoService.eliminarProducto(id);
            res.status(200).json({ message: "Producto eliminado", data: eliminado });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}