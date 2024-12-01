'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Musician through MusicianInstrument
      Instrument.belongsToMany(models.Musician, {
        through: models.MusicianInstrument,
        foreignKey: 'instrumentId',
        otherKey: 'musicianId'
      });
    }
  }
  Instrument.init({
    // Define type with validation
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [1, 255] }
    }
  }, {
    sequelize,
    modelName: 'Instrument',
  });
  return Instrument;
};

