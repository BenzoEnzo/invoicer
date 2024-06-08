package com.chronica.invoicer.data.dto;

import com.chronica.invoicer.data.EntityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

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
