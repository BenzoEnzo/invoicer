package com.chronica.invoicer.invoice.archival;

import com.chronica.invoicer.company.archival.ArchivalCompany;
import com.chronica.invoicer.core.ArchivalEntity;
import com.chronica.invoicer.invoice.entity.Invoice;
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
public class ArchivalInvoice extends ArchivalEntity<Invoice> {
    private Long id;
    private String symbol;
    private Date creationDate;
    private Date saleDate;
    private Date paymentDate;
    private ArchivalCompany seller;
    private ArchivalCompany customer;
    private List<ArchivalInvoiceItem> invoiceItems;
    private ArchivalInvoicePrice price;
}
