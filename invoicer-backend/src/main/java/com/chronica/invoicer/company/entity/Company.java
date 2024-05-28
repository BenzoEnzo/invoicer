package com.chronica.invoicer.company.entity;

import com.chronica.invoicer.core.BaseEntity;
import com.chronica.invoicer.invoice.entity.Invoice;
import com.chronica.invoicer.invoice.entity.InvoicePrice;
import com.chronica.invoicer.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Company implements BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String shortName;
    private String street;
    private Integer building;
    private Integer apartment;
    private String zipCode;
    private String city;
    private Integer nip;

    @OneToMany(mappedBy = "seller")
    private Set<Invoice> soldInvoices;

    @OneToMany(mappedBy = "customer")
    private Set<Invoice> purchasedInvoices;

    @OneToMany(mappedBy = "company")
    private List<Product> companyProducts;

    public Company(){
        this.companyProducts = new ArrayList<>();
    }
}
