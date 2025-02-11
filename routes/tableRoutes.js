const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/', tableController.createOrUpdateTable);
router.get('/', tableController.listTables);
router.get('/:tableName', tableController.getTableData);

module.exports = router;
