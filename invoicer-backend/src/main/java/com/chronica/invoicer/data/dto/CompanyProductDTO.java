package com.chronica.invoicer.data.dto;


import com.chronica.invoicer.data.EntityDTO;
import com.chronica.invoicer.data.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyProductDTO extends EntityDTO {
    private Long id;
    private String name;
    private ProductDTO companyProduct;
}
