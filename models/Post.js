const mongoose = require('mongoose');
const { schema } = require('./Profile');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        tyepe: schema.tyepe.objectId,
        ref: 'user'
    },
    Text:{
        type: String,
        required: true
    },
    name:{
        type: String,
    },
    avatar:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:[
        {
            user:{
                tyepe: schema.type.objectId,
                ref: 'user'
            }
        }
    ],
    comments:[
        {
        user:{
            type: schema.type.objectId,
            ref: 'user'
        },
        text:{
            type: String,
        },
        name:{
            type: String,
        },
        avatar:{
            type: String,
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
    ],
    date:{
        type: Date,
        default: Date.now
    }
})

model.exports = mongoose.model('post', PostSchema);