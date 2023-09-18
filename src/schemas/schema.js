const { DataTypes } = require('sequelize');
const db = require('../config/database'); 

const Audio = db.define('Audio', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
});

module.exports = Audio;
