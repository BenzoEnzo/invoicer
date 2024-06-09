package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.archival.ArchivalCompany;
import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.repository.ArchivalCompanyRepository;
import com.chronica.invoicer.mapper.ArchivalCompanyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class ArchivalCompanyService {
    private final ArchivalCompanyRepository archivalCompanyRepository;
    private final ArchivalCompanyMapper archivalCompanyMapper;

    public void createArchivalCompany(Company company) {
        ArchivalCompany archivalCompany = archivalCompanyMapper.mapCompanyToArchivalCompany(company);
        archivalCompany.setCreatedAt(new Date());
        archivalCompany.setVersion(archivalCompanyRepository.countAllByRealCompanyId(company.getId()) + 1);
        archivalCompanyRepository.save(archivalCompany);
    }
}
