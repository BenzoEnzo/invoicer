package com.chronica.invoicer.controller;


import com.chronica.invoicer.data.dto.CompanyProductDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.logic.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productService.findById(id)
                .map(product -> ResponseEntity.ok().body(product))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody CompanyProductDTO product) {
        ProductDTO productSaved = productService.create(product);
        return new ResponseEntity<>(productSaved, HttpStatus.CREATED);
    }
}
