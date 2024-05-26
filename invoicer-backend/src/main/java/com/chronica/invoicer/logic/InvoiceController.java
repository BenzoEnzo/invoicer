package com.chronica.invoicer.logic;

import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.invoice.entity.Invoice;
import com.chronica.invoicer.logic.service.InvoiceService;
import com.chronica.invoicer.logic.service.JasperService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final JasperService jasperService;

    @PostMapping
    public ResponseEntity<InvoiceDTO> createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        InvoiceDTO savedInvoice = invoiceService.create(invoiceDTO);
        return new ResponseEntity<>(savedInvoice, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> generateInvoice(@PathVariable Long id) {
        return jasperService.generateInvoiceReport(id);
    }
}
