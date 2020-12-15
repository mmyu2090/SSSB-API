const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^.{4,12}$/, 'Should be 4-12 characters!'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        select: false
    },
    name: {
        type: String,
        required: [true, 'Name is required!'],
        match: [/^.{4,12}$/, 'Should be 4-12 characters!'],
        trim: true
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Should be a vaild email address!'],
        trim: true
    },
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
        timestamps: true,
        toObject: { virtuals: true }
    });
    

userSchema.statics.create = function (payload) {
    const user = new this(payload);
    return user.save();
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