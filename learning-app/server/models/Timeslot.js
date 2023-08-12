module.exports = (sequelize, DataTypes) => {
    const Timeslot = sequelize.define("Timeslot", {
        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        timeslot: {
            type: DataTypes.TEXT,
            allowNull: false,
            get() {
                const timeslotString = this.getDataValue('timeslot');
                return timeslotString ? JSON.parse(timeslotString) : [];
            },
            set(timeslotArray) {
                this.setDataValue('timeslot', JSON.stringify(timeslotArray));
            }
        }
    });
    return Timeslot;
}
