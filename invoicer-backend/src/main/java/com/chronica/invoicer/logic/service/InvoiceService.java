package com.chronica.invoicer.logic.service;

import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.invoice.entity.Invoice;
import com.chronica.invoicer.logic.mapper.InvoiceMapper;
import com.chronica.invoicer.logic.repository.InvoiceRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    public Optional<Invoice> findById(Long id) {
        return invoiceRepository.findById(id);
    }

    @Transactional
    public InvoiceDTO create(InvoiceDTO invoiceDTO){
        Invoice invoice = invoiceMapper.mapToEntity(invoiceDTO);

        invoiceRepository.save(invoice);

        return invoiceMapper.mapToDTO(invoice);
    }
}
