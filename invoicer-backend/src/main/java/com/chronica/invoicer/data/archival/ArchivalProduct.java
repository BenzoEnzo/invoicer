package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.ArchivalEntity;
import com.chronica.invoicer.data.enumerated.Unit;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.enumerated.TaxRate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArchivalProduct extends ArchivalEntity {
    private Long id;
    private Company seller;
    private String name;
    private String symbol;
    private Integer catalogNumber;
    private BigDecimal netPrice;
    private Unit unit;
    private TaxRate taxRate;
    private Product realProduct;
}
