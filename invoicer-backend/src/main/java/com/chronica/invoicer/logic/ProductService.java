package com.chronica.invoicer.logic;


import com.chronica.invoicer.data.dto.CompanyProductDTO;
import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.mapper.CompanyMapper;
import com.chronica.invoicer.mapper.ProductMapper;
import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.repository.ProductRepository;
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
