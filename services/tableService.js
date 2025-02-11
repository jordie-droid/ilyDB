const tableRepository = require('../repositories/tableRepository');

const createOrUpdateTable = async ({ schema, data }) => {
  if (!schema || !schema.table || !schema.properties) {
    throw new Error("Schéma invalide.");
  }

  const tableName = schema.table;
  const primaryKey = schema.primaryKey || null;
  const uniqueFields = schema.unique || [];

  let currentData = await tableRepository.getTable(tableName) || [];

  const initialData = [...currentData];

  try {
    data.forEach(item => {
      if (tableRepository.isDuplicate(currentData, item, primaryKey, uniqueFields)) {
        throw new Error(`Doublon détecté : ${JSON.stringify(item)}`);
      }
      currentData.push(item);
    });

    await tableRepository.saveTable(tableName, currentData);
    return { message: "Données insérées avec succès." };

  } catch (error) {
    await tableRepository.saveTable(tableName, initialData);
    throw error;
  }
};

const listTables = async () => {
  return tableRepository.listTables();
};

const getTableData = async (tableName) => {
  const tableData = await tableRepository.getTable(tableName);
  if (!tableData) {
    throw new Error(`Table "${tableName}" introuvable.`);
  }
  return tableData;
};

module.exports = {createOrUpdateTable, listTables, getTableData};
