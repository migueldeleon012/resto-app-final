import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    username: String,
    password: String,
    cartItems: [
        {
            id: String,
            name: String,
            price: Number,
            image: String,
            category: String,
            count: Number,
        },
    ],
    isAdmin: Boolean,
});
const Users = mongoose.model('Users', UsersSchema);
export default Users;
