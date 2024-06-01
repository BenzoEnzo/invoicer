package com.chronica.invoicer.company.dto;


import com.chronica.invoicer.core.EntityDTO;
import com.chronica.invoicer.product.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyProductDTO extends EntityDTO {
    private Long id;
    private String name;
    private ProductDTO companyProduct;
}
