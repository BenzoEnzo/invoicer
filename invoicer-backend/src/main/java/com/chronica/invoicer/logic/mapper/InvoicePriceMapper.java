package com.chronica.invoicer.logic.mapper;

import com.chronica.invoicer.invoice.dto.InvoiceItemDTO;
import com.chronica.invoicer.invoice.dto.InvoicePriceDTO;
import com.chronica.invoicer.invoice.entity.InvoiceItem;
import com.chronica.invoicer.invoice.entity.InvoicePrice;
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

