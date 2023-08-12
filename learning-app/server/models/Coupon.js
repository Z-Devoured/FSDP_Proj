module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define("Coupon", { 
        couponCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isRedeemed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Coupon.associate = (models) => {
        Coupon.belongsTo(models.User, { 
            foreignKey: "userId",
            as: 'user'
        });
    };

    return Coupon;
}