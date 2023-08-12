module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'  
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Coupon, {
            foreignKey: "userId",
            onDelete: "cascade"
        });
    };

    return User;
}