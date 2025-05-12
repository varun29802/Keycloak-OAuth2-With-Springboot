package com.varun.resources.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private String productId;
    private String productName;
    private String productDescription;
    private Integer productPrice;
}
