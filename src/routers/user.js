const express = require('express');
const postRouter = express.Router();

const AuthController = require('../controller/authController');
const FriendController = require('../controller/friendController')
const { authenticateUser } = require('../middlewares/authMiddleware');

const validator = require('../middlewares/Validation')
// const authController = new AuthController();

 

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 * /posts:
 *   post:
 *     summary: friend registration
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

postRouter.post('/', AuthController.register);

/**
 * @swagger
 * components:
 *  schemas1:
 *    Post:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 * /posts/login:
 *   post:
 *     summary: login
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas1/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
postRouter.post('/login', AuthController.login);

/**
 * @swagger
 * /posts/{authorization}:
 *   get:
 *     summary: Get a list of users (excluding the authenticated user)
 *     tags: [Users]
 *     parameters:
 *        - name: authorization
 *          in: path
 *          description: An example query parameter
 *          required: false
 *          type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *               schema:
 *                type: array
 *             
 *       500:
 *         description: Server Error
 */
postRouter.get('/:authorization', authenticateUser, FriendController.getUsersList);



/**
 * @swagger

 * /posts/{userIde}/{authorization}:
 *    post:
 *      summary: Your endpoint summary
 *      tags: [friend Request]
 *      description: Detailed description of your endpoint.
 *      parameters:
 *        - name: userIde
 *          in: path
 *          description: An example query parameter
 *          required: false
 *          type: string
 *        - name: authorization
 *          in: path
 *          description: token
 *          required: false
 *          type: string
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Successful response
 *        400:
 *          description: Bad request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal server error

 */

postRouter.post('/:userIde/:authorization', authenticateUser, FriendController.sendFriendRequest)
/**
 * @swagger
 * components:
 *  schemas2:
 *    Post:
 *      type: object
 *      properties:
 *        action:
 *          type: string
 * /posts/respond/{requestId}/{authorization}:
 *   post:
 *     summary: Respond
 *     tags: [Friend Request respond]
 *     parameters:
 *        - name: requestId
 *          in: path
 *          description: An example query parameter
 *          required: false
 *          type: string
 *        - name: authorization
 *          in: path
 *          description: token
 *          required: false
 *          type: string
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas2/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */

postRouter.post('/respond/:requestId/:authorization', authenticateUser, FriendController.respondToFriendRequest);

/**
 * @swagger
 * /posts/listfriends/{authorization}:
 *   get:
 *     summary: Get a list of users (excluding the authenticated user)
 *     tags: [friends]
 *     parameters:
 *        - name: authorization
 *          in: path
 *          description: An example query parameter
 *          required: false
 *          type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *               schema:
 *                type: array
 *             
 *       500:
 *         description: Server Error
 */
postRouter.get('/listfriends/:authorization', authenticateUser, FriendController.listFriends);
console.log('hi')
module.exports = postRouter
