import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Productos con Búsqueda Inteligente",
            version: "1.0.0",
            description: "Documentación de la API Node.js + JWT + Sequelize + IA (Gemini)",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
        {
            bearerAuth: [],
        },
        ],
    },
    apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;