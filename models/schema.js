class schema {
  constructor(
    tableName,
    properties,
    primaryKey = null,
    unique = [],
    required = [],
    foreignKeys = []
  ) {
    this.tableName = tableName;
    this.properties = properties;
    this.primaryKey = primaryKey;
    this.unique = unique;
    this.required = required;
    this.foreignKeys = foreignKeys;
  }

  validate(data, relatedTables = {}) {
    const errors = [];
    this.required.forEach((key) => {
      if (!data.hasOwnProperty(key)) {
        errors.push(`Le champ "${key}" est requis.`);
      }
    });

    for (let key in data) {
      const expectedType = this.properties[key];
      if (expectedType && typeof data[key] !== expectedType) {
        errors.push(`Le champ "${key}" doit être de type "${expectedType}".`);
      }
    }

    this.foreignKeys.forEach((foreignKey) => {
      const { field, references } = foreignKey;
      const relatedTable = relatedTables[references.table];
      if (relatedTable) {
        const validIds = relatedTable.map((row) => row[references.field]);
        if (!validIds.includes(data[field])) {
          errors.push(
            `La valeur du champ "${field}" (${data[field]}) doit exister dans "${references.table}.${references.field}".`
          );
        }
      } else {
        errors.push(`Table de référence "${references.table}" introuvable.`);
      }
    });

    return errors.length ? errors : "Validation réussie !";
  }
}

module.exports = schema;
