package com.inventory.app.repository;
import com.inventory.app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsByNameAndSupplierId(String name, int supplierId);
    List<Product> findByIsActiveTrue();
}