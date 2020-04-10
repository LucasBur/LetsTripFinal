/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Activity = sequelize.define('activities', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      day: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      startHour: {
        type: DataTypes.TIME,
        allowNull: true
      },
      endHour: {
        type: DataTypes.TIME,
        allowNull: true
      },
      latitude: {
        type: DataTypes.DECIMAL(12, 9),
        allowNull: true
      },
      longitude: {
        type: DataTypes.DECIMAL(12, 9),
        allowNull: true
      }
    }, {
      tableName: 'activities',
      timestamp: false
    });  

    Activity.associate = (models) => {
        Activity.belongsTo(models.roadmaps);
    }
  
    return Activity;
  };
  