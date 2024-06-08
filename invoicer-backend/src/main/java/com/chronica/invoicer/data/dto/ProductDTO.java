package com.chronica.invoicer.data.dto;

import com.chronica.invoicer.data.EntityDTO;
import com.chronica.invoicer.data.enumerated.Unit;
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
public class ProductDTO extends EntityDTO {
    private String name;
    private String symbol;
    private Integer catalogNumber;
    private BigDecimal netPrice;
    private Unit unit;
    private TaxRate taxRate;
}
