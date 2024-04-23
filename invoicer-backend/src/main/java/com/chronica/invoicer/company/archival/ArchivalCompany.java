package com.chronica.invoicer.company.archival;

import com.chronica.invoicer.company.entity.Company;
import com.chronica.invoicer.core.ArchivalEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArchivalCompany extends ArchivalEntity<Company> {
    private Long id;
    private String name;
    private String shortName;
    private String street;
    private Integer building;
    private Integer apartment;
    private String zipCode;
    private String city;
    private Integer nip;
}
