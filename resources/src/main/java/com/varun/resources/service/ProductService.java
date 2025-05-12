package com.varun.resources.service;

import com.varun.resources.model.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private List<Product> productList = new ArrayList<>();

    ProductService(){
        productList.add(new Product(UUID.randomUUID().toString(),"Product 1","Product 1 Desc",100));
        productList.add(new Product(UUID.randomUUID().toString(),"Product 2","Product 2 Desc",200));
    }

    // ADD PRODUCT

    public Product add(Product  product){
        product.setProductId(UUID.randomUUID().toString());
        productList.add(product);
        return product;
    }

    // GET PRODUCT

    public List<Product> getAllProduct(){
        return productList;
    }

    // DELETE PRODUCT

    public void delete(String id){
        productList.removeIf(product -> product.getProductId().equals(id));
    }

}
