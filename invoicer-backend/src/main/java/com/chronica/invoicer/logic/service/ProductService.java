package com.chronica.invoicer.logic.service;


import com.chronica.invoicer.company.dto.CompanyProductDTO;
import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.logic.mapper.CompanyMapper;
import com.chronica.invoicer.logic.mapper.ProductMapper;
import com.chronica.invoicer.product.dto.ProductDTO;
import com.chronica.invoicer.product.entity.Product;
import com.chronica.invoicer.logic.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CompanyService companyService;
    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream().map(productMapper::mapToDTO).toList();
    }

    public Optional<ProductDTO> findById(Long id) {
        return productRepository.findById(id).map(productMapper::mapToDTO);
    }

    @Transactional
    public ProductDTO create(CompanyProductDTO companyProductDTO) {
        Company company = CompanyMapper.INSTANCE.mapToEntity(companyService.findById(companyProductDTO.getId()));
        Product product = productMapper.mapToEntity(companyProductDTO.getCompanyProduct());

        product.setCompany(company);
        company.getCompanyProducts().add(product);

        productRepository.save(product);
        companyService.save(company);

        return productMapper.mapToDTO(product);
    }
}
