import express from "express";
import { sequelize } from "./config/database.js";
import productoRoutes from "./routes/producto.routes.js";
import { insertarProductosIniciales } from "./data/models/Producto.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import { crearAdminInicial } from "./setup/crearAdmin.js";
import swaggerDocs from "./docs/swagger.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// ruta de producto
app.use("/api/productos", productoRoutes);

// ruta para usuarios
app.use("/api/auth", usuarioRoutes);

swaggerDocs(app);

const iniciarServidor = async () => {
    try {
        await sequelize.sync(); // o `sync({ force: true })` solo en desarrollo
        console.log("🟢 Conectado a la base de datos");

        //await insertarProductosIniciales();

        if (process.env.CREAR_ADMIN === "true") {
            await crearAdminInicial();
        }

        app.listen(PORT, () => {
            console.log(`Servidor iniciado en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

iniciarServidor();
/*

sequelize.sync().then(() => {
    
    console.log("Base de datos conectada.");

    await insertarProductosIniciales();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    })
}).catch(error => console.log("Error al conectar DB", error));
*/