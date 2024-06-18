package com.chronica.invoicer.data.entity;

import com.chronica.invoicer.data.BaseEntity;
import com.chronica.invoicer.data.enumerated.Unit;
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
    private boolean deprecated;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;
}
