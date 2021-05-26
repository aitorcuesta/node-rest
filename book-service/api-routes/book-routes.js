const express = require('express');
const router = express.Router();

const controller = require('../controller/bookController')

router.get('/find/all', controller.findAll)
router.get('/find/:id', controller.findById)
router.post('/create', controller.create)
router.post('/update/:id', controller.update)
router.post('/delete/:id', controller.delete)

module.exports = router