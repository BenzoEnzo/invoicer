package com.chronica.invoicer.logic.mapper;


import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.company.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);
    @Mapping(target = "id", ignore = true)
    Company mapToEntity(CompanyDTO companyDTO);

    CompanyDTO mapToDTO(Company company);
}
