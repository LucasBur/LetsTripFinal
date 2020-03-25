/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const RoadMap = sequelize.define('roadmaps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nbr_participants: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    budget: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    leader: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'roadmaps',
    timestamp: false
  });

  RoadMap.associate = (models) => {
    RoadMap.belongsToMany(models.users, {
      through: 'user_roadmap'
    });

    RoadMap.hasMany(models.activities);
  };  

  return RoadMap;
};
