package com.example.salesforce.support;

import com.example.salesforce.pages.LoginPage;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.time.Duration;
import java.util.Locale;
import java.util.Properties;
import java.util.regex.Pattern;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;

public abstract class BaseTest {
    private final Properties settings = new Properties();
    private WebDriver driver;
    private URI baseUrl;
    private String browser;
    private boolean headless;
    private Duration waitTimeout;
    private Duration pageLoadTimeout;
    protected LoginPage loginPage;
    protected String username;
    protected String validPassword;
    protected String invalidPassword;
    protected String authenticatedXPath;
    protected Pattern authenticatedUrl;
    protected String invalidLoginMessage;

    @BeforeTest(alwaysRun = true)
    public void loadConfiguration() throws IOException, XPathExpressionException {
        try (InputStream stream = getClass().getResourceAsStream("/config.properties")) {
            if (stream == null) {
                throw new IOException("Missing config.properties on the test classpath.");
            }
            settings.load(stream);
        }
        baseUrl = URI.create(setting("base.url"));
        if (!"https".equalsIgnoreCase(baseUrl.getScheme()) || baseUrl.getHost() == null
                || baseUrl.getUserInfo() != null) {
            throw new IllegalArgumentException("base.url must be an HTTPS URL without embedded credentials.");
        }
        browser = setting("browser").toLowerCase(Locale.ROOT);
        if (!browser.equals("chrome") && !browser.equals("firefox")) {
            throw new IllegalArgumentException("browser must be chrome or firefox.");
        }
        String headlessSetting = setting("headless");
        if (!headlessSetting.equalsIgnoreCase("true") && !headlessSetting.equalsIgnoreCase("false")) {
            throw new IllegalArgumentException("headless must be true or false.");
        }
        headless = Boolean.parseBoolean(headlessSetting);
        waitTimeout = positiveDuration("wait.seconds");
        pageLoadTimeout = positiveDuration("page.load.seconds");
        username = requiredEnvironment("SF_USERNAME");
        validPassword = requiredEnvironment("SF_PASSWORD");
        invalidPassword = requiredEnvironment("SF_INVALID_PASSWORD");
        if (validPassword.equals(invalidPassword)) {
            throw new IllegalArgumentException("SF_INVALID_PASSWORD must differ from SF_PASSWORD.");
        }
        authenticatedXPath = requiredEnvironment("SF_AUTHENTICATED_XPATH");
        XPathFactory.newInstance().newXPath().compile(authenticatedXPath);
        authenticatedUrl = Pattern.compile(requiredEnvironment("SF_AUTHENTICATED_URL_REGEX"));
        invalidLoginMessage = requiredEnvironment("SF_INVALID_LOGIN_MESSAGE").strip();
    }

    @BeforeMethod
    public void openBrowser() throws WebDriverException {
        try {
            driver = createDriver();
            driver.manage().timeouts().implicitlyWait(Duration.ZERO);
            driver.manage().timeouts().pageLoadTimeout(pageLoadTimeout);
            loginPage = new LoginPage(driver, waitTimeout).open(baseUrl);
        } catch (WebDriverException exception) {
            throw new WebDriverException("Browser setup or Salesforce login navigation failed.", exception);
        }
    }

    @AfterMethod(alwaysRun = true)
    public void closeBrowser(ITestResult result) throws WebDriverException {
        try {
            if (driver != null) {
                driver.quit();
            }
        } catch (WebDriverException exception) {
            if (result.getThrowable() != null) {
                result.getThrowable().addSuppressed(exception);
            } else {
                throw new WebDriverException("Browser session cleanup failed.", exception);
            }
        } finally {
            driver = null;
            loginPage = null;
        }
    }

    private WebDriver createDriver() throws WebDriverException {
        if (browser.equals("firefox")) {
            FirefoxOptions options = new FirefoxOptions();
            if (headless) {
                options.addArguments("-headless");
            }
            options.addArguments("--width=1440", "--height=1000");
            return new FirefoxDriver(options);
        }
        ChromeOptions options = new ChromeOptions();
        if (headless) {
            options.addArguments("--headless=new");
        }
        options.addArguments("--window-size=1440,1000");
        return new ChromeDriver(options);
    }

    private String setting(String name) {
        return System.getProperty(name, settings.getProperty(name)).strip();
    }

    private Duration positiveDuration(String name) {
        long seconds = Long.parseLong(setting(name));
        if (seconds < 1) {
            throw new IllegalArgumentException(name + " must be positive.");
        }
        return Duration.ofSeconds(seconds);
    }

    private String requiredEnvironment(String name) {
        String value = System.getenv(name);
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Required environment variable is missing: " + name);
        }
        return value;
    }
}
