// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const myController = require('../controllers/my_controller');

// Initialization
const router = Router();

// Routes
router.get('/', myController.method1);
router.post('/', myController.method2);

// Export
module.exports = router;
