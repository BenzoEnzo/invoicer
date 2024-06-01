package com.chronica.invoicer.logic.service;

import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.logic.mapper.CompanyMapper;
import com.chronica.invoicer.logic.mapper.ProductMapper;
import com.chronica.invoicer.logic.repository.CompanyRepository;
import com.chronica.invoicer.product.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;

    public List<CompanyDTO> findAll() {
        return companyRepository.findAll()
                .stream()
                .map(companyMapper::mapToDTO)
                .toList();
    }

    public CompanyDTO findById(Long id) {
        return companyRepository.findById(id)
                .map(companyMapper::mapToDTO)
                .orElseThrow();
    }

    public CompanyDTO create(CompanyDTO companyDTO) {
        Company company = companyMapper.mapToEntity(companyDTO);

        companyRepository.save(company);

        return companyMapper.mapToDTO(company);
    }

    public void save(Company company){
        companyRepository.save(company);
    }

    public List<ProductDTO> getCompanyProducts(Long id){
        return companyRepository.findById(id)
                .get()
                .getCompanyProducts()
                .stream()
                .map(ProductMapper.INSTANCE::mapToDTO)
                .toList();
    }
}
