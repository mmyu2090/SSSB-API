const mongoose = require('mongoose');
const deviceSchema = new mongoose.Schema({
    ownerObjectID: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    danger: {
        type: String
    },
    critical: {
        type: String
    },
    active: {
        type: String
    },
    location: {
        type: [String]
    }
},
    {
        timestamps: true
    });

deviceSchema.statics.create = function (payload) {
    const device = new this(payload);
    return device.save();
};

deviceSchema.statics.findAll = function () {
    return this.find({});
};

deviceSchema.statics.findOneByOwnerId = function (ownerObjectID) {
    return this.find().where('ownerObjectID').equals(ownerObjectID);
}

deviceSchema.statics.findDangerDevice = function (danger) {
    return this.find().where('danger').equals(danger);
}

deviceSchema.statics.findCritialDevice = function (critical) {
    return this.find().where('critical').equals(critical);
}

deviceSchema.statics.updateByDeviceID = function (_id, payload) {
    return this.updateOne(payload).where('_id').equals(_id);
}

deviceSchema.statics.updateStatus = function (_id, payload) {
    const device = this.findOne().where('_id').equals(_id);
    device.location.push(payload.location);
    device.danger = payload.danger;
    device.active = payload.active;
    device.critical = payload.critial;
    return this.save();
};

deviceSchema.statics.deleteByDeviceID = function (_id) {
    return this.deleteOne().where('_id').equals(_id);
}

module.exports = mongoose.model('device', deviceSchema);