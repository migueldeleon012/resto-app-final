import express from 'express';
import Items from '../models/items.model.js';
const router = express.Router();
router.get('/', (req, res) => {
  Items.find().then((data) => res.send(data));
});
router.post('/', (req, res) => {
  let newItem = new Items(req.body);
  newItem.save().then((data) => res.send('Item Added!'));
});
router.put('/:id', (req, res) => {
  Items.findByIdAndUpdate(req.params.id, req.body).then((data) =>
    res.send(data)
  );
});
router.delete('/:id', (req, res) => {
  Items.findByIdAndDelete(req.params.id).then((data) => {
    res.send('Item deleted');
  });
});
export default router;
