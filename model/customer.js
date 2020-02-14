var mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema ({
    portfolio_owner_name: {type: String, default:null},
    name: String,
    email: {type: String, required: true},
    phone: {type: String, required:true},
    subject: {type: String, default: null},
    description: {type: String, default: null},
});

module.exports = mongoose.model('Customer', CustomerSchema);