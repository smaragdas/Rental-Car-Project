package com.automr.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;

@SpringBootTest
// Replace any real DataSource with an embedded one for tests
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }
}