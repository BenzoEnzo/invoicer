package com.chronica.invoicer.data.repository;

import com.chronica.invoicer.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllByCompanyIdAndDeprecatedFalse(Long company_id);
}
