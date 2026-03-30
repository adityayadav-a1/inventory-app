package com.inventory.app.repository;

import com.inventory.app.model.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Integer> {

    void deleteByProductId(int productId); // 🔥 IMPORTANT
}