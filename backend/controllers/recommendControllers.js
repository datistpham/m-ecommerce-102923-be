// controllers/recommendationController.js

import express from 'express';
const router = express.Router();
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Route: /api/recommendations/:userId
const recommedations = (async (req, res) => {
  try {
    const { _id: userId } = req.user;
    // Tìm tất cả các đơn hàng của người dùng
    const userOrders = await Order.find({ user: userId });
    // Lấy danh sách sản phẩm đã mua bởi người dùng
    const userProducts = userOrders.flatMap(order => order.orderItems.map(item => item.product));
    const userProductCategories = userProducts.map(product => product.category);
    // Tìm tất cả các đơn hàng khác chứa các sản phẩm đã mua bởi người dùng
    const relatedOrders = await Order.find({ 'orderItems.product': { $in: userProducts }, 'orderItems.product.category': { $in: userProductCategories } });

    // Lấy danh sách sản phẩm đã mua bởi các người dùng khác
    const relatedProducts = relatedOrders.flatMap(order => order.orderItems.map(item => item.product));

    // Loại bỏ các sản phẩm đã mua bởi người dùng hiện tại
    const uniqueRelatedProducts = [...new Set(relatedProducts.filter(product => !userProducts.includes(product)))];

    // Lấy thông tin chi tiết của các sản phẩm được đề xuất
    const recommendedProducts = await Product.find({ _id: { $in: uniqueRelatedProducts } });

    return res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error('Error getting recommended products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

const recommendations2 = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const userOrders = await Order.find({ user: userId });

    const userProducts = userOrders.flatMap(order => order.orderItems.map(item => item.product));

    const relatedOrders = await Order.find({ 'orderItems.product': { $in: userProducts } });

    const relatedProducts = relatedOrders.flatMap(order => order.orderItems.map(item => item.product));

    const uniqueRelatedProducts = [...new Set(relatedProducts.filter(product => !userProducts.includes(product)))];

    // Cải tiến: Sắp xếp sản phẩm theo đánh giá giảm dần
    const recommendedProducts = await Product.find({ _id: { $in: uniqueRelatedProducts } })
      .sort({ rating: -1 })
      .limit(10); // Giới hạn số lượng sản phẩm đề xuất

    return res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error('Error getting recommended products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export default recommedations;
