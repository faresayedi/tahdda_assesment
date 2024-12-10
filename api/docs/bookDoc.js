/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 * 
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add
 *     description: This endpoint allows user to add a book.
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - publishedDate
 *               - numberOfPages
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *                 description: The book title
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *                 description: The book author
 *               publishedDate:
 *                 type: string
 *                 example: "1925-04-10"
 *                 description: The book published date
 *               numberOfPages:
 *                 type: number
 *                 example: 180
 *                 description: The book page count
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      _id:
 *                          type: string
 *                          example: "6758857a9053f9622f1fa2ff"
 *                          description: The book unique id    
 *                      title:
 *                          type: string
 *                          example: "The Great Gatsby"
 *                          description: The book title
 *                      author:
 *                          type: string
 *                          example: "F. Scott Fitzgerald"
 *                          description: The book author
 *                      publishedDate:
 *                          type: string
 *                          example: "1925-04-10"
 *                          description: The book published date
 *                      numberOfPages:
 *                          type: number
 *                          example: 180
 *                          description: The book page count
 *                      createdAt:
 *                          type: string 
 *                          format: date-time
 *                          example: "2024-12-10T18:16:26.483+00:00"
 *                          description: The book creation date & time in ISO 8601 format
 *                      updatedAt:
 *                          type: string
 *                          format: date-time
 *                          example: "2024-12-10T18:16:26.483+00:00"
 *                          description: The book last modification date & time in ISO 8601 format             
 *      
 *       400:
 *         description: fail response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get All
 *     description: This endpoint allows user to list all books with pagination.
 *     tags: [Books]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      pagination:
 *                          type: object
 *                          properties:
 *                              current:
 *                                  type: number
 *                                  example: 1
 *                                  description: active page
 *                              total:
 *                                  type: number
 *                                  example: 1
 *                                  description: total pages
 *                      books:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "6758857a9053f9622f1fa2ff"
 *                                      description: The book unique id    
 *                                  title:
 *                                      type: string
 *                                      example: "The Great Gatsby"
 *                                      description: The book title
 *                                  author:
 *                                      type: string
 *                                      example: "F. Scott Fitzgerald"
 *                                      description: The book author
 *                                  publishedDate:
 *                                      type: string
 *                                      example: "1925-04-10"
 *                                      description: The book published date
 *                                  numberOfPages:
 *                                      type: number
 *                                      example: 180
 *                                      description: The book page count
 *                                  createdAt:
 *                                      type: string 
 *                                      format: date-time
 *                                      example: "2024-12-10T18:16:26.483+00:00"
 *                                      description: The book creation date & time in ISO 8601 format
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2024-12-10T18:16:26.483+00:00"
 *                                      description: The book last modification date & time in ISO 8601 format             
 *      
 *       400:
 *         description: fail response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: This endpoint allows user to get a book using its unique identifier
 *     tags: [Books]
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6758857a9053f9622f1fa2ff"
 *                       description: The book unique id    
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                       description: The book title
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                       description: The book author
 *                     publishedDate:
 *                       type: string
 *                       example: "1925-04-10"
 *                       description: The book published date
 *                     numberOfPages:
 *                       type: number
 *                       example: 180
 *                       description: The book page count
 *                     createdAt:
 *                       type: string 
 *                       format: date-time
 *                       example: "2024-12-10T18:16:26.483+00:00"
 *                       description: The book creation date & time in ISO 8601 format
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-10T18:16:26.483+00:00"
 *                       description: The book last modification date & time in ISO 8601 format       
 *      
 *       400:
 *         description: fail response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Edit book by ID
 *     description: This endpoint allows user to edit book using its unique identifier
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *                 description: The book title
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *                 description: The book author
 *               publishedDate:
 *                 type: string
 *                 example: "1925-04-10"
 *                 description: The book published date
 *               numberOfPages:
 *                 type: number
 *                 example: 180
 *                 description: The book page count 
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6758857a9053f9622f1fa2ff"
 *                       description: The book unique id    
 *                     title:
 *                       type: string
 *                       example: "The Great Gatsby"
 *                       description: The book title
 *                     author:
 *                       type: string
 *                       example: "F. Scott Fitzgerald"
 *                       description: The book author
 *                     publishedDate:
 *                       type: string
 *                       example: "1925-04-10"
 *                       description: The book published date
 *                     numberOfPages:
 *                       type: number
 *                       example: 180
 *                       description: The book page count
 *                     createdAt:
 *                       type: string 
 *                       format: date-time
 *                       example: "2024-12-10T18:16:26.483+00:00"
 *                       description: The book creation date & time in ISO 8601 format
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-10T18:16:26.483+00:00"
 *                       description: The book last modification date & time in ISO 8601 format       
 *      
 *       400:
 *         description: fail response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: This endpoint allows user to delete book using its unique identifier
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book
 *     responses:
 *       200:
 *         description: success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *       404:
 *         description: fail response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 */
