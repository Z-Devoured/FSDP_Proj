module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("Booking", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        bookingStatus: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "On-going" // Assuming the default booking status is "On-going"
        },
        location: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        timeslot: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        chosendate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW // Set the default value to the current date
          }
    });
    return Booking;
}