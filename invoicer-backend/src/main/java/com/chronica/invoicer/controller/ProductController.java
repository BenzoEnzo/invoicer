package com.chronica.invoicer.controller;


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
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO product) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.create(product));
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO product){
        return ResponseEntity.ok(productService.update(id, product));
    }
}
