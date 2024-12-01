'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Musician extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Band
      Musician.belongsTo(models.Band, { foreignKey: 'bandId' });

      // Define association with Instrument through MusicianInstrument
      Musician.belongsToMany(models.Instrument, {
        through: models.MusicianInstrument,
        foreignKey: 'musicianId',
        otherKey: 'instrumentId'
      });
    }
  }
  Musician.init({
    // Define firstName with validation
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] }
    },
    // Define lastName with validation
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 255] }
    },
    // Define bandId to associate musician with a band
    bandId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Musician',
  });
  return Musician;
};

