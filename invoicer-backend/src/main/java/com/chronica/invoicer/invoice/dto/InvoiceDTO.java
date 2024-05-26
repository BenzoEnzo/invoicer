package com.chronica.invoicer.invoice.dto;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.EntityDTO;
import com.chronica.invoicer.product.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO extends EntityDTO {
    private String symbol;
    private Date creationDate;
    private Date saleDate;
    private Date paymentDate;
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
    private List<ProductDTO> products;
    private Company customer;
    private Company seller;
}
