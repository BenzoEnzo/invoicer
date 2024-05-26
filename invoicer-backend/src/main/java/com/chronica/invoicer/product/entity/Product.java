package com.chronica.invoicer.product.entity;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.BaseEntity;
import com.chronica.invoicer.invoice.entity.Invoice;
import com.chronica.invoicer.invoice.enumerated.Unit;
import com.chronica.invoicer.product.enumerated.TaxRate;
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
public class Product implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String symbol;
    private Integer catalogNumber;
    private BigDecimal netPrice;
    private Unit unit;
    private TaxRate taxRate;
}
