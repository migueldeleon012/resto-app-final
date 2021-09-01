import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ItemsSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    category: String,
    count: Number,
});
const Items = mongoose.model('Items', ItemsSchema);
export default Items;
