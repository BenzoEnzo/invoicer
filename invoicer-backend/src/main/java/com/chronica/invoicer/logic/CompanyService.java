package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.dto.CompanyDTO;
import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.repository.CompanyRepository;
import com.chronica.invoicer.mapper.CompanyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    private final ArchivalCompanyService archivalCompanyService;

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
        Company company = companyRepository.save(companyMapper.mapToEntity(companyDTO));
        archivalCompanyService.createArchivalCompany(company);
        return companyMapper.mapToDTO(company);
    }

    public CompanyDTO update(Long id, CompanyDTO companyDTO) {
        Company updatedCompany = companyRepository.findById(id)
                .map(company -> companyMapper.mapToUpdateEntity(company, companyDTO))
                .orElseThrow();
        archivalCompanyService.createArchivalCompany(updatedCompany);
        return companyMapper.mapToDTO(updatedCompany);
    }
}
