const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    ownedDevice: {
        type: [mongoose.Schema.Types.ObjectId],
        default: undefined
    },
    isAdmin: {
        type: String,
        default: "NO"
    }
},
    {
        timestamps: true
    });

userSchema.statics.create = function (payload) {
    const device = new this(payload);
    return device.save();
};

userSchema.statics.findAll = function () {
    return this.find({});
};

userSchema.statics.findOneByUserId = function (_id) {
    return this.findOne().where('_id').equals(_id);
}

userSchema.statics.updateByUserID = function (_id, payload) {
    return this.updateOne(payload).where('_id').equals(_id);
}

userSchema.statics.updateDevice = function (_id, payload) {
    const user = this.findOne().where('_id').equals(_id);
    user.ownedDevice.push(payload.ownedDevice);
    return this.save();
};

userSchema.statics.deleteByUserID = function (_id) {
    return this.deleteOne().where('_id').equals(_id);
}

module.exports = mongoose.model('user', userSchema);