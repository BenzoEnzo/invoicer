package com.chronica.invoicer.mapper;


import com.chronica.invoicer.data.dto.InvoiceDTO;
import com.chronica.invoicer.data.entity.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    @Mapping(target = "id", ignore = true)
    Invoice mapToEntity(InvoiceDTO invoiceDTO);

    InvoiceDTO mapToDTO(Invoice invoice);
}
