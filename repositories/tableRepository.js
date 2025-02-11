const fs = require('fs');
const DB_FILE = require('../databases/database.json');
const dataBaseOperation = require('../utils/database.js');

const getTable = (tableName) => {
  const database = dataBaseOperation.readDatabase();
  return database[tableName] || null;
};

const saveTable = (tableName, data) => {
  const database = dataBaseOperation.readDatabase();
  database[tableName] = data;
  dataBaseOperation.writeDatabase(database);
};

const listTables = () => {
  const database = dataBaseOperation.readDatabase();
  return Object.keys(database);
};

const isDuplicate = (tableData, data, primaryKey, uniqueFields) => {
  return tableData.some(entry => {
    if (primaryKey && entry[primaryKey] === data[primaryKey]) return true;
    return uniqueFields.every(field => entry[field] === data[field]);
  });
};

module.exports={getTable, saveTable, listTables, isDuplicate};