package com.chronica.invoicer.mapper;

import com.chronica.invoicer.data.dto.InvoicePriceDTO;
import com.chronica.invoicer.data.entity.InvoicePrice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface InvoicePriceMapper {
    InvoicePriceMapper INSTANCE = Mappers.getMapper(InvoicePriceMapper.class);

    @Mapping(target = "id", ignore = true)
    InvoicePrice mapToEntity(InvoicePriceDTO invoicePriceDTO);

    InvoicePriceDTO mapToDTO(InvoicePrice invoicePrice);
}

