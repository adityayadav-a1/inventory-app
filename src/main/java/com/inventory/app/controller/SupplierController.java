package com.inventory.app.controller;

import com.inventory.app.model.Supplier;
import com.inventory.app.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin
public class SupplierController {

    @Autowired
    private SupplierService service;

    @PostMapping
    public Supplier addSupplier(@RequestBody Supplier supplier) {
        return service.addSupplier(supplier);
    }

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return service.getAllSuppliers();
    }
}