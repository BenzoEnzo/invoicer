package com.chronica.invoicer.logic;

import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.logic.service.InvoiceService;
import com.chronica.invoicer.logic.service.JasperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final JasperService jasperService;

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<InvoiceDTO>> getSellerInvoices(@PathVariable Long sellerId){
        return new ResponseEntity<>(invoiceService.getSellerInvoices(sellerId), HttpStatus.OK);
    }

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
