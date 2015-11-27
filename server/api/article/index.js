'use strict';

var express = require('express');
var service = require('./article.service');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', service.index);
router.get('/:id', service.show);
router.get('/query/recent', service.recent);
router.get('/types/:type', service.types);
router.post('/', auth.isAuthenticated() ,service.create);
router.put('/:id', auth.isAuthenticated(),service.update);
router.delete('/:id', auth.isAuthenticated(), service.destroy);

module.exports = router;