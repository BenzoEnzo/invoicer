package com.chronica.invoicer.logic;

import com.chronica.invoicer.data.entity.Invoice;
import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.*;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import javax.sql.DataSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class JasperService {
    private final ResourceLoader resourceLoader;
    private final DataSource dataSource;
    private final InvoiceService invoiceService;

    public ResponseEntity<byte[]> generateInvoiceReport(Long id) {
        try {

            String templatePath = "classpath:invoice.jrxml";

            Invoice invoice = invoiceService.findInvoiceById(id);

            String priceSum = String.valueOf(invoice.getInvoicePrice().getNetAmount());

            JasperReport jasperReport = JasperCompileManager.compileReport(resourceLoader.getResource(templatePath).getInputStream());
            Connection connection = dataSource.getConnection();
            Map<String, Object> parameters = new HashMap<>();

            parameters.put("id", id);
            parameters.put("price_sum", priceSum);

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, connection);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);
            byte[] pdfBytes = outputStream.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "invoice_" + id + ".pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (IOException | SQLException | JRException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
