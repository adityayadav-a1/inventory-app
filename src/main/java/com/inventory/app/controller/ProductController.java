package com.inventory.app.controller;

import com.inventory.app.model.Product;
import com.inventory.app.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService service;

    // ADD
    @PostMapping
    public Product add(@RequestBody Product p) {
        return service.addProduct(p);
    }

    // GET ALL
    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product update(@PathVariable int id, @RequestBody Product p) {
        return service.updateProduct(id, p);
    }

    // DELETE (🔥 REAL DELETE)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        service.deleteProduct(id);
        return "Product deleted successfully";
    }
}