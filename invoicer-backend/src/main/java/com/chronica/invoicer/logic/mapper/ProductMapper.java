package com.chronica.invoicer.logic.mapper;


import com.chronica.invoicer.product.dto.ProductDTO;
import com.chronica.invoicer.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface ProductMapper  {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);
    @Mapping(target = "id", ignore = true)
    Product mapToEntity(ProductDTO productDTO);
    ProductDTO mapToDTO(Product product);
}