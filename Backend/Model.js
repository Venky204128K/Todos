const mongoos = require("mongoose");
const mongooscheme = new mongoos.Schema({
    text:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    }
})
const todoModel= mongoos.model('todos',mongooscheme)
module.exports = todoModel;
