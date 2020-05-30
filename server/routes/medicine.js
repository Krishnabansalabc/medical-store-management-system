const express = require('express');

const router = express.Router();

// import controller methods
const { create, list, read, update, remove } = require('../controllers/medicine');

router.post('/medicines', create);
router.get('/medicines', list);
router.get('/medicines/:slug', read);
router.put('/medicines/:slug', update);
router.delete('/medicines/:slug', remove);

module.exports = router;
