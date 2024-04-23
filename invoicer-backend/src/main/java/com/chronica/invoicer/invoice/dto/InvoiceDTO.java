package com.chronica.invoicer.invoice.dto;

import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.core.EntityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private CompanyDTO seller;
    private CompanyDTO customer;
    private List<InvoiceItemDTO> invoiceItems;
    private InvoicePriceDTO price;
}
