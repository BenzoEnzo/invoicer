package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.data.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper  {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    Product mapToEntity(ProductDTO productDTO);
    ProductDTO mapToDTO(Product product);
}