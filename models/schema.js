class schema {
  constructor(
    tableName,
    properties,
    primaryKey = null,
    unique = [],
    required = []
  ) {
    this.tableName = tableName;
    this.properties = properties;
    this.primaryKey = primaryKey;
    this.unique = unique;
    this.required = required;
  }

  validate(data) {
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
    return errors.length ? errors : "Validation réussie !";
  }
}

module.exports = schema;
