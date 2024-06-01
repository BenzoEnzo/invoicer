package com.chronica.invoicer.invoice.entity;

import com.chronica.invoicer.core.BaseEntity;
import com.chronica.invoicer.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

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
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "price_id")
    private InvoicePrice invoicePrice;
}
