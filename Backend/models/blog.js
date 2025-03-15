const mongoose = require('mongoose')

const blog = mongoose.Schema({
    date:{
        type:Date,
        require:true
    },
    heading:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    },
    blogImage:{
        type:String,
  },

})

module.exports = mongoose.model("Blog",blog)