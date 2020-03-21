/* jshint indent: 2 */
var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, 
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    }
  }, 
  {
    tableName: 'users'
  });
  

  User.prototype.validPassword = 
    function(password){
      return bcrypt.compareSync(password, this.password);
    }
    
  return User;
};
