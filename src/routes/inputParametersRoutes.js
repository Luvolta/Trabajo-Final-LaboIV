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
 * /api/ideas/generate:
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
 *               technologies:
 *                 type: string
 *                 description: Tecnologías recomendadas para el proyecto
 *               knowledgeLevel:
 *                 type: string
 *                 description: Nivel de conocimiento requerido para el proyecto
 *               preferredDesignPatterns:
 *                 type: string
 *                 description: Patrones de diseño preferidos para el proyecto
 *               description:
 *                 type: string
 *                 description: Descripción del proyecto
 *               purpose:
 *                 type: string
 *                 description: Propósito del proyecto
 *               userId:
 *                 type: integer
 *                 description: ID del usuario que genera la idea
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
 *                 nameIdea:
 *                   type: string
 *                   description: Nombre de la idea generada
 *       400:
 *         description: Error de validación de los parámetros de entrada
 *       500:
 *         description: Error interno en el servidor o al generar la idea
 */

router.post('/', generateAndLogIdea);

module.exports = router;
