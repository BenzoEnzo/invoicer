package com.chronica.invoicer.product.enumerated;

import java.math.BigDecimal;
import java.math.RoundingMode;

public enum TaxRate {
    TAX_RATE_23(23),
    TAX_RATE_8(8),
    TAX_RATE_5(5);

    private final Integer rate;

    TaxRate(Integer rate) {
        this.rate = rate;
    }

    public Integer getRate() {
        return rate;
    }

    public BigDecimal getDecimalRate() {
        return BigDecimal.valueOf(rate).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
    }
}
