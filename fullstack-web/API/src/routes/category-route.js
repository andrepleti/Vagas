'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/category-controller');

router.get('/', controller.get);
router.get('/byId/:id', controller.getById);
router.get('/byDescripton/:description?', controller.getByDescription);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;