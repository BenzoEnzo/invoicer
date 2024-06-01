package com.chronica.invoicer.invoice.dto;

import com.chronica.invoicer.company.dto.CompanyDTO;
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
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO extends EntityDTO {
    private String symbol;
    private Date creationDate;
    private Date saleDate;
    private Date paymentDate;
    private CompanyDTO seller;
    private CompanyDTO customer;
    private InvoicePriceDTO invoicePrice;
}
