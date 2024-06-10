package com.chronica.invoicer.logic;


import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.repository.ProductRepository;
import com.chronica.invoicer.mapper.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ArchivalProductService archivalProductService;

    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream().map(productMapper::mapToDTO).toList();
    }

    public Optional<ProductDTO> findById(Long id) {
        return productRepository.findById(id).map(productMapper::mapToDTO);
    }

    @Transactional
    public ProductDTO create(ProductDTO productDTO) {
        Product product = productRepository.save(productMapper.mapToEntity(productDTO));
        archivalProductService.createArchivalProduct(product);
        return productMapper.mapToDTO(product);
    }

    public ProductDTO update(Long id, ProductDTO product) {
        Product updatedProduct = productRepository.findById(id)
                .map(toUpdate -> productMapper.mapToUpdateEntity(toUpdate, product))
                .orElseThrow();
        archivalProductService.createArchivalProduct(updatedProduct);
        return productMapper.mapToDTO(updatedProduct);
    }
}
