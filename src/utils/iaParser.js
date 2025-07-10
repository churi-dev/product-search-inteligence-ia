import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const googleIa = new GoogleGenAI({ 
    apiKey:  process.env.OPENAI_API_KEY
});

export async function interPretarBusqueda(fraseUsuario) {
    const prompt2 = `
    Frase: "${fraseUsuario}"
    Transforma esta frase en un objeto JSON con filtros para búsqueda de productos. Campos permitidos: nombre, categoria, precio (gt, lt, eq), pais_importacion.

    Ejemplo:
    "productos electrónicos de menos de 100 soles importados de Japón"
    Resultado:
    {
    "categoria": "electrónicos",
    "precio": { "lt": 100 },
    "pais_importacion": "Japón"
    }

    Resultado JSON para la frase actual:
    `;

    const prompt = `Frase: "${fraseUsuario}"
    Convierte esta frase en un objeto JSON con filtros. Campos permitidos: nombre, categoria, descripcion, precio (gt, lt, eq), pais_importacion.
    Ejemplo:
    {
    "nombre": "mochila, mouse, calculadora, etc",
    "categoria": "electrónicos",
    "descripcion": "Mochila ligera",
    "precio": { "lt": 100 },
    "pais_importacion": "Japón"
    }

    Considera lo siguiente:
    - Si el usuario menciona solo un número, asúmelo como filtro de precio.
    - Si menciona algo como "juego de sartenes", asócialo a nombre o descripción.`;

    try {
        const response = await googleIa.models.generateContent({

            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ]
        })

        const output = response.text;

        const match = output.match(/\{[\s\S]*\}/);
            if (match) {
            return JSON.parse(match[0]);
        }

        throw new Error("No se pudo extraer JSON del resultado IA.");

    } catch (error) {
        console.log("Error con gemini: ", error.message);
        return null;
    }
}



