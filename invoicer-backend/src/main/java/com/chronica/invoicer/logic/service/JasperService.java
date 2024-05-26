package com.chronica.invoicer.logic.service;

import com.chronica.invoicer.invoice.dto.InvoiceDTO;
import com.chronica.invoicer.invoice.entity.Invoice;

import com.chronica.invoicer.logic.mapper.InvoiceMapper;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class JasperService {
    private final InvoiceService invoiceService;
    private final ResourceLoader resourceLoader;

    public ResponseEntity<byte[]> generateInvoiceReport(Long id) {
        try {
            Invoice invoice = invoiceService.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));

            if (invoice == null) {
                return ResponseEntity.notFound().build();
            }

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singletonList(invoice));

            String templatePath = "classpath:invoice.jrxml";

            JasperReport jasperReport = JasperCompileManager.compileReport(resourceLoader.getResource(templatePath).getInputStream());

            Map<String, Object> parameters = new HashMap<>();

            parameters.put("creationDate", invoice.getCreationDate());
            parameters.put("customerName", invoice.getCustomer().getName());
            parameters.put("sellerName", invoice.getSeller().getName());
            parameters.put("productsList", invoice.getProducts());

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
            byte[] pdfBytes = outputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "invoice_" + id + ".pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException | JRException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
