package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.dto.InvoiceDTO;
import com.chronica.invoicer.data.entity.Invoice;
import com.chronica.invoicer.data.entity.InvoiceItem;
import com.chronica.invoicer.data.entity.InvoicePrice;
import com.chronica.invoicer.data.repository.InvoiceItemRepository;
import com.chronica.invoicer.data.repository.InvoicePriceRepository;
import com.chronica.invoicer.data.repository.InvoiceRepository;

import com.chronica.invoicer.mapper.InvoiceItemMapper;
import com.chronica.invoicer.mapper.InvoiceMapper;
import com.chronica.invoicer.mapper.InvoicePriceMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemRepository invoiceItemRepository;
    private final InvoicePriceRepository invoicePriceRepository;
    private final InvoiceMapper invoiceMapper;
    private final InvoicePriceMapper invoicePriceMapper;
    private final InvoiceItemMapper invoiceItemMapper;

    public List<InvoiceDTO> getSellerInvoices(Long sellerId){
        return invoiceRepository.findInvoicesBySeller_Id(sellerId)
                .stream()
                .map(invoiceMapper::mapToDTO)
                .toList();
    }

    @Transactional
    public InvoiceDTO create(InvoiceDTO invoiceDTO){
        InvoicePrice invoicePrice = invoicePriceMapper.mapToEntity(invoiceDTO.getInvoicePrice());

        List<InvoiceItem> invoiceItems = invoiceDTO
                .getInvoicePrice()
                .getInvoiceItems()
                .stream()
                .map(invoiceItemMapper::mapToEntity)
                .toList();

        Invoice invoice = invoiceMapper.mapToEntity(invoiceDTO);
        invoice.setInvoicePrice(invoicePrice);

        invoicePrice.setInvoiceItems(invoiceItems);
        invoicePrice.setInvoice(invoice);

        calculatePartialCost(invoicePrice);
        calculateNettPrice(invoicePrice);

        invoiceRepository.save(invoice);

        return invoiceMapper.mapToDTO(invoice);
    }

    private void calculatePartialCost(InvoicePrice invoicePrice){
        List<InvoiceItem> invoiceItems = invoicePrice.getInvoiceItems();

        invoiceItems.forEach(g -> g.setPartialPrice(g.getQuantity()
                .multiply(g.getProduct().getNetPrice())
                .subtract(g.getDiscount())));

        invoiceItemRepository.saveAll(invoiceItems);
    }

    private void calculateNettPrice(InvoicePrice invoicePrice){
        invoicePrice.setNetAmount(invoicePrice
                .getInvoiceItems()
                .stream()
                .map(InvoiceItem::getPartialPrice)
                .reduce(BigDecimal.ZERO,BigDecimal::add));

        invoicePriceRepository.save(invoicePrice);
    }


}
