package com.java.hminhhoangdev.service.impl;

import com.java.hminhhoangdev.model.Order;
import com.java.hminhhoangdev.model.OrderDetail;
import com.java.hminhhoangdev.model.Product;
import com.java.hminhhoangdev.repository.OrderDetailRepository;
import com.java.hminhhoangdev.repository.OrderRepository;
import com.java.hminhhoangdev.repository.ProductRepository;
import com.java.hminhhoangdev.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createOrderDetail(int orderId, int productId, int quantity) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setQuantity(quantity);

        orderDetailRepository.save(orderDetail);

        order.getOrderDetails().add(orderDetail);

        orderRepository.save(order);
    }
}
