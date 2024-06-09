package com.chronica.invoicer.controller;

import com.chronica.invoicer.data.dto.CompanyDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
import com.chronica.invoicer.logic.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public List<CompanyDTO> getAllCompanies() {
        return companyService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long id) {
        return new ResponseEntity<>(companyService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/products")
    public ResponseEntity<List<ProductDTO>> getCompanyProducts(@PathVariable Long id){
        return new ResponseEntity<>(companyService.getCompanyProducts(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(@RequestBody CompanyDTO company) {
        CompanyDTO companySaved = companyService.create(company);
        return new ResponseEntity<>(companySaved, HttpStatus.CREATED);
    }
}
