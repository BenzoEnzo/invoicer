package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.ArchivalEntity;
import com.chronica.invoicer.data.entity.InvoicePrice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArchivalInvoicePrice extends ArchivalEntity<InvoicePrice> {
    private Long id;
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
}
