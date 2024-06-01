package com.chronica.invoicer.logic.mapper;

import com.chronica.invoicer.invoice.dto.InvoiceItemDTO;
import com.chronica.invoicer.invoice.entity.InvoiceItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoiceItemMapper {
    InvoiceItemMapper INSTANCE = Mappers.getMapper(InvoiceItemMapper.class);

    @Mapping(target = "id", ignore = true)
    InvoiceItem mapToEntity(InvoiceItemDTO invoiceItemDTO);

    InvoiceItemDTO mapToDTO(InvoiceItem invoiceItem);
}

