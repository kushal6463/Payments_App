import { connect, model, Schema } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    }
})


const acountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


const User = model('User', userSchema);
const Account = model('Account', acountSchema)
export { User, Account };