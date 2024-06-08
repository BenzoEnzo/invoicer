package com.chronica.invoicer.mapper;

import com.chronica.invoicer.data.dto.InvoiceItemDTO;
import com.chronica.invoicer.data.entity.InvoiceItem;
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

