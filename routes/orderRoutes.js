const express = require('express');
const router = express.Router();

const {
    all_orders,
    create_order,
    particular_order,
    order_updated,
    order_Deleted
  } = require("../controllers/orderController");

router.get('/', all_orders );

router.post('/create_order', create_order);

router.get('/:orderId',particular_order);

router.patch('/:orderId',order_updated);

router.delete('/:orderId',order_Deleted);

module.exports = router;