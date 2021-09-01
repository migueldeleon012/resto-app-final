import express from 'express';
import Users from '../models/users.model.js';
const router = express.Router();
router.get('/', (req, res) => {
  Users.find().then((data) => res.send(data));
});

router.get('/:id', (req, res) => {
  Users.findOne({ _id: req.params.id }).then((data) => res.send(data));
});

router.post('/', (req, res) => {
  let newUser = new Users(req.body);
  newUser.save().then((data) => {
    res.send('New User Added!');
  });
});

router.put('/addToCart/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, {
    $addToSet: { cartItems: req.body },
  }).then((data) => res.send('Added a Cart Item'));
});

router.put('/increaseCount/:user_id/:item_id', (req, res) => {
  Users.updateOne(
    {
      _id: req.params.user_id,
      'cartItems._id': req.params.item_id,
    },
    {
      $set: { 'cartItems.$.count': req.body.count },
    }
  ).then((data) => res.send('Item Count Increase'));
});

router.delete('/:user_id/:item_id', (req, res) => {
  Users.findByIdAndUpdate(req.params.user_id, {
    $pull: {
      cartItems: { id: req.params.item_id },
    },
  }).then((data) => res.send('Cart Items Updated'));
});
export default router;
