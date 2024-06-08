package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.CompanyDTO;
import com.chronica.invoicer.data.entity.Company;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyMapper INSTANCE = Mappers.getMapper(CompanyMapper.class);

    Company mapToEntity(CompanyDTO companyDTO);

    CompanyDTO mapToDTO(Company company);
}
