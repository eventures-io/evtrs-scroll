'use strict';

var express = require('express');
var controller = require('./article.service');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/query/recent', controller.recent);
router.get('/types/:type', controller.types);
router.post('/', auth.isAuthenticated() ,controller.create);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;