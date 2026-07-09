# Implementation Plan - Country Code Search Web Service (ex2(3) handson)

This plan details the steps to retrieve a specific country by its code (case-insensitive) using a dedicated service layer and an updated XML configuration containing multiple country beans.

## User Review Required

> [!NOTE]
> We will update `country.xml` to declare four country beans (`us`, `de`, `in`, `jp`) and aggregate them into a `countryList` bean.
> To keep the previous exercise code fully functional, we will add an `<alias>` mapping `in` to the alias `country`.

## Proposed Changes

We will modify configuration files and introduce a service component.

### Component: Spring Configurations

#### [MODIFY] [country.xml](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/resources/country.xml)
Expand `country.xml` to include all 4 countries and define a `countryList` list bean.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="us" class="com.cognizant.springlearn.Country">
        <property name="code" value="US" />
        <property name="name" value="United States" />
    </bean>

    <bean id="de" class="com.cognizant.springlearn.Country">
        <property name="code" value="DE" />
        <property name="name" value="Germany" />
    </bean>

    <bean id="in" class="com.cognizant.springlearn.Country">
        <property name="code" value="IN" />
        <property name="name" value="India" />
    </bean>

    <bean id="jp" class="com.cognizant.springlearn.Country">
        <property name="code" value="JP" />
        <property name="name" value="Japan" />
    </bean>

    <bean id="countryList" class="java.util.ArrayList">
        <constructor-arg>
            <list>
                <ref bean="us" />
                <ref bean="de" />
                <ref bean="in" />
                <ref bean="jp" />
            </list>
        </constructor-arg>
    </bean>

    <!-- Backward compatibility alias for ex2(2) country lookup -->
    <alias name="in" alias="country" />

</beans>
```

### Component: Service Layer

#### [NEW] [CountryService.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/service/CountryService.java)
Create the service layer class `CountryService` to parse `country.xml` and perform case-insensitive search using streams (lambdas).

```java
package com.cognizant.springlearn.service;

import com.cognizant.springlearn.Country;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    public Country getCountry(String code) {
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        @SuppressWarnings("unchecked")
        List<Country> countries = context.getBean("countryList", List.class);

        return countries.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }
}
```

### Component: Controller Layer

#### [MODIFY] [CountryController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/CountryController.java)
Inject `CountryService` and add a `@GetMapping("/countries/{code}")` mapping that fetches a country using the path variable.

```java
package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.Country;
import com.cognizant.springlearn.service.CountryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    @RequestMapping(value = "/country", method = RequestMethod.GET)
    public Country getCountryIndia() {
        LOGGER.info("Start: getCountryIndia() execution");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("country", Country.class);
        LOGGER.info("End: getCountryIndia() execution");
        return country;
    }

    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable("code") String code) {
        LOGGER.info("Start: getCountry() execution for code: {}", code);
        Country country = countryService.getCountry(code);
        LOGGER.info("End: getCountry() execution");
        return country;
    }
}
```

---

## Verification Plan

### Automated / Manual Tests
- Run `.\mvnw clean package` to build the application and download any required updates.
- Start the server using `.\mvnw spring-boot:run`.
- Verify the REST service:
  - Query: `curl.exe -i http://localhost:8083/countries/in` (case-insensitive test)
  - Verify that the response body is:
    ```json
    {
      "code": "IN",
      "name": "India"
    }
    ```
  - Query: `curl.exe -i http://localhost:8083/countries/jp`
  - Verify that the response body is:
    ```json
    {
      "code": "JP",
      "name": "Japan"
    }
    ```
  - Verify logs output start/end messages for `getCountry()`.
