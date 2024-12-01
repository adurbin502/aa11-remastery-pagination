'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Musician
      Band.hasMany(models.Musician, {
        foreignKey: 'bandId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Band.init({
    // Define name with validation
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [1, 255] }
    }
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};
