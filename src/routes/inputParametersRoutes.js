const express = require('express');
const router = express.Router();
const { generateAndLogIdea } = require('../controllers/inputParametersController');

/**
 * @swagger
 * tags:
 *   name: IdeaGeneration
 *   description: Generación y almacenamiento de ideas de proyecto.
 */

/**
 * @swagger
 * /api/input-parameters:
 *   post:
 *     summary: Genera y guarda una idea de proyecto
 *     tags: [IdeaGeneration]
 *     description: Genera una idea de proyecto utilizando los parámetros proporcionados y la API de Google Generative AI, y la guarda en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 description: Tema del proyecto
 *                 example: "Desarrollo Web"
 *               technologies:
 *                 type: string
 *                 description: Tecnologías recomendadas para el proyecto
 *                 example: "React, Node.js, MySQL"
 *               knowledgeLevel:
 *                 type: string
 *                 description: Nivel de conocimiento requerido para el proyecto
 *                 example: "Intermedio"
 *               preferredDesignPatterns:
 *                 type: string
 *                 description: Patrones de diseño preferidos para el proyecto
 *                 example: "MVC, Factory"
 *               description:
 *                 type: string
 *                 description: Descripción del proyecto (mínimo 10 caracteres)
 *                 minLength: 10
 *                 example: "Aplicación web para gestionar tareas diarias."
 *               purpose:
 *                 type: string
 *                 description: Propósito del proyecto
 *                 example: "Facilitar la organización personal y el seguimiento de tareas"
 *               userId:
 *                 type: integer
 *                 description: ID del usuario que genera la idea
 *                 example: 123
 *             required:
 *               - theme
 *               - technologies
 *               - knowledgeLevel
 *               - preferredDesignPatterns
 *               - description
 *               - purpose
 *               - userId
 *     responses:
 *       201:
 *         description: Idea generada y guardada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                   example: "Idea generada y guardada exitosamente"
 *                 nameIdea:
 *                   type: string
 *                   description: Nombre de la idea generada
 *                   example: "Gestión de Tareas"
 *       400:
 *         description: Error de validación de los parámetros de entrada
 *       500:
 *         description: Error interno en el servidor o al generar la idea
 */

router.post('/', generateAndLogIdea);

module.exports = router;
