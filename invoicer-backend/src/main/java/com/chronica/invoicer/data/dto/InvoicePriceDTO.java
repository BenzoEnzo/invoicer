package com.chronica.invoicer.data.dto;

import com.chronica.invoicer.data.EntityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoicePriceDTO extends EntityDTO {
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
}
