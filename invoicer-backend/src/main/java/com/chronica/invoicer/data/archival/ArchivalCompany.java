package com.chronica.invoicer.data.archival;

import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.ArchivalEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArchivalCompany extends ArchivalEntity {
    private Long id;
    private String name;
    private String shortName;
    private String street;
    private Integer building;
    private Integer apartment;
    private String zipCode;
    private String city;
    private Integer nip;
    private Company realCompany;
}
