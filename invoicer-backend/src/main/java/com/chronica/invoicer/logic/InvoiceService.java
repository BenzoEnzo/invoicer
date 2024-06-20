package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.dto.InvoiceDTO;
import com.chronica.invoicer.data.entity.Invoice;
import com.chronica.invoicer.data.entity.InvoiceItem;
import com.chronica.invoicer.data.entity.InvoicePrice;
import com.chronica.invoicer.data.enumerated.TaxRate;
import com.chronica.invoicer.data.repository.InvoiceItemRepository;
import com.chronica.invoicer.data.repository.InvoicePriceRepository;
import com.chronica.invoicer.data.repository.InvoiceRepository;
import com.chronica.invoicer.mapper.InvoiceMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final InvoicePriceRepository invoicePriceRepository;
    private final InvoiceItemRepository invoiceItemRepository;

    public List<InvoiceDTO> getSellerInvoices(Long sellerId){
        return invoiceRepository.findInvoicesBySeller_Id(sellerId)
                .stream()
                .map(invoiceMapper::mapToDTO)
                .toList();
    }

    @Transactional
    public InvoiceDTO create(InvoiceDTO invoiceDTO){
        Invoice invoice = invoiceMapper.mapToEntity(invoiceDTO);
        if (invoice.getInvoiceItems() != null) {
            invoice.setInvoicePrice(calculateInvoicePrice(invoice.getInvoiceItems()));

        }
        Invoice savedInvoice = invoiceRepository.save(invoice);
        invoice.getInvoicePrice().setInvoice(savedInvoice);
        invoicePriceRepository.save(invoice.getInvoicePrice());
        invoice.getInvoiceItems().forEach(item -> item.setInvoice(savedInvoice));
        invoiceItemRepository.saveAll(invoice.getInvoiceItems());
        return invoiceMapper.mapToDTO(savedInvoice);
    }

    public InvoicePrice calculateInvoicePrice(List<InvoiceItem> invoiceItems) {
        InvoicePrice invoicePrice = new InvoicePrice();
        invoiceItems.forEach(invoiceItem -> increaseInvoicePrice(invoicePrice, invoiceItem));
        return invoicePrice;
    }

    private void increaseInvoicePrice(InvoicePrice invoicePrice, InvoiceItem invoiceItem) {
        BigDecimal netAmount = getNetAmountForItem(invoiceItem);
        invoicePrice.setNetAmount(invoicePrice.getNetAmount().add(netAmount));
        BigDecimal vatAmount = getVatAmountForItem(netAmount, invoiceItem.getArchivalProduct().getTaxRate());
        invoicePrice.setVatAmount(invoicePrice.getVatAmount().add(vatAmount));
        invoicePrice.setBrutAmount(invoicePrice.getBrutAmount().add(netAmount).add(vatAmount));
    }

    private BigDecimal getNetAmountForItem(InvoiceItem invoiceItem) {
        return invoiceItem.getQuantity()
                .multiply(invoiceItem.getPartialPrice())
                .setScale(2, RoundingMode.HALF_UP);
    }
    private BigDecimal getVatAmountForItem(BigDecimal netAmount, TaxRate taxRate) {
        return netAmount
                .multiply(taxRate.getDecimalRate())
                .setScale(2, RoundingMode.HALF_UP);
     }
}
