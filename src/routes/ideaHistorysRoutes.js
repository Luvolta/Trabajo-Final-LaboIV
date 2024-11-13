const express = require('express');
const { createIdeaHistory, getIdeaHistories, getIdeaById } = require('../controllers/ideaHistorysController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: IdeaHistory
 *   description: Rutas para el historial de ideas
 */

/**
 * @swagger
 * /api/idea-history:
 *   post:
 *     summary: Crear un nuevo registro en el historial de ideas
 *     tags: [IdeaHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario
 *               ideaId:
 *                 type: integer
 *                 description: ID de la idea
 *               parameterId:
 *                 type: integer
 *                 description: ID del parámetro
 *     responses:
 *       201:
 *         description: Historial de idea creado exitosamente
 *       500:
 *         description: Error al crear el historial de idea
 */
router.post('/', createIdeaHistory);

/**
 * @swagger
 * /api/idea-history/{userId}:
 *   get:
 *     summary: Obtener todo el historial de ideas de un usuario
 *     tags: [IdeaHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Historial de ideas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error al obtener el historial de ideas
 */
router.get('/:userId', getIdeaHistories);

/**
 * @swagger
 * /api/idea-history/idea/{ideaId}:
 *   get:
 *     summary: Obtener el historial de una idea específica
 *     tags: [IdeaHistory]
 *     parameters:
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la idea
 *     responses:
 *       200:
 *         description: Detalles del historial de la idea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Idea no encontrada
 *       500:
 *         description: Error al obtener el historial de la idea
 */
router.get('/idea/:ideaId', getIdeaById);

module.exports = router;
