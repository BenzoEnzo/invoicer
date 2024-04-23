package com.chronica.invoicer.product.dto;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.EntityDTO;
import com.chronica.invoicer.invoice.enumerated.Unit;
import com.chronica.invoicer.product.enumerated.TaxRate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO extends EntityDTO {
    private Company seller;
    private String name;
    private String symbol;
    private Integer catalogNumber;
    private BigDecimal netPrice;
    private Unit unit;
    private TaxRate taxRate;
}
