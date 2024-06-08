package com.chronica.invoicer.data.repository;

import com.chronica.invoicer.data.entity.InvoicePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoicePriceRepository extends JpaRepository<InvoicePrice,Long> {
}
