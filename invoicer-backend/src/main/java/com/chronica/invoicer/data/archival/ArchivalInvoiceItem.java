package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.ArchivalEntity;
import com.chronica.invoicer.data.entity.InvoiceItem;
import com.chronica.invoicer.data.entity.Product;
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
    private Integer invoicePosition;
    private BigDecimal quantity;
    private BigDecimal discount;
    private Product product;
}
