package com.example.salesforce.pages;

import java.net.URI;
import java.time.Duration;
import java.util.Objects;
import java.util.regex.Pattern;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public final class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement username;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement password;

    @FindBy(xpath = "//input[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@id='rememberUn']")
    private WebElement rememberMe;

    @FindBy(xpath = "//*[@id='error']")
    private WebElement errorMessage;

    public LoginPage(WebDriver driver, Duration timeout) {
        this.driver = Objects.requireNonNull(driver);
        this.wait = new WebDriverWait(driver, timeout);
        PageFactory.initElements(driver, this);
    }

    public LoginPage open(URI address) throws WebDriverException {
        try {
            driver.get(address.toString());
            wait.until(ExpectedConditions.visibilityOf(username));
            wait.until(ExpectedConditions.visibilityOf(password));
            wait.until(ExpectedConditions.elementToBeClickable(loginButton));
            wait.until(ExpectedConditions.elementToBeClickable(rememberMe));
            return this;
        } catch (TimeoutException exception) {
            throw new TimeoutException("Salesforce login controls did not become ready.", exception);
        }
    }

    public LoginPage login(String user, String secret) throws WebDriverException {
        Objects.requireNonNull(user);
        Objects.requireNonNull(secret);
        try {
            wait.until(ExpectedConditions.elementToBeClickable(username)).clear();
            username.sendKeys(user);
            wait.until(ExpectedConditions.elementToBeClickable(password)).clear();
            password.sendKeys(secret);
            if (rememberMe.isSelected()) {
                wait.until(ExpectedConditions.elementToBeClickable(rememberMe)).click();
            }
            wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
            return this;
        } catch (TimeoutException exception) {
            throw new TimeoutException("Salesforce login could not be submitted.", exception);
        }
    }

    public boolean awaitAuthenticated(String authenticatedXPath, Pattern expectedUrl)
            throws WebDriverException {
        try {
            return wait.until(current -> expectedUrl.matcher(current.getCurrentUrl()).matches()
                    && hasVisibleElement(authenticatedXPath)
                    && !hasVisibleElement("//input[@id='Login']"));
        } catch (TimeoutException exception) {
            throw new TimeoutException("The configured authenticated state was not reached. "
                    + "Check the account, MFA/SSO requirements, URL pattern, and XPath.", exception);
        }
    }

    public String awaitLoginError() throws WebDriverException {
        try {
            return wait.until(current -> {
                if (!errorMessage.isDisplayed()) {
                    return null;
                }
                String text = errorMessage.getText().strip();
                return text.isEmpty() ? null : text;
            });
        } catch (TimeoutException exception) {
            throw new TimeoutException("Salesforce did not display a login rejection message.", exception);
        }
    }

    public boolean isLoginFormVisible() throws WebDriverException {
        return hasVisibleElement("//input[@id='username']")
                && hasVisibleElement("//input[@id='password']")
                && hasVisibleElement("//input[@id='Login']");
    }

    public boolean hasVisibleElement(String xpath) throws WebDriverException {
        for (WebElement element : driver.findElements(By.xpath(xpath))) {
            try {
                if (element.isDisplayed()) {
                    return true;
                }
            } catch (StaleElementReferenceException exception) {
                continue;
            }
        }
        return false;
    }
}
