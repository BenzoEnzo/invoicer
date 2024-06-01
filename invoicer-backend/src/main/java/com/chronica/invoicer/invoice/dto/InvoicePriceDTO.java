package com.chronica.invoicer.invoice.dto;

import com.chronica.invoicer.company.dto.CompanyDTO;
import com.chronica.invoicer.core.EntityDTO;
import com.chronica.invoicer.invoice.entity.InvoiceItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoicePriceDTO extends EntityDTO {
    private BigDecimal netAmount;
    private BigDecimal vatAmount;
    private BigDecimal brutAmount;
    private List<InvoiceItemDTO> invoiceItems;
}
