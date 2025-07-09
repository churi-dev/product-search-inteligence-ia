import { Op } from "sequelize";
import { ProductoRepository } from "../data/repositories/ProductoRepository.js";
import { interPretarBusqueda } from "../utils/iaParser.js";

export class ProductoService {
    constructor() {
        this.productoRepository = new ProductoRepository();
    }

    // listar
    async listarProductos() {
        return await this.productoRepository.obtenerTodos();
    }

    // buscar por filtros
    async buscarProductosPorFiltros(filtros) {
        const { frase } = filtros;

        const filtrosIA = await interPretarBusqueda(frase);

        if (!filtrosIA) {
            throw new Error("No se pudo interpretar la frase de búsqueda");
        }

        const filtroSequelize = this.convertirAFiltrosSequelizes(filtrosIA);

        return await this.productoRepository.buscarPorFiltros(filtroSequelize);
    }

    convertirAFiltrosSequelize(filtrosIA) {
        const filtros = {};

        if (filtrosIA.nombre) filtros.nombre = filtrosIA.nombre;
        if (filtrosIA.categoria) filtros.categoria =   filtrosIA.categoria;
        if (filtrosIA.pais_importacion) filtros.pais_importacion = filtrosIA.pais_importacion;

        if (filtrosIA.precio) {
            const precio = {};
            if (filtrosIA.precio.lt) precio[Op.lt] = filtrosIA.precio.lt;
            if (filtrosIA.precio.gt) precio[Op.gt] = filtrosIA.precio.gt;
            if (filtrosIA.precio.eq) precio[Op.eq] = filtrosIA.precio.eq;
            filtros.precio = precio;
        }

        return filtros;
    }

    convertirAFiltrosSequelizes(filtrosIA) {
        const filtros = {};

        if (filtrosIA.nombre) {
            filtros.nombre = { [Op.like]: `%${filtrosIA.nombre}%` };
        }

        if (filtrosIA.descripcion) {
            filtros.descripcion = { [Op.like]: `%${filtrosIA.descripcion}%` };
        }

        if (filtrosIA.categoria) {
            filtros.categoria = { [Op.like]: `%${filtrosIA.categoria}%` };
        }

        if (filtrosIA.pais_importacion) {
            filtros.pais_importacion = { [Op.like]: `%${filtrosIA.pais_importacion}%` };
        }

        if (filtrosIA.precio) {
            const precio = {};
            if (filtrosIA.precio.lt) precio[Op.lt] = filtrosIA.precio.lt;
            if (filtrosIA.precio.gt) precio[Op.gt] = filtrosIA.precio.gt;
            if (filtrosIA.precio.eq) precio[Op.eq] = filtrosIA.precio.eq;
            filtros.precio = precio;
        }

        return filtros;
    }

    // crear producto
    async crearProducto(data) {
        if (!data.nombre || !data.precio || !data.categoria || !data.pais_importacion || !data.descripcion) {
            throw new Error("Faltan campos obligatorios");
        }

        return await this.productoRepository.crearProducto(data);
    }

    // obtener producto por su ID
    async obtenerProducto(id) {
        const producto = await this.productoRepository.buscarPorId(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return producto;
    }

    // actualizar producto
    async actualizarProducto(id, data) {
        const updated = await this.productoRepository.actualizarProducto(id, data);
        if (!updated) {
            throw new Error("Producto no encontrado para actualizar");
        }
        return updated;
    }

    // eliminar producto
    async eliminarProducto(id) {
        const deleted = await this.productoRepository.eliminarProducto(id);
        if (!deleted) {
            throw new Error("Producto no encontrado para eliminar");
        }
        return deleted;
    }
    
}