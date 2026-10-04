package com.example.salesforce.tests;

import com.example.salesforce.support.BaseTest;
import org.openqa.selenium.WebDriverException;
import org.testng.Assert;
import org.testng.annotations.Test;

public final class InvalidLoginTest extends BaseTest {
    @Test
    public void incorrectPasswordIsRejected() throws WebDriverException {
        loginPage.login(username, invalidPassword);
        Assert.assertEquals(loginPage.awaitLoginError(), invalidLoginMessage,
                "The rejection must match the approved invalid-password message.");
        Assert.assertTrue(loginPage.isLoginFormVisible(), "The login form must remain visible.");
        Assert.assertFalse(loginPage.hasVisibleElement(authenticatedXPath),
                "Authenticated content must not be visible after rejection.");
    }
}
