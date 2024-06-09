package com.chronica.invoicer.mapper;

import com.chronica.invoicer.data.archival.ArchivalCompany;
import com.chronica.invoicer.data.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArchivalCompanyMapper {
    @Mapping(target = "realCompany", source = "company")
    @Mapping(target = "id", ignore = true)
    ArchivalCompany mapCompanyToArchivalCompany(Company company);
}
