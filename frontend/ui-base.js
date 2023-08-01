/* Requires:
 * - auth.js
 * - accounts.js
 * - friendships.js
 * - ui-api.js
 */

const uiBase = {

  internal: {

    elements: {
      content: {
        root: document.getElementById('content'),
        loginModule: {
          root: document.getElementById('content_login_module'),
          tabs: {
            root: document.getElementById('content_login_module_tabs'),
            loginTab: document.getElementById('content_login_module_tabs_login_tab'),
            createAccountTab: document.getElementById('content_login_module_tabs_create_account_tab')
          },
          pages: {
            root: document.getElementById('content_login_module_pages'),
            loginPage: {
              root: document.getElementById('content_login_module_pages_login_page'),
              usernameInput: document.getElementById('content_login_module_pages_login_page_username_input'),
              passwordInput: document.getElementById('content_login_module_pages_login_page_password_input'),
              loginButton: document.getElementById('content_login_module_pages_login_page_login_button'),
            },
            createAccountPage: {
              root: document.getElementById('content_login_module_pages_create_account_page'),
              usernameInput: document.getElementById('content_login_module_pages_create_account_page_username_input'),
              passwordInput: document.getElementById('content_login_module_pages_create_account_page_password_input'),
              publicNameInput: document.getElementById('content_login_module_pages_create_account_page_public_name_input'),
              createAccountButton: document.getElementById('content_login_module_pages_create_account_page_create_account_button')
            }
          }
        },
        gameModule: {
          root: document.getElementById('content_game_module'),
          game: document.getElementById('content_game_module_game')
        }
      },
      topBar: {
        root: document.getElementById('top_bar'),
        title: document.getElementById('top_bar_title'),
        friendsButton: document.getElementById('top_bar_friends_button'),
        accountButton: document.getElementById('top_bar_account_button'),
        logoutButton: document.getElementById('top_bar_logout_button')
      },
      overlay: {
        root: document.getElementById('overlay'),
        friendsPage: {
          root: document.getElementById('overlay_friends_page'),
          friendsList: document.getElementById('overlay_friends_page_friends_list'),
          incomingFriendshipRequestEntryTemplate: document.getElementsByClassName('incoming_friendship_request_entry')[0],
          confirmedFriendshipEntryTemplate: document.getElementsByClassName('confirmed_friendship_entry')[0],
          outgoingFriendshipRequestEntryTemplate: document.getElementsByClassName('outgoing_friendship_request_entry')[0],
          addFriendSection: {
            root: document.getElementById('overlay_friends_page_add_friend_section'),
            result: {
              root: document.getElementById('overlay_friends_page_add_friend_section_result'),
              name: document.getElementById('overlay_friends_page_add_friend_section_result_name'),
              addFriendButton: document.getElementById('overlay_friends_page_add_friend_section_result_add_friend_button')
            },
            idInput: document.getElementById('overlay_friends_page_add_friend_section_id_input'),
            searchButton: document.getElementById('overlay_friends_page_add_friend_section_search_button')
          }
        },
        accountPage: {
          root: document.getElementById('overlay_account_page'),
          id: document.getElementById('overlay_account_page_id'),
          username: document.getElementById('overlay_account_page_username'),
          publicName: document.getElementById('overlay_account_page_public_name'),
          modifyButton: document.getElementById('overlay_account_page_modify_button'),
        },
        modifyAccountPage: {
          root: document.getElementById('overlay_modify_account_page'),
          usernameInput: document.getElementById('overlay_modify_account_page_username_input'),
          passwordInput: document.getElementById('overlay_modify_account_page_password_input'),
          publicNameInput: document.getElementById('overlay_modify_account_page_public_name_input'),
          cancelButton: document.getElementById('overlay_modify_account_page_cancel_button'),
          deleteButton: document.getElementById('overlay_modify_account_page_delete_button'),
          saveButton: document.getElementById('overlay_modify_account_page_save_button')
        }
      },
      blocker: {
        root: document.getElementById('blocker'),
        indicator: document.getElementById('blocker_indicator')
      },
      notification: {
        root: document.getElementById('notification'),
        message: document.getElementById('notification_message')
      }
    },

    state: {
      notificationTimeoutId: null,
      addFriendButtonHandler: null,
      navigationHandlers: [ ]
    },

    // TODO: Invoke this whenever navigation occurs
    invokeNavigationHandlers: (navigation) => {
      for (const handler of uiBase.internal.state.navigationHandlers) {
        handler(navigation);
      }
    },

    registerApiHandlers: () => {
      auth.registerLoginHandler(uiBase.internal.handleLogin);
      auth.registerLogoutHandler(uiBase.internal.handleLogout);
      accounts.registerSelfChangeHandler(uiBase.internal.handleSelfChange);
      friendships.registerFriendshipsChangeHandler(uiBase.internal.handleFriendshipsChange);
    },

    registerUiHandlers: () => {
      uiBase.internal.elements.content.loginModule.tabs.loginTab.addEventListener('click', () => {
        uiBase.internal.showLoginPage();
        uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.focus();
      });
      uiBase.internal.elements.content.loginModule.tabs.createAccountTab.addEventListener('click', () => {
        uiBase.internal.showCreateAccountPage();
        uiBase.internal.elements.content.loginModule.pages.createAccountPage.usernameInput.focus();
      });
      uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.focus();
        }
      });
      uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.addEventListener('keydown', async e => {
        if (e.key === 'Enter') {
          await uiBase.internal.parseInputAndLogin();
        }
      });
      uiBase.internal.elements.content.loginModule.pages.loginPage.loginButton.addEventListener('click', async () => {
        await uiBase.internal.parseInputAndLogin();
      });
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.usernameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          uiBase.internal.elements.content.loginModule.pages.createAccountPage.passwordInput.focus();
        }
      });
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.passwordInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          uiBase.internal.elements.content.loginModule.pages.createAccountPage.publicNameInput.focus();
        }
      });
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.publicNameInput.addEventListener('keydown', async e => {
        if (e.key === 'Enter') {
          await uiBase.internal.parseInputAndCreateAccount();
        }
      });
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.createAccountButton.addEventListener('click', async () => {
        await uiBase.internal.parseInputAndCreateAccount();
      });
      uiBase.internal.elements.topBar.friendsButton.addEventListener('click', () => {
        uiBase.internal.clearFriendshipSearchResult();
        uiBase.internal.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
        uiBase.internal.showFriendsPage();
        uiBase.internal.showOverlay();
      });
      uiBase.internal.elements.topBar.accountButton.addEventListener('click', () => {
        uiBase.internal.showAccountPage();
        uiBase.internal.showOverlay();
      });
      uiBase.internal.elements.topBar.logoutButton.addEventListener('click', async () => {
        try {
          await auth.logout();
        }
        catch { }
      });
      uiBase.internal.elements.overlay.root.addEventListener('click', () => {
        uiBase.internal.hideOverlay();
      });
      for (const child of uiBase.internal.elements.overlay.root.children) {
        child.addEventListener('click', e => {
          e.stopPropagation();
        });
      }
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.idInput.addEventListener('keydown', async e => {
        if (e.key === 'Enter') {
          await uiBase.internal.parseInputAndShowFriendshipSearchResult();
        }
      });
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.searchButton.addEventListener('click', async () => {
        await uiBase.internal.parseInputAndShowFriendshipSearchResult();
      });
      uiBase.internal.elements.overlay.accountPage.modifyButton.addEventListener('click', () => {
        uiBase.internal.refreshModifyAccountPage();
        uiBase.internal.showModifyAccountPage();
        uiBase.internal.elements.overlay.modifyAccountPage.usernameInput.focus();
      });
      uiBase.internal.elements.overlay.modifyAccountPage.usernameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          uiBase.internal.elements.overlay.modifyAccountPage.passwordInput.focus();
        }
      });
      uiBase.internal.elements.overlay.modifyAccountPage.passwordInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          uiBase.internal.elements.overlay.modifyAccountPage.publicNameInput.focus();
        }
      });
      uiBase.internal.elements.overlay.modifyAccountPage.publicNameInput.addEventListener('keydown', async e => {
        if (e.key === 'Enter') {
          await uiBase.internal.parseInputAndUpdateAccount();
        }
      });
      uiBase.internal.elements.overlay.modifyAccountPage.cancelButton.addEventListener('click', () => {
        uiBase.internal.showAccountPage();
      });
      uiBase.internal.elements.overlay.modifyAccountPage.deleteButton.addEventListener('click', async () => {
        try {
          await accounts.deleteAccount(null);
        }
        catch {
          uiBase.internal.notify('Failed to delete account');
          return;
        }
        uiBase.internal.notify('Successfully deleted account');
        try {
          await auth.logout();
        }
        catch { }
      });
      uiBase.internal.elements.overlay.modifyAccountPage.saveButton.addEventListener('click', async () => {
        await uiBase.internal.parseInputAndUpdateAccount();
      });
    },

    clearUi: () => {
      uiApi.hide(uiBase.internal.elements.content.loginModule.root);
      uiApi.hide(uiBase.internal.elements.content.loginModule.pages.loginPage.root);
      uiApi.hide(uiBase.internal.elements.content.loginModule.pages.createAccountPage.root);
      uiApi.hide(uiBase.internal.elements.content.gameModule.root);
      uiApi.hide(uiBase.internal.elements.topBar.title);
      uiApi.hide(uiBase.internal.elements.topBar.friendsButton);
      uiApi.hide(uiBase.internal.elements.topBar.accountButton);
      uiApi.hide(uiBase.internal.elements.topBar.logoutButton);
      uiApi.hide(uiBase.internal.elements.overlay.root);
      uiApi.hide(uiBase.internal.elements.overlay.friendsPage.root);
      uiBase.internal.elements.overlay.friendsPage.incomingFriendshipRequestEntryTemplate.remove();
      uiBase.internal.elements.overlay.friendsPage.confirmedFriendshipEntryTemplate.remove();
      uiBase.internal.elements.overlay.friendsPage.outgoingFriendshipRequestEntryTemplate.remove();
      uiApi.cloak(uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.root);
      uiApi.hide(uiBase.internal.elements.overlay.accountPage.root);
      uiApi.hide(uiBase.internal.elements.overlay.modifyAccountPage.root);
      uiApi.hide(uiBase.internal.elements.notification.root);
    },

    clearContent: () => {
      for (const child of uiBase.internal.elements.content.root.children) {
        uiApi.hide(child);
      }
    },

    showLoginModule: () => {
      uiBase.internal.clearContent();
      uiApi.show(uiBase.internal.elements.content.loginModule.root);
    },

    showLoginPage: () => {
      uiApi.hide(uiBase.internal.elements.content.loginModule.pages.createAccountPage.root);
      uiApi.show(uiBase.internal.elements.content.loginModule.pages.loginPage.root);
      uiApi.unselect(uiBase.internal.elements.content.loginModule.tabs.createAccountTab);
      uiApi.select(uiBase.internal.elements.content.loginModule.tabs.loginTab);
    },

    showCreateAccountPage: () => {
      uiApi.hide(uiBase.internal.elements.content.loginModule.pages.loginPage.root);
      uiApi.show(uiBase.internal.elements.content.loginModule.pages.createAccountPage.root);
      uiApi.unselect(uiBase.internal.elements.content.loginModule.tabs.loginTab);
      uiApi.select(uiBase.internal.elements.content.loginModule.tabs.createAccountTab);
    },

    showGameModule: () => {
      uiBase.internal.clearContent();
      uiApi.show(uiBase.internal.elements.content.gameModule.root);
    },

    hideTopBarTitle: () => {
      uiApi.hide(uiBase.internal.elements.topBar.title);
    },

    showTopBarTitle: () => {
      uiApi.show(uiBase.internal.elements.topBar.title);
    },

    hideTopBarButtons: () => {
      uiApi.hide(uiBase.internal.elements.topBar.friendsButton);
      uiApi.hide(uiBase.internal.elements.topBar.accountButton);
      uiApi.hide(uiBase.internal.elements.topBar.logoutButton);
    },

    showTopBarButtons: () => {
      uiApi.show(uiBase.internal.elements.topBar.friendsButton);
      uiApi.show(uiBase.internal.elements.topBar.accountButton);
      uiApi.show(uiBase.internal.elements.topBar.logoutButton);
    },

    hideOverlay: () => {
      uiApi.hide(uiBase.internal.elements.overlay.root);
    },

    showOverlay: () => {
      uiApi.show(uiBase.internal.elements.overlay.root);
    },

    clearOverlay: () => {
      for (const child of uiBase.internal.elements.overlay.root.children) {
        uiApi.hide(child);
      }
    },

    showFriendsPage: () => {
      uiBase.internal.clearOverlay();
      uiApi.show(uiBase.internal.elements.overlay.friendsPage.root);
    },

    addIncomingFriendshipRequestEntry: (friendEntry) => {
      const entry = uiBase.internal.elements.overlay.friendsPage.incomingFriendshipRequestEntryTemplate.cloneNode(true);
      entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
      entry.getElementsByClassName('friend_entry_accept_button')[0].addEventListener('click', async () => {
        try {
          await friendships.requestFriendship(friendEntry.friendAccount.id);
        }
        catch {
          uiBase.internal.notify('Failed to accept friend request');
          return;
        }
        uiBase.internal.notify('Accepted friend request');
      });
      entry.getElementsByClassName('friend_entry_deny_button')[0].addEventListener('click', async () => {
        try {
          await friendships.terminateFriendship(friendEntry.friendAccount.id);
        }
        catch {
          uiBase.internal.notify('Failed to deny friend request');
          return;
        }
        uiBase.internal.notify('Denied friend request');
      });
      uiBase.internal.elements.overlay.friendsPage.friendsList.insertBefore(entry, uiBase.internal.elements.overlay.friendsPage.friendsList.firstElementChild);
    },

    addConfirmedFriendshipEntry: (friendEntry) => {
      const entry = uiBase.internal.elements.overlay.friendsPage.confirmedFriendshipEntryTemplate.cloneNode(true);
      entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
      entry.getElementsByClassName('friend_entry_remove_button')[0].addEventListener('click', async () => {
        try {
          await friendships.terminateFriendship(friendEntry.friendAccount.id);
        }
        catch {
          uiBase.internal.notify('Failed to remove friend');
          return;
        }
        uiBase.internal.notify('Removed friend');
      });
      uiBase.internal.elements.overlay.friendsPage.friendsList.insertBefore(entry, uiBase.internal.elements.overlay.friendsPage.friendsList.firstElementChild);
    },

    addOutgoingFriendshipRequestEntry: (friendEntry) => {
      const entry = uiBase.internal.elements.overlay.friendsPage.outgoingFriendshipRequestEntryTemplate.cloneNode(true);
      entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
      entry.getElementsByClassName('friend_entry_cancel_button')[0].addEventListener('click', async () => {
        try {
          await friendships.terminateFriendship(friendEntry.friendAccount.id);
        }
        catch {
          uiBase.internal.notify('Failed to cancel friend request');
          return;
        }
        uiBase.internal.notify('Canceled friend request');
      });
      uiBase.internal.elements.overlay.friendsPage.friendsList.insertBefore(entry, uiBase.internal.elements.overlay.friendsPage.friendsList.firstElementChild);
    },

    refreshFriendsList: () => {
      uiBase.internal.elements.overlay.friendsPage.friendsList.innerHTML = null;
      const friends = friendships.getFriendships();
      if (friends == null) {
        return;
      }
      if (friends.outgoingRequests != null) {
        for (const friendEntry of friends.outgoingRequests) {
          uiBase.internal.addOutgoingFriendshipRequestEntry(friendEntry);
        }
      }
      if (friends.confirmedFriendships != null) {
        for (const friendEntry of friends.confirmedFriendships) {
          uiBase.internal.addConfirmedFriendshipEntry(friendEntry);
        }
      }
      if (friends.incomingRequests != null) {
        for (const friendEntry of friends.incomingRequests) {
          uiBase.internal.addIncomingFriendshipRequestEntry(friendEntry);
        }
      }
    },

    clearFriendshipSearchResult: () => {
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = null;
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', uiBase.internal.state.addFriendButtonHandler);
      uiBase.internal.state.addFriendButtonHandler = null;
      uiApi.cloak(uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.root);
    },

    showAccountPage: () => {
      uiBase.internal.clearOverlay();
      uiApi.show(uiBase.internal.elements.overlay.accountPage.root);
    },

    refreshAccountPage: () => {
      const account = accounts.getSelf();
      if (account == null) {
        uiBase.internal.elements.overlay.accountPage.id.innerHTML = null;
        uiBase.internal.elements.overlay.accountPage.username.innerHTML = null;
        uiBase.internal.elements.overlay.accountPage.publicName.innerHTML = null;
      } else {
        uiBase.internal.elements.overlay.accountPage.id.innerHTML = account.id;
        uiBase.internal.elements.overlay.accountPage.username.innerHTML = account.loginName;
        uiBase.internal.elements.overlay.accountPage.publicName.innerHTML = account.publicName;
      }
    },

    showModifyAccountPage: () => {
      uiBase.internal.clearOverlay();
      uiApi.show(uiBase.internal.elements.overlay.modifyAccountPage.root);
    },

    refreshModifyAccountPage: () => {
      const account = accounts.getSelf();
      if (account == null) {
        uiBase.internal.elements.overlay.modifyAccountPage.usernameInput.value = null;
        uiBase.internal.elements.overlay.modifyAccountPage.passwordInput.value = null;
        uiBase.internal.elements.overlay.modifyAccountPage.publicNameInput.value = null;
      } else {
        uiBase.internal.elements.overlay.modifyAccountPage.usernameInput.value = account.loginName;
        uiBase.internal.elements.overlay.modifyAccountPage.passwordInput.value = null;
        uiBase.internal.elements.overlay.modifyAccountPage.publicNameInput.value = account.publicName;
      }
    },

    notify: (message) => {
      clearTimeout(uiBase.internal.state.notificationTimeoutId);
      uiBase.internal.elements.notification.message.innerHTML = message;
      uiApi.show(uiBase.internal.elements.notification.root);
      uiBase.internal.state.notificationTimeoutId = setTimeout(() => {
        uiApi.hide(uiBase.internal.elements.notification.root);
        uiBase.internal.elements.notification.message.innerHTML = null;
      }, 2000);
    },

    hideBlocker: () => {
      uiApi.hide(uiBase.internal.elements.blocker.root);
    },

    showBlocker: () => {
      uiApi.show(uiBase.internal.elements.blocker.root);
    },

    parseInputAndLogin: async () => {
      const username = uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.value;
      const password = uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.value;
      if (username === '' || password === '') {
        return;
      }
      try {
        await auth.login(username, password);
      }
      catch (e) {
        switch (e.message) {
          case '400':
            uiBase.internal.notify('Failed to login');
            break;
          case '401':
            uiBase.internal.notify('Invalid credentials');
            break;
        }
        return;
      }
    },

    parseInputAndCreateAccount: async () => {
      const username = uiBase.internal.elements.content.loginModule.pages.createAccountPage.usernameInput.value;
      const password = uiBase.internal.elements.content.loginModule.pages.createAccountPage.passwordInput.value;
      const publicName = uiBase.internal.elements.content.loginModule.pages.createAccountPage.publicNameInput.value;
      let account;
      try {
        account = await accounts.createAccount(username, password, publicName);
      }
      catch (e) {
        switch (e.message) {
          case '400':
            uiBase.internal.notify('Rules not met');
            break;
          case '409':
            uiBase.internal.notify('Username already taken');
            break;
        }
        return;
      }
      uiBase.internal.notify('Successfully created account');
      uiBase.internal.showLoginPage();
      uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.value = account.loginName;
      uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.focus();
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.usernameInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.passwordInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.publicNameInput.value = null;
    },

    parseInputAndShowFriendshipSearchResult: async () => {
      const accountId = parseInt(uiBase.internal.elements.overlay.friendsPage.addFriendSection.idInput.value);
      if (isNaN(accountId)) {
        return;
      }
      if (accountId === accounts.getSelf().id) {
        uiBase.internal.notify('Cannot add self as friend');
        return;
      }
      let matches;
      try {
        matches = await accounts.readAccounts(accountId);
      }
      catch (e) {
        uiBase.internal.notify('Failed to search for user');
        return;
      }
      if (matches.length == 0) {
        uiBase.internal.notify('User not found');
        return;
      }
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = matches[0].publicName;
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', uiBase.internal.state.addFriendButtonHandler);
      uiBase.internal.state.addFriendButtonHandler = async () => {
        try {
          await friendships.requestFriendship(accountId);
        }
        catch (e) {
          switch (e.message) {
            case '409':
              uiBase.internal.notify('User is already a confirmed or requested friend');
              break;
            default:
              uiBase.internal.notify('Failed to add friend');
              break;
          }
          return;
        }
        uiApi.cloak(uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.root);
        uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = null;
        uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', uiBase.internal.state.addFriendButtonHandler);
        uiBase.internal.state.addFriendButtonHandler = null;
        uiBase.internal.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
        uiBase.internal.notify('Friendship request sent');
      };
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.addEventListener('click', uiBase.internal.state.addFriendButtonHandler);
      uiApi.uncloak(uiBase.internal.elements.overlay.friendsPage.addFriendSection.result.root);
    },

    parseInputAndUpdateAccount: async () => {
      let username = uiBase.internal.elements.overlay.modifyAccountPage.usernameInput.value;
      username = username.length > 0 ? username : null;
      let password = uiBase.internal.elements.overlay.modifyAccountPage.passwordInput.value;
      password = password.length > 0 ? password : null;
      let publicName = uiBase.internal.elements.overlay.modifyAccountPage.publicNameInput.value;
      publicName = publicName.length > 0 ? publicName : null;
      try {
        await accounts.updateAccount(null, username, password, null, publicName);
      }
      catch (e) {
        switch (e.message) {
          case '400':
            uiBase.internal.notify('Rules not met');
            break;
          case '401':
            uiBase.internal.notify('Not authenticated');
            break;
          case '403':
            uiBase.internal.notify('Not authorized');
            break;
          case '404':
            uiBase.internal.notify('No such account');
            break;
          case '409':
            uiBase.internal.notify('Username already taken');
            break;
        }
        return;
      }
      uiBase.internal.notify('Successfully updated account');
      try {
        await auth.logout();
      }
      catch { }
    },

    handleLogin: () => {
      uiBase.internal.showBlocker();
      uiBase.internal.showGameModule();
      uiBase.internal.hideTopBarTitle();
      uiBase.internal.showTopBarButtons();
      uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.loginPage.passwordInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.usernameInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.passwordInput.value = null;
      uiBase.internal.elements.content.loginModule.pages.createAccountPage.publicNameInput.value = null;
      uiBase.internal.hideBlocker();
    },

    handleLogout: () => {
      uiBase.internal.showBlocker();
      uiBase.internal.hideOverlay();
      uiBase.internal.hideTopBarButtons();
      uiBase.internal.showTopBarTitle();
      uiBase.internal.showLoginPage();
      uiBase.internal.showLoginModule();
      uiBase.internal.elements.content.loginModule.pages.loginPage.usernameInput.focus();
      uiBase.internal.clearFriendshipSearchResult();
      uiBase.internal.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
      uiBase.internal.hideBlocker();
    },

    handleSelfChange: () => {
      uiBase.internal.refreshAccountPage();
      uiBase.internal.refreshModifyAccountPage();
    },

    handleFriendshipsChange: () => {
      uiBase.internal.refreshFriendsList();
    }

  },

  initialize: () => {
    uiBase.internal.clearUi();
    uiBase.internal.registerApiHandlers();
    uiBase.internal.registerUiHandlers();
    if (auth.isLoggedIn()) {
      uiBase.internal.handleLogin();
    } else {
      uiBase.internal.handleLogout();
    }
  },

  registerNavigationHandler: (handler) => {
    uiBase.internal.state.navigationHandlers.push(handler);
  }

};

uiBase.initialize();