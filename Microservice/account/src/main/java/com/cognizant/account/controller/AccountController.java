package com.cognizant.account.controller;

import com.cognizant.account.model.Account;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for the Account Microservice.
 *
 * Exposes:
 *   GET /accounts/{number}
 *
 * Returns a hardcoded dummy account without any backend connectivity.
 *
 * Sample Request : http://localhost:8080/accounts/00987987973432
 * Sample Response: {"number":"00987987973432","type":"savings","balance":234343}
 */
@RestController
public class AccountController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);

    /**
     * Returns account details for a given account number.
     * Note: Returns a hardcoded dummy response (no backend connectivity).
     *
     * @param number the account number from the URL path
     * @return Account object serialized as JSON
     */
    @GetMapping("/accounts/{number}")
    public Account getAccount(@PathVariable("number") String number) {
        LOGGER.debug("Start: getAccount() for number: {}", number);

        // Dummy hardcoded response as per exercise specification
        Account account = new Account("00987987973432", "savings", 234343);

        LOGGER.debug("End: getAccount() - returning account: {}", account.getNumber());
        return account;
    }
}
