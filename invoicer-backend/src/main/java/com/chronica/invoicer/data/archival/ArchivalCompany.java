package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.ArchivalEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ArchivalCompany extends ArchivalEntity {
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "realCompany_id")
    private Company realCompany;
}
