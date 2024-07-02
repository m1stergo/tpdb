const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.get('/incidents/by-department/:id', incidentController.getByDepartment);
router.get('/incidents/by-month/:id', incidentController.getByMonth);
router.get('/incidents/by-category/:id', incidentController.getByCategory);


module.exports = router;
