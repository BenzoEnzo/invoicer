package com.chronica.invoicer.invoice.entity;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class InvoicePrice implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;

    @OneToMany
    private List<InvoiceItem> invoiceItems;

    @OneToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}
