package com.chronica.invoicer.data.repository;

import com.chronica.invoicer.data.archival.ArchivalCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchivalCompanyRepository extends JpaRepository<ArchivalCompany, Long> {
    int countAllByRealCompanyId(Long realCompanyId);
}
