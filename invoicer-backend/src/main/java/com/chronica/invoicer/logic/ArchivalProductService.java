package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.archival.ArchivalProduct;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.repository.ArchivalProductRepository;
import com.chronica.invoicer.mapper.ArchivalProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ArchivalProductService {
    private final ArchivalProductRepository archivalProductRepository;
    private final ArchivalProductMapper archivalProductMapper;

    public void createArchivalProduct(Product product) {
        ArchivalProduct archivalProduct = archivalProductMapper.mapProductToArchival(product);
        archivalProduct.setVersion(archivalProductRepository.countAllByRealProductId(product.getId()) + 1);
        archivalProduct.setCreatedAt(new Date());
        archivalProductRepository.save(archivalProduct);
    }
}
