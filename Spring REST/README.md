# Spring Web Maven Project: spring-learn Walkthrough

This document contains a comprehensive walk-through of the Spring Web Maven project `spring-learn`, covering directory structure, configurations, code, and annotations.

---

## 1. Directory Structure

The project follows the standard Maven directory layout:

*   `src/main/java`: 
    *   **Purpose**: Contains the application source code (Java files).
    *   **Details**: All package structures (e.g., `com.cognizant.springlearn`) and Java classes (such as controllers, services, repositories, and the main application launcher) reside here.
*   `src/main/resources`: 
    *   **Purpose**: Contains configuration files and static/template resources.
    *   **Details**: Includes `application.properties` or `application.yml` (for application configurations like server ports, database URLs, etc.), static resources (CSS, JS, images), and templates (HTML files).
*   `src/test/java`: 
    *   **Purpose**: Contains test source code.
    *   **Details**: All unit tests and integration tests reside here, structured in corresponding packages matching `src/main/java`.

---

## 2. SpringLearnApplication.java Walkthrough

The entry point of our Spring Boot application is [SpringLearnApplication.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/SpringLearnApplication.java):

```java
package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringLearnApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {
		LOGGER.info("Inside main method of SpringLearnApplication");
		SpringApplication.run(SpringLearnApplication.class, args);
		LOGGER.info("SpringLearnApplication started successfully");
	}

}
```

### The `main` Method Walkthrough
*   **Log Statements**: We initialize a logger using `LoggerFactory.getLogger(SpringLearnApplication.class)` and log messages before and after application startup to verify its execution.
*   `SpringApplication.run(SpringLearnApplication.class, args)`:
    *   This static method boots up the application.
    *   It bootstraps Spring, starts the embedded web server (Tomcat by default), detects spring configurations, and initializes the ApplicationContext.

### Purpose of `@SpringBootApplication` Annotation
The `@SpringBootApplication` is a convenience annotation that combines three essential annotations:
1.  `@SpringBootConfiguration`: Marks the class as a source of bean definitions for the application context.
2.  `@EnableAutoConfiguration`: Tells Spring Boot to automatically configure beans based on the classpath dependencies (e.g., configuring an embedded Tomcat server because `spring-boot-starter-web` is present).
3.  `@ComponentScan`: Tells Spring to scan the current package and all sub-packages for Spring components (like `@RestController`, `@Service`, `@Repository`, and `@Component`).

---

## 3. Maven Configuration (`pom.xml`) Walkthrough

The [pom.xml](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/pom.xml) defines the project coordinates, properties, dependencies, and build plugins:

*   `<parent>`: Configures the Spring Boot Starter Parent. It inherits dependency management, plugin configurations, and default resource filtering.
*   `<properties>`: Defines the Java compiler version (set to Java 17).
*   `<dependencies>`:
    *   `spring-boot-starter-web`: Pulls in standard Spring MVC, REST support, and embedded Tomcat dependencies.
    *   `spring-boot-devtools`: Enables auto-restart, live reload, and configuration overrides to improve developer velocity.
    *   `spring-boot-starter-test`: Contains testing libraries (JUnit, Mockito, Spring Test, AssertJ) to verify application logic.
*   `<build>`: Uses `spring-boot-maven-plugin` to package the project into a single executable FAT JAR.

---

## 4. Maven Dependency Hierarchy & Tree

Maven manages transitive dependencies (dependencies of your dependencies) automatically.

### Running Dependency Tree Command
To view the dependency hierarchy in a text representation, run the following command in the `spring-learn` directory:
```bash
.\mvnw dependency:tree
```

### Understanding the Dependency Tree

Running `.\mvnw dependency:tree` produces the following actual output:

