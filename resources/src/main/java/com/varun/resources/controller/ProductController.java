package com.varun.resources.controller;

import com.varun.resources.model.Product;
import com.varun.resources.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductService productService;

    // CREATE PRODUCT
    @PostMapping
    public Product addProduct(@RequestBody Product product){
        return productService.add(product);
    }

    // FETCH PRODUCT
    @GetMapping
    public List<Product> getProduct(){
        return productService.getAllProduct();
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public void deleteProduct(@RequestParam String id){
        productService.delete(id);
    }
}
