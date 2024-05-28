package com.chronica.invoicer.logic.service;

import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.invoice.dto.InvoiceItemDTO;
import com.chronica.invoicer.invoice.entity.Invoice;
import com.chronica.invoicer.invoice.entity.InvoiceItem;
import com.chronica.invoicer.invoice.entity.InvoicePrice;
import com.chronica.invoicer.logic.mapper.*;
import com.chronica.invoicer.logic.repository.InvoiceItemRepository;
import com.chronica.invoicer.logic.repository.InvoicePriceRepository;
import com.chronica.invoicer.logic.repository.InvoiceRepository;

import com.chronica.invoicer.product.dto.ProductDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final InvoicePriceRepository invoicePriceRepository;
    private final InvoiceMapper invoiceMapper;
    private final InvoicePriceMapper invoicePriceMapper;
    private final InvoiceItemMapper invoiceItemMapper;

    @Transactional
    public InvoiceDTO create(InvoiceDTO invoiceDTO){
        InvoicePrice invoicePrice = invoicePriceMapper.mapToEntity(invoiceDTO.getInvoicePrice());

        List<InvoiceItem> invoiceItems = invoiceDTO
                .getInvoicePrice()
                .getInvoiceItems()
                .stream().map(invoiceItemMapper::mapToEntity).toList();

        Invoice invoice = invoiceMapper.mapToEntity(invoiceDTO);
        invoice.setInvoicePrice(invoicePrice);

        invoicePrice.setInvoiceItems(invoiceItems);
        invoicePrice.setInvoice(invoice);

        calculatePartialCost(invoicePrice);
        calculatePriceNetto(invoicePrice);

        invoiceRepository.save(invoice);

        return invoiceMapper.mapToDTO(invoice);
    }

    private void calculatePartialCost(InvoicePrice invoicePrice){
        List<InvoiceItem> invoiceItems = invoicePrice.getInvoiceItems();

        invoiceItems.forEach(g -> g.setPartialPrice(g.getQuantity()
                .multiply(g.getProduct().getNetPrice())));

        invoiceItemRepository.saveAll(invoiceItems);
    }

    private void calculatePriceNetto(InvoicePrice invoicePrice){
        invoicePrice.setNetAmount(invoicePrice
                .getInvoiceItems()
                .stream()
                .map(InvoiceItem::getPartialPrice)
                .reduce(BigDecimal.ZERO,BigDecimal::add));

        invoicePriceRepository.save(invoicePrice);
    }
}
