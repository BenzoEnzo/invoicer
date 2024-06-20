package com.chronica.invoicer.data.entity;

import com.chronica.invoicer.data.BaseEntity;
import com.chronica.invoicer.data.archival.ArchivalProduct;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class InvoiceItem implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer invoicePosition;
    private BigDecimal quantity;
    private BigDecimal discount;
    private BigDecimal partialPrice;

    @ManyToOne
    @JoinColumn(name = "archival_product_id")
    private ArchivalProduct archivalProduct;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}
