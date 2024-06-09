package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.CompanyDTO;
import com.chronica.invoicer.data.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    Company mapToEntity(CompanyDTO companyDTO);

    CompanyDTO mapToDTO(Company company);
}
