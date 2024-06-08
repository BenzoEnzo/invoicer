package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.ArchivalEntity;
import com.chronica.invoicer.data.entity.Invoice;
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
