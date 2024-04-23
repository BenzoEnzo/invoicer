package com.chronica.invoicer.invoice.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoicePrice {
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
}
