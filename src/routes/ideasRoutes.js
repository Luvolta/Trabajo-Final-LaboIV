const express = require('express');
const router = express.Router();

const ideasController = require('../controllers/ideasController');
const authMiddleware = require('../middleware/authMiddleware'); // Si usas autenticación

/**
 * @swagger
 * /api/ideas:
 *   post:
 *     summary: Crear una nueva idea
 *     description: Crea una nueva idea de proyecto.
 *     tags:
 *       - Ideas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:              
 *               description:
 *                 type: string
 *                 description: Descripción de la idea.
 *               userId:
 *                 type: integer
 *                 description: ID del usuario que crea la idea.
 *     responses:
 *       201:
 *         description: Idea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Idea creada exitosamente
 *       400:
 *         description: Los campos título, descripción y userId son obligatorios.
 *       500:
 *         description: Error al crear la idea.
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, ideasController.createIdea);  // Requiere autenticación

/**
 * @swagger
 * /api/ideas:
 *   get:
 *     summary: Obtener todas las ideas
 *     description: Devuelve todas las ideas disponibles.
 *     tags:
 *       - Ideas
 *     responses:
 *       200:
 *         description: Lista de todas las ideas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer                 
 *                   description:
 *                     type: string
 *                   userId:
 *                     type: integer
 *       500:
 *         description: Error al obtener las ideas.
 */
router.get('/', ideasController.getAllIdeas);

/**
 * @swagger
 * /api/ideas/{id}:
 *   get:
 *     summary: Obtener una idea por ID
 *     description: Devuelve una idea específica basada en el ID proporcionado.
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la idea que se quiere obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Idea encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer                
 *                 description:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       404:
 *         description: Idea no encontrada.
 *       500:
 *         description: Error al obtener la idea.
 */
router.get('/:id', ideasController.getIdeaById);

/**
 * @swagger
 * /api/ideas/{id}:
 *   put:
 *     summary: Actualizar una idea
 *     description: Actualiza el título y la descripción de una idea existente.
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la idea a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:              
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la idea.
 *     responses:
 *       200:
 *         description: Idea actualizada exitosamente.
 *       400:
 *         description: Los campos título y descripción son obligatorios.
 *       500:
 *         description: Error al actualizar la idea.
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authMiddleware, ideasController.updateIdea);  // Requiere autenticación

/**
 * @swagger
 * /api/ideas/{id}:
 *   delete:
 *     summary: Eliminar una idea
 *     description: Elimina una idea especificada por el ID.
 *     tags:
 *       - Ideas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la idea que se desea eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Idea eliminada exitosamente.
 *       404:
 *         description: Idea no encontrada.
 *       500:
 *         description: Error al eliminar la idea.
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, ideasController.deleteIdea);  // Requiere autenticación

module.exports = router;
