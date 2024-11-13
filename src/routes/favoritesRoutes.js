const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoritesController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Rutas para gestionar favoritos
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Agrega una idea a favoritos
 *     tags: [Favorites]
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
 *             required:
 *               - userId
 *               - ideaId
 *     responses:
 *       201:
 *         description: Idea agregada a favoritos
 *       400:
 *         description: La idea ya está en favoritos
 *       500:
 *         description: Error al agregar la idea a favoritos
 */
router.post('/', addFavorite);

/**
 * @swagger
 * /api/favorites/{userId}:
 *   get:
 *     summary: Obtiene todas las ideas favoritas de un usuario
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de ideas favoritas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: integer
 *                   ideaId:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   recommendedTechnologies:
 *                     type: string
 *                   designPatterns:
 *                     type: string
 *                   additionalFeatures:
 *                     type: string
 *                   knowledgeLevel:
 *                     type: string
 *                   generationDate:
 *                     type: string
 *                     format: date
 *                   email:
 *                     type: string
 *       500:
 *         description: Error al obtener los favoritos
 */
router.get('/:userId', getFavorites);

/**
 * @swagger
 * /api/favorites/{userId}/{ideaId}:
 *   delete:
 *     summary: Elimina una idea de los favoritos de un usuario
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: ideaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la idea
 *     responses:
 *       200:
 *         description: Idea eliminada de favoritos exitosamente
 *       500:
 *         description: Error al eliminar la idea de favoritos
 */
router.delete('/:userId/:ideaId', removeFavorite);

module.exports = router;
