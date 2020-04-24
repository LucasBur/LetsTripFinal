module.exports = function(sequelize, DataTypes) {
    const user_roadmap = sequelize.define('user_roadmap', {
        roadmapId: {
            type: DataTypes.INTEGER(11),
            allowNull: false    
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        isLeader: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        tableName: 'user_roadmap'
    });

    return user_roadmap;
}