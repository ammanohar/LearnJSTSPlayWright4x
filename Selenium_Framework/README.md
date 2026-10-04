# Salesforce login automation

Java 17+, Maven 3.9+, Selenium 4.27.0, and TestNG 7.10.2. Exactly one PageFactory page object and two TestNG tests are included. The original prompt documents are retained.

## Project layout

```text
pom.xml
testng.xml
src/main/java/com/example/salesforce/pages/LoginPage.java
src/test/java/com/example/salesforce/support/BaseTest.java
src/test/java/com/example/salesforce/tests/ValidLoginTest.java
src/test/java/com/example/salesforce/tests/InvalidLoginTest.java
src/test/resources/config.properties
```

## Setup

Install a JDK 17 or newer, Maven 3.9 or newer, and Chrome or Firefox. Make `java`, `javac`, and `mvn` available on PATH. Selenium Manager resolves the matching browser driver; its first run requires network access unless the driver is already provisioned.

Provide these environment variables through your terminal or CI secret store. No credentials are included in the project. `.env` files are not automatically loaded.

| Variable | Required value |
| --- | --- |
| `SF_USERNAME` | Username of a provisioned Salesforce test account |
| `SF_PASSWORD` | Correct password for that account |
| `SF_INVALID_PASSWORD` | A deliberately incorrect, nonempty password different from the correct one |
| `SF_AUTHENTICATED_XPATH` | Verified XPath for an element visible only in your authenticated application |
| `SF_AUTHENTICATED_URL_REGEX` | Java regex matching the entire expected authenticated URL, including the approved org host |
| `SF_INVALID_LOGIN_MESSAGE` | Exact, approved incorrect-password error message for the account and locale; surrounding whitespace is stripped |

Both suite entries validate all six variables before browser startup. Obtain the XPath, URL pattern, and error message from your own test org; no universal Salesforce dashboard locator or rejection text is assumed. The authenticated XPath should select elements, not an XPath scalar expression. Choose an org-specific URL pattern rather than a permissive pattern matching any redirect.

The account must support the selected login endpoint and reach the authenticated application through the configured password flow. MFA, SSO, CAPTCHA, identity verification, password-expiry flows, and locked accounts are not handled. An extra authentication step causes a failure, not a successful-login result. Use a dedicated account and account for lockout policy when repeating the negative test.

## Run

From this directory, after supplying the environment variables:

```powershell
mvn test
mvn test '-Dbrowser=firefox' '-Dheadless=false'
mvn test '-Dbase.url=https://your-approved-org.my.salesforce.com/' '-Dwait.seconds=45'
```

The default endpoint is `https://login.salesforce.com/?locale=in`, with headless Chrome. Non-secret settings are in `src/test/resources/config.properties`; JVM properties of the same names override them. The example custom domain above is a placeholder, not a verified environment.

Compile without opening a browser or supplying credentials:

```powershell
mvn -DskipTests test
```

Surefire writes execution results under `target/surefire-reports`. The suite runs sequentially, without retries, using fresh browser profiles. Keep this runner sequential; parallel execution is not supported by the instance-owned driver lifecycle. `@BeforeTest` loads configuration, `@BeforeMethod` creates and opens the browser, and `@AfterMethod(alwaysRun = true)` closes it, including after setup failures. Remember Me is unchecked before submission; persistence across sessions is not tested.

## Coverage

| Test | Expected observations |
| --- | --- |
| `ValidLoginTest` | Approved URL pattern matches, authenticated element is visible, login submit control is absent/hidden |
| `InvalidLoginTest` | Approved rejection message appears, login form remains visible, authenticated element is absent/hidden |

These are UI observations, not proof of server-side session security. Blank inputs, Remember Me persistence, recovery, additional browsers in CI, accessibility, and other UI cases are outside the two-test scope.

## Verification and decisions

On 2026-10-04, read-only HTTP requests returned HTTP 200 for the pinned Selenium, TestNG, compiler-plugin, and Surefire-plugin POMs on Maven Central:

- [Selenium Java 4.27.0](https://repo.maven.apache.org/maven2/org/seleniumhq/selenium/selenium-java/4.27.0/selenium-java-4.27.0.pom)
- [TestNG 7.10.2](https://repo.maven.apache.org/maven2/org/testng/testng/7.10.2/testng-7.10.2.pom)
- [Compiler plugin 3.13.0](https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-compiler-plugin/3.13.0/maven-compiler-plugin-3.13.0.pom)
- [Surefire plugin 3.5.2](https://repo.maven.apache.org/maven2/org/apache/maven/plugins/maven-surefire-plugin/3.5.2/maven-surefire-plugin-3.5.2.pom)

The [public login response](https://login.salesforce.com/?locale=in) confirmed `username`, `Login`, and `rememberUn` input IDs. The password XPath is from the supplied prompt, and `//*[@id='error']` is an implementation assumption supported only by the username element's `aria-describedby="error"` reference. Neither was confirmed in a rendered browser. Validate both against your actual login page before using the suite.

The task-specific PageFactory requirement takes precedence over the generic anti-hallucination example discouraging it. The [official PageFactory API](https://www.selenium.dev/selenium/docs/api/java/org/openqa/selenium/support/PageFactory.html) documents `initElements` and does not mark the class deprecated. All source locators use XPath; there are no fixed sleeps, PageFactory element caches, hardcoded credentials, or source comments.

Java and Maven were unavailable on PATH and were not found in the checked standard installation locations. Compilation, dependency resolution through Maven, and browser test execution have not been performed. Credentials and org-specific assertions were not supplied. This is generated code requiring compilation and validation in your test environment; production readiness has not been established.

Static checks passed for XML parsing, suite-to-source references, exactly one page object and two test methods, XPath annotations, cleanup configuration, and absence of prohibited source patterns. These checks do not establish Java compilation or browser behavior.
