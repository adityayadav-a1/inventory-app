package com.inventory.app.service;

import com.inventory.app.model.Product;
import com.inventory.app.model.Sales;
import com.inventory.app.repository.ProductRepository;
import com.inventory.app.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepo;

    @Autowired
    private ProductRepository productRepo;

    public Sales makeSale(Sales sale) {

        Product product = productRepo.findById(sale.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 🔥 CRITICAL LOGIC
        if(product.getQuantity() < sale.getQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        product.setQuantity(product.getQuantity() - sale.getQuantity());
        productRepo.save(product);

        return salesRepo.save(sale);
    }
    public List<Sales> getAllSales() {
        return salesRepo.findAll();
    }
}