package org.dev.pixels.service.external;

import org.dev.pixels.model.Account;
import org.dev.pixels.service.exception.IllegalArgumentException;
import org.dev.pixels.service.exception.*;
import org.dev.pixels.service.internal.AccountService;
import org.dev.pixels.service.internal.IdentificationService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ExternalAccountManager implements ExternalAccountService {
    private final AccountService accountService;
    private final IdentificationService identificationService;

    public ExternalAccountManager(AccountService accountService, IdentificationService identificationService) {
        this.accountService = accountService;
        this.identificationService = identificationService;
    }

    @Override
    public List<Account> readAccounts(Authentication authentication, Long id) throws IllegalArgumentException {
        if (id == null) {
            if (authentication == null) {
                throw new IllegalArgumentException();
            }
            id = identificationService.identifyAccount(authentication).getId();
        }
        List<Account> accounts = accountService.readAccounts(id, null);
        for (Account account : accounts) {
            account.setPassword(null);
            if (!verifyClientIsOwnerOrAdmin(authentication, account)) {
                account.setLoginName(null);
                account.setAuthorities(null);
            }
        }
        return accounts;
    }

    @Override
    public Account createAccount(Authentication authentication, Account account) throws IllegalArgumentException, ConflictException {
        account = accountService.createAccount(account);
        account.setPassword(null);
        return account;
    }

    @Override
    public Account updateAccount(Authentication authentication, Long id, Account account) throws IllegalArgumentException, NotFoundException, NotAuthenticatedException, NotAuthorizedException, ConflictException {
        if (id == null) {
            if (authentication == null) {
                throw new IllegalArgumentException();
            }
            id = identificationService.identifyAccount(authentication).getId();
        }
        List<Account> existingAccounts = accountService.readAccounts(id, null);
        if (existingAccounts.isEmpty()) {
            throw new NotFoundException();
        }
        Account existingAccount = existingAccounts.get(0);
        if (authentication == null) {
            throw new NotAuthenticatedException();
        }
        if (!verifyClientIsOwnerOrAdmin(authentication, existingAccount)) {
            throw new NotAuthorizedException();
        }
        account = cloneAccount(account);
        if (!identificationService.verifyAtLeastOneAuthority(authentication, Set.of("ADMIN"))) {
            account.setAuthorities(null);
        }
        account = accountService.updateAccount(id, account);
        account.setPassword(null);
        return account;
    }

    @Override
    public void deleteAccount(Authentication authentication, Long id) throws IllegalArgumentException, NotFoundException, NotAuthenticatedException, NotAuthorizedException {
        if (id == null) {
            if (authentication == null) {
                throw new IllegalArgumentException();
            }
            id = identificationService.identifyAccount(authentication).getId();
        }
        List<Account> existingAccounts = accountService.readAccounts(id, null);
        if (existingAccounts.isEmpty()) {
            throw new NotFoundException();
        }
        Account existingAccount = existingAccounts.get(0);
        if (authentication == null) {
            throw new NotAuthenticatedException();
        }
        if (!verifyClientIsOwnerOrAdmin(authentication, existingAccount)) {
            throw new NotAuthorizedException();
        }
        accountService.deleteAccount(id);
    }

    private Account cloneAccount(Account account) {
        if (account == null) {
            return null;
        }
        Account clone = new Account();
        clone.setId(account.getId());
        clone.setLoginName(account.getLoginName());
        clone.setPassword(account.getPassword());
        clone.setAuthorities(account.getAuthorities());
        clone.setPublicName(account.getPublicName());
        return clone;
    }

    private boolean verifyClientIsOwnerOrAdmin(Authentication authentication, Account account) {
        if (authentication == null) {
            return false;
        }
        if (Objects.equals(account.getId(), identificationService.identifyAccount(authentication).getId())) {
            return true;
        }
        return identificationService.verifyAtLeastOneAuthority(authentication, Set.of("ADMIN"));
    }
}
