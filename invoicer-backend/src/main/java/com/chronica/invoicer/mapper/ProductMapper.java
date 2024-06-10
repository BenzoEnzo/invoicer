package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.CompanyInfoDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.data.entity.Company;
import com.chronica.invoicer.data.entity.Product;
import com.chronica.invoicer.data.repository.CompanyRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring",
        uses = {
                CompanyRepository.class
        })
public abstract class ProductMapper  {
    private CompanyRepository companyRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "company", expression = "java(getCompany(productDTO.getCompanyInfo()))")
    public abstract Product mapToEntity(ProductDTO productDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "company", expression = "java(getCompany(productDTO.getCompanyInfo()))")
    public abstract Product mapToUpdateEntity(@MappingTarget Product toUpdate, ProductDTO productDTO);

    @Mapping(target = "companyInfo", expression = "java(getCompanyInfo(product.getCompany()))")
    public abstract ProductDTO mapToDTO(Product product);

    @Autowired
    protected void setCompanyRepository(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    protected Company getCompany(CompanyInfoDTO companyInfo) {
        return companyRepository
                .findById(companyInfo.id())
                .orElseThrow();
    }

    protected CompanyInfoDTO getCompanyInfo(Company company) {
        return new CompanyInfoDTO(company.getId(), company.getName());
    }
}