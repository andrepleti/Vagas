'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/post-controller');

router.get('/', controller.get);
router.get('/byId/:id', controller.getById);
router.get('/byCategory', controller.getByCategory);
router.get('/ByTitle/:title?', controller.getByTitle);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;