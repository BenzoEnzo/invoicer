package com.chronica.invoicer.logic.repository;

import com.chronica.invoicer.invoice.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
    List<Invoice> findInvoicesBySeller_Id(Long sellerId);
}
