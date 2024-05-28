package com.chronica.invoicer.logic.repository;

import com.chronica.invoicer.invoice.entity.InvoiceItem;
import com.chronica.invoicer.invoice.entity.InvoicePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoicePriceRepository extends JpaRepository<InvoicePrice,Long> {
}
