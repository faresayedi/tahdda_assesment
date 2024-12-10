/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for managing authentification
 */

/**
 * @swagger
 * /auth/sign_up:
 *   post:
 *     summary: Create account
 *     description: This endpoint allow user to create account .
 *     tags: [Auth]  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The user's password  
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */