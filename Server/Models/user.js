const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin']
    },
    incidants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Incident'
    }]
},
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },


    }
);

Schema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

Schema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        next();
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});

Schema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('User', Schema);

module.exports = userModel;