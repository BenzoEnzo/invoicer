package com.chronica.invoicer.data.repository;

import com.chronica.invoicer.data.archival.ArchivalProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchivalProductRepository extends JpaRepository<ArchivalProduct, Long> {
    int countAllByRealProductId(Long realProductId);
}
