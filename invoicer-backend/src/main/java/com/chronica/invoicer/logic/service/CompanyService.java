package com.chronica.invoicer.logic.service;

import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.logic.mapper.CompanyMapper;
import com.chronica.invoicer.logic.repository.CompanyRepository;
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
        return companyRepository.findAll().stream().map(companyMapper::mapToDTO).toList();
    }

    public Optional<CompanyDTO> findById(Long id) {
        return companyRepository.findById(id).map(companyMapper::mapToDTO);
    }

    public CompanyDTO create(CompanyDTO companyDTO) {
        Company company = companyMapper.mapToEntity(companyDTO);
        companyRepository.save(company);
        companyDTO = companyMapper.mapToDTO(company);
        return companyDTO;
    }
}
