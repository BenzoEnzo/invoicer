package com.chronica.invoicer.data.dto;

import com.chronica.invoicer.data.EntityDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO extends EntityDTO {
    private String name;
    private String shortName;
    private String street;
    private Integer building;
    private Integer apartment;
    private String zipCode;
    private String city;
    private Integer nip;
}
