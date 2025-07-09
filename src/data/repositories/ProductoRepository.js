import { Producto } from "../models/Producto.js";

export class ProductoRepository {

    // listar todos los productos
    async obtenerTodos() {
        return await Producto.findAll();
    }

    // buscar productos con filtros dinamicos
    async buscarPorFiltros(filtros) {
        return await Producto.findAll({ where: filtros });
    }

    // crear nuevo producto
    async crearProducto(data) {
        return await Producto.create(data);
    }
    // buscar producto por id
    async buscarPorId(id) {
        return await Producto.findByPk(id);
    }

    // actualizar producto
    async actualizarProducto(id, data) {
        const producto = await this.buscarPorId(id);
        if (!producto) return null;

        await producto.update(data);
        return producto;
    }

    // eliminar producto
    async eliminarProducto(id) {
        const producto = await this.buscarPorId(id);
        if (!producto) return null;

        await producto.destroy();
        return producto;
    }
}