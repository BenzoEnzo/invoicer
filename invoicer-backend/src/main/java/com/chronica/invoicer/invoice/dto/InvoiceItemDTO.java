package com.chronica.invoicer.invoice.dto;

import com.chronica.invoicer.core.EntityDTO;
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
public class InvoiceItemDTO extends EntityDTO {
    private Integer invoicePosition;
    private BigDecimal quantity;
    private BigDecimal discount;
    private Product product;
}
