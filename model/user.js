const mongoose=require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true})
const Schema = mongoose.Schema;

let userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_time:{
        type:Date,
        //这里不能写Date.now()，会立即调用
        //当你去new model的时候，如果没有传递create_time，则mongoose就会调
        //用default指定的Data.now方法，使用其返回值作为默认值
        default:Date.now
    },
    last_modify_time:{
        type:Date,
        default:Date.now
    },
    avater:{
        type:String,
        default:'/public/img/avater-max-img.png'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[-1,0,1],
        default:-1
    },
    birthday:{
        type:Date
    },
    status:{
        type:Number,
        //0没有权限限制
        //1不可以评论
        //2不可以登录
        enum:[0,1,2],
        default:0
    }

});
module.exports=mongoose.model('User',userSchema);