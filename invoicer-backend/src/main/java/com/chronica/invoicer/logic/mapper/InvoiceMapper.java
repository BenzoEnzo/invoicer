package com.chronica.invoicer.logic.mapper;


import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.invoice.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface InvoiceMapper  {
    InvoiceMapper INSTANCE = Mappers.getMapper(InvoiceMapper.class);

    @Mapping(target = "id", ignore = true)
    Invoice mapToEntity(InvoiceDTO invoiceDTO);


    InvoiceDTO mapToDTO(Invoice invoice);

}
