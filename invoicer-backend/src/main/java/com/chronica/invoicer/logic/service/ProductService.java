package com.chronica.invoicer.logic.service;


import com.chronica.invoicer.logic.mapper.ProductMapper;
import com.chronica.invoicer.product.dto.ProductDTO;
import com.chronica.invoicer.product.entity.Product;
import com.chronica.invoicer.logic.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream().map(productMapper::mapToDTO).toList();
    }

    public Optional<ProductDTO> findById(Long id) {
        return productRepository.findById(id).map(productMapper::mapToDTO);
    }

    public ProductDTO create(ProductDTO productDTO) {
        Product product = productMapper.mapToEntity(productDTO);
        productRepository.save(product);
        return productMapper.mapToDTO(product);
    }
}
