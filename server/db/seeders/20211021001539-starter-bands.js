'use strict';

const { Op } = require('sequelize');

const bands = [
  { name: 'The Falling Box' },
  { name: 'America The Piano' },
  { name: 'Loved Autumn' },
  { name: 'Playin Sound' },
  { name: 'The King River' }
];

module.exports = {
  up: async (queryInterface) => {
    // Insert seed data for Bands
    await queryInterface.bulkInsert('Bands', bands);
  },
  down: async (queryInterface) => {
    // Remove seed data for Bands
    await queryInterface.bulkDelete('Bands', { [Op.or]: bands });
  }
};

