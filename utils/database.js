const fs = require('fs');
const DB_FILE = './database.json';

exports.readDatabase = () => {
  if (!fs.existsSync(DB_FILE)) return {};
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

exports.writeDatabase = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};
