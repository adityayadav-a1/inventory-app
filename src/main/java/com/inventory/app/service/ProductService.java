package com.inventory.app.service;

import com.inventory.app.exception.ResourceNotFoundException;
import com.inventory.app.model.Product;
import com.inventory.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public Product addProduct(Product product) {
        if (repo.existsByNameAndSupplierId(product.getName(), product.getSupplierId())) {
            throw new RuntimeException("Product with same name and supplier already exists");
        }
        if(product.getQuantity() < 0){
            throw new RuntimeException("Quantity cannot be negative");
        }
        return repo.save(product);
    }

    public List<Product> getAllProducts() {
        return repo.findByIsActiveTrue();
    }

    public void deleteProduct(int id) {

        Product product = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(false); // 🔥 instead of deleting

        repo.save(product);
    }

    public Product updateProduct(int id, Product updatedProduct) {
        Product product = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));


        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());
        product.setSupplierId(updatedProduct.getSupplierId());

        return repo.save(product);
    }
    public List<Product> getLowStockProducts() {
        return repo.findAll().stream()
                .filter(p -> p.getQuantity() < 5)
                .toList();
    }



}