package com.chronica.invoicer.invoice.entity;

import com.chronica.invoicer.company.archival.ArchivalCompany;
import com.chronica.invoicer.core.BaseEntity;
import com.chronica.invoicer.invoice.archival.ArchivalInvoice;
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
public class Invoice implements BaseEntity {
    private Long id;
    private String symbol;
    private Date creationDate;
    private Date saleDate;
    private Date paymentDate;
    private ArchivalCompany seller;
    private ArchivalCompany customer;
    private List<ArchivalInvoice> invoiceItems;
    private InvoicePrice price;
}
