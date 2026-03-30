package com.inventory.app.service;

import com.inventory.app.model.Supplier;
import com.inventory.app.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository repo;

    public Supplier addSupplier(Supplier supplier) {
        return repo.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return repo.findAll();
    }
}