package com.chronica.invoicer.data.entity;

import com.chronica.invoicer.data.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

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
