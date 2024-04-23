package com.chronica.invoicer.product.enumerated;

import java.math.BigDecimal;

public enum TaxRate {
    TAX_RATE_23(BigDecimal.valueOf(0.23)),
    TAX_RATE_8(BigDecimal.valueOf(0.08)),
    TAX_RATE_5(BigDecimal.valueOf(0.05));

    private final BigDecimal rate;

    TaxRate(BigDecimal rate) {
        this.rate = rate;
    }

    public BigDecimal getRate() {
        return rate;
    }
}
