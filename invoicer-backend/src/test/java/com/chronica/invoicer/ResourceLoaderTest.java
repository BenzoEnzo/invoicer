package com.chronica.invoicer;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ResourceLoader;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class ResourceLoaderTest {

    @Autowired
    private ResourceLoader resourceLoader;

    @Test
    void testResourceLoading() {
        assertNotNull(resourceLoader.getResource("classpath:invoice.jrxml"));
    }
}
