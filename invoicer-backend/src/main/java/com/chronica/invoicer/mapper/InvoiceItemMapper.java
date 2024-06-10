package com.chronica.invoicer.mapper;

import com.chronica.invoicer.data.archival.ArchivalProduct;
import com.chronica.invoicer.data.dto.InvoiceItemDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.data.entity.InvoiceItem;
import com.chronica.invoicer.data.repository.ArchivalProductRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring",
        uses = {
                ArchivalProductRepository.class,
                ProductMapper.class
        })
public abstract class InvoiceItemMapper {
    private ArchivalProductRepository archivalProductRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "archivalProduct", expression = "java(getArchivalProduct(invoiceItemDTO.getArchivalProduct()))")
    public abstract InvoiceItem mapToEntity(InvoiceItemDTO invoiceItemDTO);

    @Mapping(target = "archivalProduct", source = "archivalProduct.realProduct")
    public abstract InvoiceItemDTO mapToDTO(InvoiceItem invoiceItem);

    @Autowired
    protected void setArchivalProductRepository(ArchivalProductRepository archivalProductRepository) {
        this.archivalProductRepository = archivalProductRepository;
    }

    protected ArchivalProduct getArchivalProduct(ProductDTO product) {
        return archivalProductRepository
                .findFirstByRealProductIdOrderByVersionDesc(product.getId())
                .orElseThrow();
    }
}

