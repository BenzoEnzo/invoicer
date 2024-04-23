package com.chronica.invoicer.invoice.archival;

import com.chronica.invoicer.core.ArchivalEntity;
import com.chronica.invoicer.invoice.entity.InvoiceItem;
import com.chronica.invoicer.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArchivalInvoiceItem extends ArchivalEntity<InvoiceItem> {
    private Long id;
    private BigDecimal quantity;
    private BigDecimal discount;
    private Product product;
}
