package com.chronica.invoicer.invoice.entity;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.BaseEntity;
import com.chronica.invoicer.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Invoice implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String symbol;
    private Date creationDate;
    private Date saleDate;
    private Date paymentDate;
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
    @ManyToMany
    private List<Product> products;
    @ManyToOne
    private Company customer;
    @ManyToOne
    private Company seller;
}
