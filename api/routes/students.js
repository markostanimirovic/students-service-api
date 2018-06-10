const express = require('express');
const router = express.Router();

const StudentsController = require('../controllers/students');

router.get('/', StudentsController.getAll);
router.get('/:id', StudentsController.getById);
router.post('/', StudentsController.post);
router.put('/:id', StudentsController.put);
router.patch('/:id', StudentsController.patch);
router.delete('/:id', StudentsController.delete);

module.exports = router;