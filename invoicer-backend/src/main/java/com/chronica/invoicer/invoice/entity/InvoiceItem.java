package com.chronica.invoicer.invoice.entity;

import com.chronica.invoicer.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceItem {
    private Long id;
    private BigDecimal quantity;
    private BigDecimal discount;
    private Product product;
}
