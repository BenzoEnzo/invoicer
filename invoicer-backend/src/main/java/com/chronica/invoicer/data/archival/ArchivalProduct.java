package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.ArchivalEntity;
import com.chronica.invoicer.data.enumerated.Unit;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.enumerated.TaxRate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ArchivalProduct extends ArchivalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id")
    private Company seller;
    private String name;
    private String symbol;
    private Integer catalogNumber;
    private BigDecimal netPrice;
    private Unit unit;
    private TaxRate taxRate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "realProduct_id")
    private Product realProduct;
}
