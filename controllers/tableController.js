const tableService = require('../services/tableService');

const createOrUpdateTable = async (req, res) => {
  try {
    const result = await tableService.createOrUpdateTable(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listTables = async (req, res) => {
  const tables = await tableService.listTables();
  res.json(tables);
};

const getTableData = async (req, res) => {
  try {
    const tableData = await tableService.getTableData(req.params.tableName);
    res.json(tableData);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {createOrUpdateTable, listTables, getTableData}
