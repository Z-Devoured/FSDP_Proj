module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define("Report", {
        cust_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        report_id: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        severity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Report.associate = (models) => {
        Report.belongsTo(models.User, {
            foreignKey: "userId",
            as: 'user'
        });
    };
    return Report;
}