```text
[INFO] com.cognizant:spring-learn:jar:0.0.1-SNAPSHOT
[INFO] +- org.springframework.boot:spring-boot-starter-webmvc:jar:4.1.0:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter:jar:4.1.0:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-logging:jar:4.1.0:compile
[INFO] |  |  |  +- ch.qos.logback:logback-classic:jar:1.5.34:compile
[INFO] |  |  |  |  \- ch.qos.logback:logback-core:jar:1.5.34:compile
[INFO] |  |  |  +- org.apache.logging.log4j:log4j-to-slf4j:jar:2.25.4:compile
[INFO] |  |  |  |  \- org.apache.logging.log4j:log4j-api:jar:2.25.4:compile
[INFO] |  |  |  \- org.slf4j:jul-to-slf4j:jar:2.0.18:compile
[INFO] |  |  +- jakarta.annotation:jakarta.annotation-api:jar:3.0.0:compile
[INFO] |  |  \- org.yaml:snakeyaml:jar:2.6:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-jackson:jar:4.1.0:compile
[INFO] |  |  \- org.springframework.boot:spring-boot-jackson:jar:4.1.0:compile
[INFO] |  |     \- tools.jackson.core:jackson-databind:jar:3.1.4:compile
[INFO] |  |        +- com.fasterxml.jackson.core:jackson-annotations:jar:2.21:compile
[INFO] |  |        \- tools.jackson.core:jackson-core:jar:3.1.4:compile
[INFO] |  +- org.springframework.boot:spring-boot-starter-tomcat:jar:4.1.0:compile
[INFO] |  |  +- org.springframework.boot:spring-boot-starter-tomcat-runtime:jar:4.1.0:compile
[INFO] |  |  |  +- org.apache.tomcat.embed:tomcat-embed-core:jar:11.0.22:compile
[INFO] |  |  |  +- org.apache.tomcat.embed:tomcat-embed-el:jar:11.0.22:compile
[INFO] |  |  |  \- org.apache.tomcat.embed:tomcat-embed-websocket:jar:11.0.22:compile
[INFO] |  |  \- org.springframework.boot:spring-boot-tomcat:jar:4.1.0:compile
[INFO] |  +- org.springframework.boot:spring-boot-http-converter:jar:4.1.0:compile
[INFO] |  |  \- org.springframework:spring-web:jar:7.0.8:compile
[INFO] |  |     +- org.springframework:spring-beans:jar:7.0.8:compile
[INFO] |  |     \- io.micrometer:micrometer-observation:jar:1.17.0:compile
[INFO] |  |        \- io.micrometer:micrometer-commons:jar:1.17.0:compile
[INFO] |  \- org.springframework.boot:spring-boot-webmvc:jar:4.1.0:compile
[INFO] |     +- org.springframework.boot:spring-boot-servlet:jar:4.1.0:compile
[INFO] |     \- org.springframework:spring-webmvc:jar:7.0.8:compile
[INFO] |        +- org.springframework:spring-aop:jar:7.0.8:compile
[INFO] |        \- org.springframework:spring-expression:jar:7.0.8:compile
[INFO] +- org.springframework.boot:spring-boot-devtools:jar:4.1.0:runtime (optional)
[INFO] |  +- org.springframework.boot:spring-boot:jar:4.1.0:compile
[INFO] |  |  +- org.springframework:spring-core:jar:7.0.8:compile
[INFO] |  |  |  +- commons-logging:commons-logging:jar:1.3.6:compile
[INFO] |  |  |  \- org.jspecify:jspecify:jar:1.0.0:compile
[INFO] |  |  \- org.springframework:spring-context:jar:7.0.8:compile
[INFO] |  \- org.springframework.boot:spring-boot-autoconfigure:jar:4.1.0:compile
[INFO] \- org.springframework.boot:spring-boot-starter-webmvc-test:jar:4.1.0:test
[INFO]    +- org.springframework.boot:spring-boot-starter-jackson-test:jar:4.1.0:test
[INFO]    +- org.springframework.boot:spring-boot-starter-test:jar:4.1.0:test
...
```

This hierarchy illustrates that `spring-boot-starter-webmvc` transitively brings in all components needed for building web/REST services, including logging (`logback`), HTTP message conversion (Jackson serialization), Tomcat server, and Spring's core web utilities. You do not need to specify individual dependencies or version numbers.

---

## 5. ex2(1) Hands-on Walkthrough (Hello World RESTful Web Service)

In this exercise, we implement a simple REST endpoint `/hello` returning `"Hello World!!"` with entry/exit log statements.

### 5.1 Project Component Changes
1. **Controller Class**: Created [HelloController.java](file:///c:/Users/logan/Desktop/CTS/CTS/Spring%20REST/spring-learn/src/main/java/com/cognizant/springlearn/controller/HelloController.java) under the package `com.cognizant.springlearn.controller`. It has the `@RestController` annotation and a mapping for `GET /hello`:
   ```java
   @RestController
   public class HelloController {
       private static final Logger LOGGER = LoggerFactory.getLogger(HelloController.class);

       @GetMapping("/hello")
       public String sayHello() {
           LOGGER.info("Start: sayHello() execution");
           String message = "Hello World!!";
           LOGGER.info("End: sayHello() execution");
           return message;
       }
   }
   ```
2. **Application Properties**: Updated `server.port=8083` in `application.properties`.

### 5.2 Verification Logs
When we access `http://localhost:8083/hello`, the console outputs:
```text
2026-07-09T09:48:47.601+05:30  INFO 17204 --- [spring-learn] [nio-8083-exec-1] c.c.s.controller.HelloController         : Start: sayHello() execution
2026-07-09T09:48:47.601+05:30  INFO 17204 --- [spring-learn] [nio-8083-exec-1] c.c.s.controller.HelloController         : End: sayHello() execution
```

### 5.3 HTTP Headers Details (SME Walkthrough)
When hitting this endpoint:
* **Chrome Browser Developer Tools (Network Tab)**:
  * **Request Headers**: Chrome automatically adds headers such as `Accept` (declaring preferences like HTML/text/images), `Accept-Encoding` (`gzip, deflate, br`), and `User-Agent` (client information).
  * **Response Headers**: Tomcat returns headers such as `Content-Type: text/plain;charset=UTF-8` (specifying a plain text response body encoded in UTF-8), `Content-Length: 13` (size of the message in bytes), and `Date`.
* **Postman (Headers Tab)**:
  * It shows the key response headers from Tomcat: `Content-Type` (`text/plain;charset=UTF-8`), `Content-Length` (`13`), `Date` (timestamp), `Keep-Alive` (`timeout=60`), and `Connection` (`keep-alive`).

