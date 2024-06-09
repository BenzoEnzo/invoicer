package com.chronica.invoicer.mapper;

import com.chronica.invoicer.data.archival.ArchivalProduct;
import com.chronica.invoicer.data.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArchivalProductMapper {
    @Mapping(target = "realProduct", source = "product")
    @Mapping(target = "id", ignore = true)
    ArchivalProduct mapProductToArchival(Product product);
}
