import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  username: String,
  password: String,
  cartItems: [
    {
      _id: String,
      count: Number,
    },
  ],
  isAdmin: Boolean,
});
const Users = mongoose.model('Users', UsersSchema);
export default Users;
