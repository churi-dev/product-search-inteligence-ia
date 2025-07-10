import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

export const Producto = sequelize.define("Producto2", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais_importacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, 
{
    tableName: "productos2",
    timestamps: true
});


export const insertarProductosIniciales = async () => {
    const count = await Producto.count();

    if (count === 0) {
        await Producto.bulkCreate([
            {
                nombre: "Auriculares Inalámbricos",
                precio: 89.99,
                categoria: "Electrónica",
                pais_importacion: "China",
                descripcion: "Auriculares Bluetooth con cancelación de ruido y batería de larga duración."
            },
            {
                nombre: "Cafetera Italiana",
                precio: 45.50,
                categoria: "Hogar",
                pais_importacion: "Italia",
                descripcion: "Cafetera de aluminio para preparar espresso de manera tradicional."
            },
            {
                nombre: "Smartwatch Deportivo",
                precio: 120.00,
                categoria: "Tecnología",
                pais_importacion: "Corea del Sur",
                descripcion: "Reloj inteligente con monitor de ritmo cardíaco y GPS integrado."
            },
            {
                nombre: "Silla Ergonómica",
                precio: 210.75,
                categoria: "Oficina",
                pais_importacion: "Alemania",
                descripcion: "Silla con soporte lumbar ajustable y reposabrazos regulables."
            },
            {
                nombre: "Lámpara LED de Escritorio",
                precio: 29.99,
                categoria: "Iluminación",
                pais_importacion: "Japón",
                descripcion: "Lámpara con control táctil, intensidad ajustable y puerto USB."
            },
            {
                nombre: "Mochila Antirrobo",
                precio: 38.20,
                categoria: "Accesorios",
                pais_importacion: "España",
                descripcion: "Mochila resistente al agua con compartimentos secretos y cargador USB."
            },
            {
                nombre: "Set de Sartenes de Cerámica",
                precio: 76.40,
                categoria: "Cocina",
                pais_importacion: "Francia",
                descripcion: "Juego de sartenes antiadherentes ecológicas sin PFOA."
            },
            {
                nombre: "Teclado Mecánico RGB",
                precio: 98.00,
                categoria: "Computación",
                pais_importacion: "Estados Unidos",
                descripcion: "Teclado con retroiluminación RGB y switches táctiles para gamers."
            },
            {
                nombre: "Zapatillas Running Pro",
                precio: 150.00,
                categoria: "Deportes",
                pais_importacion: "Brasil",
                descripcion: "Zapatillas ligeras y transpirables para corredores profesionales."
            },
            {
                nombre: "Purificador de Aire",
                precio: 199.90,
                categoria: "Salud",
                pais_importacion: "Suecia",
                descripcion: "Purificador con filtro HEPA para eliminar alérgenos y contaminantes."
            }
        ]);
        console.log("10 productos iniciales insertados.");
    } else {
        console.log("Ya existen productos en la base de datos.");
    }
};