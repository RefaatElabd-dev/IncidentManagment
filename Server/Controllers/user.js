const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/user');


const create = (user) => User.create(user);


const login = async ({ username, password }) => {
    debugger;
    const user = await User.findOne({ username }).exec();
    
    if (!user) throw Error('User_NotFound');

    const isVaildPass = user.validatePassword(password);

    if (!isVaildPass) throw Error('UN_AUTHENTICATED');
    
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '2d' });
    return { 
                ...user.toJSON(),
                 token 
           };
};

const searchUser = async (searched) =>
        await User.find({ username: new RegExp(searched, 'i') }).exec();

const getAll = () => User.find({}).exec();

const editOne = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const getByUserName = (username) => User.findOne({username:username}).exec();

const removeAcc = (id) =>  User.findByIdAndDelete(id).exec();

module.exports = {
    create,
    getAll,
    getByUserName,
    editOne,
    removeAcc,
    login,
    searchUser
};
