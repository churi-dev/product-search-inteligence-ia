# 🔍 API de Productos con Búsqueda Inteligente con IA

Este proyecto es una API RESTful construida con **Node.js + Express + Sequelize + MySQL**, que permite realizar:

- CRUD de productos
- Autenticación y autorización con JWT
- Manejo de roles: **admin** y **cliente**
- Búsqueda inteligente con **Gemini (IA)** a partir de frases en lenguaje natural
- Documentación interactiva con **Swagger**
- Despliegue en Docker y Render

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Sequelize (MySQL)
- JWT (autenticación)
- Gemini API (Google Generative AI)
- Swagger (documentación)
- Docker y Docker Compose
- Render (deploy en la nube)

---

## 🧠 Búsqueda Inteligente con IA (Gemini)

Puedes enviar frases como:

```
productos electrónicos de menos de 100 soles importados de Japón
```

La IA transformará la frase en un objeto JSON con filtros como:

```json
{
  "categoria": "electrónicos",
  "precio": { "lt": 100 },
  "pais_importacion": "Japón"
}
```

Y luego busca en la base de datos esos productos.

---

## 📦 Instalación y uso

### 🔁 Opcion 1: Local con Docker Compose (API + MySQL)

```bash
git clone https://github.com/churi-dev/product-search-inteligence-ia.git
cd product-search-inteligence-ia
```

1. Obten tus credenciales y modifica el archivo `docker-compose.yml`
2. Obtén tu clave Gemini desde: [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
3. Genera tu JWT\_SECRET: [https://jwtsecrets.com/#generator](https://jwtsecrets.com/#generator)

### 🚀 Levantar servicios:

```bash
docker-compose up --build
```

- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- API: [http://localhost:3000](http://localhost:3000)

### 🐳 Estructura de servicios

- `mysql`: base de datos persistente en puerto 3307
- `app`: backend Node.js expuesto en 3000

---

### ☁️ Opcion 2: Deploy en Render usando imagen de Docker Hub

1. Crea tu imagen y publícala:

```bash
docker login
docker build -f Dockerfile.render -t tu_usuario_dockerhub/product-search-ia-api:latest .
docker push tu_usuario_dockerhub/product-search-ia-api:latest
```

2. En Render:
   - Crea un nuevo Web Service
   - Selecciona: "Deploy an existing Docker image from Docker Hub"
   - Imagen: `tu_usuario_dockerhub/product-search-ia-api:latest`
   - Variables de entorno (ver `.env.example`)

---

## 📚 Endpoints disponibles

### 🔐 Autenticación

| Método | Ruta             | Descripción                        |
| ------ | ---------------- | ---------------------------------- |
| POST   | `/auth/register` | Registra un nuevo usuario cliente  |
| POST   | `/auth/login`    | Inicia sesión y devuelve token JWT |
| GET    | `/auth/perfil`   | Perfil del usuario autenticado     |


### 📦 Productos

| Método | Ruta                | Descripción                                       |
| ------ | ------------------- | ------------------------------------------------- |
| GET    | `/productos`        | Listar todos los productos                        |
| GET    | `/productos/:id`    | Obtener producto por ID                           |
| POST   | `/productos`        | Crear nuevo producto (**solo admin**)             |
| PUT    | `/productos/:id`    | Actualizar producto (**solo admin**)              |
| DELETE | `/productos/:id`    | Eliminar producto (**solo admin**)                |
| POST   | `/productos/buscar` | Buscar productos con filtros mediante IA (Gemini) |

> Todos los endpoints requieren JWT excepto `/auth/register` y `/auth/login`.

---

## 🔐 Roles y seguridad

- Al registrarse, los usuarios reciben el rol por defecto: `cliente`
- El admin puede:
  - Crear productos
  - Eliminar productos

Tokens JWT se deben enviar en el header:

```http
Authorization: Bearer token_aqui
```

---

## 🛠 Variables de entorno

Ejemplo de `.env`:

```env
DB_NAME=productosdb
DB_USER=appuser
DB_PASSWORD=apppass
DB_HOST=mysql
DB_PORT=3306
JWT_SECRET=clave_segura
GEMINI_API_KEY=tu_api_key_de_gemini
CREAR_DATA=true
CREAR_ADMIN=true
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

---

## 📚 Swagger

- Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Render: `https://{service}.onrender.com/api-docs`

---

## 📁 Archivos relevantes

| Archivo              | Descripción                           |
| -------------------- | ------------------------------------- |
| `Dockerfile`         | Para desarrollo local                 |
| `Dockerfile.render`  | Imagen usada para desplegar en Render |
| `docker-compose.yml` | Levanta `mysql` y `app` localmente    |
| `.env.example`       | Ejemplo de variables necesarias       |
| `README.md`          | Documentación del proyecto            |

---

## 👨‍💻 Autor

Desarrollado por Jhon Churivanti.

---