const express = require('express');
const {
  addFavorite,
  getFavorites
} = require('../controllers/favoritesController');
const router = express.Router();

/**
 * @openapi
 * '/api/favorites':
 *   post:
 *     description: Ruta para agregar ideas a favoritos
 *     summary: Ruta para agregar ideas a favoritos
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *         userId:
 *           type: integer
 *         ideaId:
 *           type: integer
 *         required:
 *           - ideaId
 *           - userId
 *   responses:
 *     '201':
 *       description: CREATED
 *       content:
 *         'application/json':
 *           schema:
 *             type: object
 *             properties:
 *             message:
 *               type: string
 *     '500':
 *       description: Error del servidor
 *       content:
 *         'application/json':
 *         schema:
 *           type: object
 *           properties:
 *           message:
 *             type: string
 *
 *   get:
 *     description: Ruta para obtener ideas favoritas
 *     summary: Ruta para obtener ideas favoritas
 *     responses:
 *         '200':
 *           description: OK
 *           content:
 *             'application/json':
 *               schema:
 *                 type: object
 *         '500':
 *           description: Error del servidor
 *           content:
 *             'application/json':
 *           schema:
 *            type: object
 *             properties:
 *               message:
 *               type: string
 */
router.post('/', addFavorite);
router.get('/', getFavorites);

module.exports = router;
