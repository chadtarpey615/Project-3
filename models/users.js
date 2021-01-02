const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    last_name: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: { type: String, required: true },
    password2: { type: String, required: true },
    groups: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    subgroups: [{ type: Schema.Types.ObjectId, ref: "subgroup"}]

});

const User = mongoose.model("user", message);

module.exports = User;