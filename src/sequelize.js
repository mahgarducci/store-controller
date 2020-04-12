const Sequelize = require('sequelize');

module.exports = function (app) {
  const mysql_user = app.get('mysql_user');
  const mysql_pass = app.get('mysql_pass');
  const mysql_host = app.get('mysql_host');
  const mysql_port = app.get('mysql_port');
  const mysql_schema = app.get('mysql_schema');

  const sequelize = new Sequelize(mysql_schema, mysql_user, mysql_pass,  {
    host: mysql_host,
    port: mysql_port,
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

    return result;
  };
};
