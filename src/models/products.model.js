// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define('products', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qtStock: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    unityValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stockValue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    percentSell: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.01
    },
    productPhoto: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  products.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return products;
};
