package com.example.salesforce.tests;

import com.example.salesforce.support.BaseTest;
import org.openqa.selenium.WebDriverException;
import org.testng.Assert;
import org.testng.annotations.Test;

public final class ValidLoginTest extends BaseTest {
    @Test
    public void validCredentialsReachAuthenticatedPage() throws WebDriverException {
        loginPage.login(username, validPassword);
        Assert.assertTrue(loginPage.awaitAuthenticated(authenticatedXPath, authenticatedUrl),
                "Valid credentials must reach the configured authenticated page.");
    }
}
