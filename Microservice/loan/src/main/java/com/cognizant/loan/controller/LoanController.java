package com.cognizant.loan.controller;

import com.cognizant.loan.model.Loan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for the Loan Microservice.
 *
 * Exposes:
 *   GET /loans/{number}
 *
 * Returns a hardcoded dummy loan without any backend connectivity.
 *
 * Sample Request : http://localhost:8081/loans/H00987987972342
 * Sample Response: {"number":"H00987987972342","type":"car","loan":400000,"emi":3258,"tenure":18}
 */
@RestController
public class LoanController {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoanController.class);

    /**
     * Returns loan details for a given loan number.
     * Note: Returns a hardcoded dummy response (no backend connectivity).
     *
     * @param number the loan number from the URL path
     * @return Loan object serialized as JSON
     */
    @GetMapping("/loans/{number}")
    public Loan getLoan(@PathVariable("number") String number) {
        LOGGER.debug("Start: getLoan() for number: {}", number);

        // Dummy hardcoded response as per exercise specification
        Loan loan = new Loan("H00987987972342", "car", 400000, 3258, 18);

        LOGGER.debug("End: getLoan() - returning loan: {}", loan.getNumber());
        return loan;
    }
}
