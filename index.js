const express = require('express');
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/tables', tableRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
