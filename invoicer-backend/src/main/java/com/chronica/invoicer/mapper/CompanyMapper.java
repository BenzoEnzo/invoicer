package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.CompanyDTO;
import com.chronica.invoicer.data.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    @Mapping(target = "id", ignore = true)
    Company mapToEntity(CompanyDTO companyDTO);

    @Mapping(target = "id", ignore = true)
    Company mapToUpdateEntity(@MappingTarget Company toUpdate, CompanyDTO companyDTO);

    CompanyDTO mapToDTO(Company company);
}
