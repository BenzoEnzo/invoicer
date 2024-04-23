package com.chronica.invoicer.company.entity;

import com.chronica.invoicer.core.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Company implements BaseEntity {
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
