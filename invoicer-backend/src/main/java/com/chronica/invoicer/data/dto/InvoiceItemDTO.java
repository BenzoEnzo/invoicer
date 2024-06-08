package com.chronica.invoicer.data.dto;

import com.chronica.invoicer.data.EntityDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
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
    private ProductDTO product;
    private BigDecimal partialPrice;
}
