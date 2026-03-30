package com.inventory.app.service;

import com.inventory.app.model.Supplier;
import com.inventory.app.repository.ProductRepository;
import com.inventory.app.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository repo;

    public Supplier addSupplier(Supplier supplier) {
        return repo.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return repo.findAll();
    }

    public void deleteSupplier(int id) {

        if (!productRepository.findBySupplierId(id).isEmpty()) {
            throw new RuntimeException("Cannot delete supplier: Products are linked to it");
        }

        supplierRepository.deleteById(id);
    }

    public Supplier updateSupplier(int id, Supplier updatedSupplier) {
        Supplier supplier = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        supplier.setName(updatedSupplier.getName());
        supplier.setContact(updatedSupplier.getContact());
        supplier.setAddress(updatedSupplier.getAddress());

        return repo.save(supplier);
    }
}