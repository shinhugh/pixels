const uiOld = {

  state: {
    notificationTimeoutId: null,
    addFriendButtonHandler: null,
    keyWPressed: false,
    keyWPressTime: null,
    keyAPressed: false,
    keyAPressTime: null,
    keySPressed: false,
    keySPressTime: null,
    keyDPressed: false,
    keyDPressTime: null
  },

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
        game: {
          root: document.getElementById('content_game_module_game'),
          map: document.getElementById('content_game_module_game_map')
        }
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
      backdrop: document.getElementById('overlay_backdrop'),
      window: document.getElementById('overlay_window'),
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

  hide: (element) => {
    element.style.display = 'none';
  },

  show: (element) => {
    element.style.removeProperty('display');
  },

  cloak: (element) => {
    element.style.visibility = 'hidden';
  },

  uncloak: (element) => {
    element.style.removeProperty('visibility');
  },

  select: (element) => {
    element.classList.add('selected');
  },

  unselect: (element) => {
    element.classList.remove('selected');
  },

  clearContent: () => {
    ui.hide(ui.elements.content.loginModule.root);
    ui.hide(ui.elements.content.gameModule.root);
  },

  hideOverlay: () => {
    ui.hide(ui.elements.overlay.root);
  },

  showOverlay: () => {
    ui.show(ui.elements.overlay.root);
  },

  clearOverlay: () => {
    ui.hide(ui.elements.overlay.friendsPage.root);
    ui.hide(ui.elements.overlay.accountPage.root);
    ui.hide(ui.elements.overlay.modifyAccountPage.root);
  },

  notify: (message) => {
    clearTimeout(ui.state.notificationTimeoutId);
    ui.elements.notification.message.innerHTML = message;
    ui.show(ui.elements.notification.root);
    ui.state.notificationTimeoutId = setTimeout(() => {
      ui.hide(ui.elements.notification.root);
      ui.elements.notification.message.innerHTML = null;
    }, 2000);
  },

  hideBlocker: () => {
    ui.hide(ui.elements.blocker.root);
  },

  showBlocker: () => {
    ui.show(ui.elements.blocker.root);
  },

  showLoginModule: () => {
    ui.clearContent();
    ui.show(ui.elements.content.loginModule.root);
  },

  showGameModule: () => {
    ui.clearContent();
    ui.show(ui.elements.content.gameModule.root);
  },

  hideTopBarTitle: () => {
    ui.hide(ui.elements.topBar.title);
  },

  showTopBarTitle: () => {
    ui.show(ui.elements.topBar.title);
  },

  hideTopBarButtons: () => {
    ui.hide(ui.elements.topBar.friendsButton);
    ui.hide(ui.elements.topBar.accountButton);
    ui.hide(ui.elements.topBar.logoutButton);
  },

  showTopBarButtons: () => {
    ui.show(ui.elements.topBar.friendsButton);
    ui.show(ui.elements.topBar.accountButton);
    ui.show(ui.elements.topBar.logoutButton);
  },

  showLoginPage: () => {
    ui.hide(ui.elements.content.loginModule.pages.createAccountPage.root);
    ui.show(ui.elements.content.loginModule.pages.loginPage.root);
    ui.unselect(ui.elements.content.loginModule.tabs.createAccountTab);
    ui.select(ui.elements.content.loginModule.tabs.loginTab);
  },

  showCreateAccountPage: () => {
    ui.hide(ui.elements.content.loginModule.pages.loginPage.root);
    ui.show(ui.elements.content.loginModule.pages.createAccountPage.root);
    ui.unselect(ui.elements.content.loginModule.tabs.loginTab);
    ui.select(ui.elements.content.loginModule.tabs.createAccountTab);
  },

  showFriendsPage: () => {
    ui.clearOverlay();
    ui.show(ui.elements.overlay.friendsPage.root);
  },

  showAccountPage: () => {
    ui.clearOverlay();
    ui.show(ui.elements.overlay.accountPage.root);
  },

  showModifyAccountPage: () => {
    ui.clearOverlay();
    ui.show(ui.elements.overlay.modifyAccountPage.root);
  },

  addIncomingFriendshipRequestEntry: (friendEntry) => {
    const entry = ui.elements.overlay.friendsPage.incomingFriendshipRequestEntryTemplate.cloneNode(true);
    entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
    entry.getElementsByClassName('friend_entry_accept_button')[0].addEventListener('click', async () => {
      try {
        await api.requestFriendship(friendEntry.friendAccount.id);
      }
      catch {
        ui.notify('Failed to accept friend request');
        return;
      }
      ui.notify('Accepted friend request');
    });
    entry.getElementsByClassName('friend_entry_deny_button')[0].addEventListener('click', async () => {
      try {
        await api.terminateFriendship(friendEntry.friendAccount.id);
      }
      catch {
        ui.notify('Failed to deny friend request');
        return;
      }
      ui.notify('Denied friend request');
    });
    ui.elements.overlay.friendsPage.friendsList.insertBefore(entry, ui.elements.overlay.friendsPage.friendsList.firstElementChild);
  },

  addConfirmedFriendshipEntry: (friendEntry) => {
    const entry = ui.elements.overlay.friendsPage.confirmedFriendshipEntryTemplate.cloneNode(true);
    entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
    entry.getElementsByClassName('friend_entry_remove_button')[0].addEventListener('click', async () => {
      try {
        await api.terminateFriendship(friendEntry.friendAccount.id);
      }
      catch {
        ui.notify('Failed to remove friend');
        return;
      }
      ui.notify('Removed friend');
    });
    ui.elements.overlay.friendsPage.friendsList.insertBefore(entry, ui.elements.overlay.friendsPage.friendsList.firstElementChild);
  },

  addOutgoingFriendshipRequestEntry: (friendEntry) => {
    const entry = ui.elements.overlay.friendsPage.outgoingFriendshipRequestEntryTemplate.cloneNode(true);
    entry.getElementsByClassName('friend_entry_name')[0].innerHTML = friendEntry.friendAccount.publicName;
    entry.getElementsByClassName('friend_entry_cancel_button')[0].addEventListener('click', async () => {
      try {
        await api.terminateFriendship(friendEntry.friendAccount.id);
      }
      catch {
        ui.notify('Failed to cancel friend request');
        return;
      }
      ui.notify('Canceled friend request');
    });
    ui.elements.overlay.friendsPage.friendsList.insertBefore(entry, ui.elements.overlay.friendsPage.friendsList.firstElementChild);
  },

  refreshFriendsList: () => {
    ui.elements.overlay.friendsPage.friendsList.innerHTML = null;
    const friends = api.getFriends();
    if (friends == null) {
      return;
    }
    if (friends.outgoingRequests != null) {
      for (const friendEntry of friends.outgoingRequests) {
        ui.addOutgoingFriendshipRequestEntry(friendEntry);
      }
    }
    if (friends.confirmedFriendships != null) {
      for (const friendEntry of friends.confirmedFriendships) {
        ui.addConfirmedFriendshipEntry(friendEntry);
      }
    }
    if (friends.incomingRequests != null) {
      for (const friendEntry of friends.incomingRequests) {
        ui.addIncomingFriendshipRequestEntry(friendEntry);
      }
    }
  },

  clearFriendshipSearchResult: () => {
    ui.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = null;
    ui.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', ui.state.addFriendButtonHandler);
    ui.state.addFriendButtonHandler = null;
    ui.cloak(ui.elements.overlay.friendsPage.addFriendSection.result.root);
  },

  refreshAccountPage: () => {
    const account = api.getLoggedInAccount();
    if (account == null) {
      ui.elements.overlay.accountPage.id.innerHTML = null;
      ui.elements.overlay.accountPage.username.innerHTML = null;
      ui.elements.overlay.accountPage.publicName.innerHTML = null;
    } else {
      ui.elements.overlay.accountPage.id.innerHTML = account.id;
      ui.elements.overlay.accountPage.username.innerHTML = account.loginName;
      ui.elements.overlay.accountPage.publicName.innerHTML = account.publicName;
    }
  },

  refreshModifyAccountPage: () => {
    const account = api.getLoggedInAccount();
    if (account == null) {
      ui.elements.overlay.modifyAccountPage.usernameInput.value = null;
      ui.elements.overlay.modifyAccountPage.passwordInput.value = null;
      ui.elements.overlay.modifyAccountPage.publicNameInput.value = null;
    } else {
      ui.elements.overlay.modifyAccountPage.usernameInput.value = account.loginName;
      ui.elements.overlay.modifyAccountPage.passwordInput.value = null;
      ui.elements.overlay.modifyAccountPage.publicNameInput.value = account.publicName;
    }
  },

  parseInputAndLogin: async () => {
    const username = ui.elements.content.loginModule.pages.loginPage.usernameInput.value;
    const password = ui.elements.content.loginModule.pages.loginPage.passwordInput.value;
    if (username === '' || password === '') {
      return;
    }
    try {
      await api.login(username, password);
    }
    catch (e) {
      switch (e.message) {
        case '400':
          ui.notify('Failed to login');
          break;
        case '401':
          ui.notify('Invalid credentials');
          break;
      }
      return;
    }
    ui.handleLogin();
  },

  parseInputAndCreateAccount: async () => {
    const username = ui.elements.content.loginModule.pages.createAccountPage.usernameInput.value;
    const password = ui.elements.content.loginModule.pages.createAccountPage.passwordInput.value;
    const publicName = ui.elements.content.loginModule.pages.createAccountPage.publicNameInput.value;
    let account;
    try {
      account = await api.createAccount(username, password, publicName);
    }
    catch (e) {
      switch (e.message) {
        case '400':
          ui.notify('Rules not met');
          break;
        case '409':
          ui.notify('Username already taken');
          break;
      }
      return;
    }
    ui.notify('Successfully created account');
    ui.showLoginPage();
    ui.elements.content.loginModule.pages.loginPage.usernameInput.value = account.loginName;
    ui.elements.content.loginModule.pages.loginPage.passwordInput.value = null;
    ui.elements.content.loginModule.pages.loginPage.passwordInput.focus();
    ui.elements.content.loginModule.pages.createAccountPage.usernameInput.value = null;
    ui.elements.content.loginModule.pages.createAccountPage.passwordInput.value = null;
    ui.elements.content.loginModule.pages.createAccountPage.publicNameInput.value = null;
  },

  parseInputAndShowFriendshipSearchResult: async () => {
    const accountId = parseInt(ui.elements.overlay.friendsPage.addFriendSection.idInput.value);
    if (isNaN(accountId)) {
      return;
    }
    if (accountId === api.getLoggedInAccount().id) {
      ui.notify('Cannot add self as friend');
      return;
    }
    let accounts;
    try {
      accounts = await api.readAccounts(accountId);
    }
    catch (e) {
      ui.notify('Failed to search for user');
      return;
    }
    if (accounts.length == 0) {
      ui.notify('User not found');
      return;
    }
    ui.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = accounts[0].publicName;
    ui.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', ui.state.addFriendButtonHandler);
    ui.state.addFriendButtonHandler = async () => {
      try {
        await api.requestFriendship(accountId);
      }
      catch (e) {
        switch (e.message) {
          case '409':
            ui.notify('User is already a confirmed or requested friend');
            break;
          default:
            ui.notify('Failed to add friend');
            break;
        }
        return;
      }
      ui.cloak(ui.elements.overlay.friendsPage.addFriendSection.result.root);
      ui.elements.overlay.friendsPage.addFriendSection.result.name.innerHTML = null;
      ui.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.removeEventListener('click', ui.state.addFriendButtonHandler);
      ui.state.addFriendButtonHandler = null;
      ui.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
      ui.notify('Friendship request sent');
    };
    ui.elements.overlay.friendsPage.addFriendSection.result.addFriendButton.addEventListener('click', ui.state.addFriendButtonHandler);
    ui.uncloak(ui.elements.overlay.friendsPage.addFriendSection.result.root);
  },

  parseInputAndUpdateAccount: async () => {
    let username = ui.elements.overlay.modifyAccountPage.usernameInput.value;
    username = username.length > 0 ? username : null;
    let password = ui.elements.overlay.modifyAccountPage.passwordInput.value;
    password = password.length > 0 ? password : null;
    let publicName = ui.elements.overlay.modifyAccountPage.publicNameInput.value;
    publicName = publicName.length > 0 ? publicName : null;
    try {
      await api.updateAccount(null, username, password, null, publicName);
    }
    catch (e) {
      switch (e.message) {
        case '400':
          ui.notify('Rules not met');
          break;
        case '401':
          ui.notify('Not authenticated');
          break;
        case '403':
          ui.notify('Not authorized');
          break;
        case '404':
          ui.notify('No such account');
          break;
        case '409':
          ui.notify('Username already taken');
          break;
      }
      return;
    }
    ui.notify('Successfully updated account');
    try {
      await api.logout();
    }
    catch { }
    ui.handleLogout();
  },

  handleLogout: () => {
    ui.hideOverlay();
    ui.hideTopBarButtons();
    ui.showTopBarTitle();
    document.removeEventListener('keydown', ui.handleKeyDownInGame);
    document.removeEventListener('keyup', ui.handleKeyUpInGame);
    ui.showLoginPage();
    ui.showLoginModule();
    ui.elements.content.loginModule.pages.loginPage.usernameInput.focus();
    ui.refreshFriendsList();
    ui.clearFriendshipSearchResult();
    ui.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
    ui.refreshAccountPage();
    ui.refreshModifyAccountPage();
  },

  handleLogin: () => {
    ui.showGameModule();
    ui.hideTopBarTitle();
    ui.showTopBarButtons();
    ui.refreshAccountPage();
    document.addEventListener('keydown', ui.handleKeyDownInGame);
    document.addEventListener('keyup', ui.handleKeyUpInGame);
    ui.elements.content.loginModule.pages.loginPage.usernameInput.value = null;
    ui.elements.content.loginModule.pages.loginPage.passwordInput.value = null;
    ui.elements.content.loginModule.pages.createAccountPage.usernameInput.value = null;
    ui.elements.content.loginModule.pages.createAccountPage.passwordInput.value = null;
    ui.elements.content.loginModule.pages.createAccountPage.publicNameInput.value = null;
  },

  handleFriendshipChange: () => {
    ui.refreshFriendsList();
  },

  handleGameSnapshot: (snapshot) => {
    const clientCharacter = snapshot.characters[snapshot.clientPlayerId];
    if (clientCharacter == null) {
      return;
    }
    const rootHeight = ui.elements.content.gameModule.game.root.offsetHeight;
    const rootWidth = ui.elements.content.gameModule.game.root.offsetWidth;
    const spaceHeight = snapshot.space.height;
    const spaceWidth = snapshot.space.width;
    const scale = 1.2 * Math.max((rootHeight / spaceHeight), (rootWidth / spaceWidth));
    const mapHeight = scale * spaceHeight;
    const mapWidth = scale * spaceWidth;
    ui.elements.content.gameModule.game.map.style.height = mapHeight + 'px';
    ui.elements.content.gameModule.game.map.style.width = mapWidth + 'px';
    // clientCharacter.poxX == 0 -> left = 0
    // clientCharacter.poxX == spaceWidth - clientCharacter.width -> left = rootWidth - mapWidth
    const mapTop = ((rootHeight - mapHeight) / (spaceHeight - clientCharacter.height)) * clientCharacter.posY;
    const mapLeft = ((rootWidth - mapWidth) / (spaceWidth - clientCharacter.width)) * clientCharacter.posX;
    ui.elements.content.gameModule.game.map.style.top = mapTop + 'px';
    ui.elements.content.gameModule.game.map.style.left = mapLeft + 'px';
    ui.elements.content.gameModule.game.map.innerHTML = null;
    for (const character of Object.values(snapshot.characters)) {
      const characterElement = document.createElement('div');
      characterElement.style.position = 'absolute';
      characterElement.style.top = (scale * character.posY) + 'px';
      characterElement.style.left = (scale * character.posX) + 'px';
      characterElement.style.height = (scale * character.height) + 'px';
      characterElement.style.width = (scale * character.width) + 'px';
      characterElement.classList.add('character_element');
      ui.elements.content.gameModule.game.map.appendChild(characterElement);
    }
  },

  sendDirectionalCommand: () => {
    let vertical = 0;
    if (ui.state.keyWPressed && ui.state.keySPressed) {
      if (ui.state.keyWPressTime <= ui.state.keySPressTime) {
        vertical = 1;
      } else {
        vertical = -1;
      }
    } else if (ui.state.keyWPressed) {
      vertical = -1;
    } else if (ui.state.keySPressed) {
      vertical = 1;
    }
    let horizontal = 0;
    if (ui.state.keyAPressed && ui.state.keyDPressed) {
      if (ui.state.keyAPressTime <= ui.state.keyDPressTime) {
        horizontal = 1;
      } else {
        horizontal = -1;
      }
    } else if (ui.state.keyAPressed) {
      horizontal = -1;
    } else if (ui.state.keyDPressed) {
      horizontal = 1;
    }
    let direction = null;
    if (vertical < 0) {
      if (horizontal < 0) {
        direction = 'up_left';
      } else if (horizontal > 0) {
        direction = 'up_right';
      } else {
        direction = 'up';
      }
    } else if (vertical > 0) {
      if (horizontal < 0) {
        direction = 'down_left';
      } else if (horizontal > 0) {
        direction = 'down_right';
      } else {
        direction = 'down';
      }
    } else {
      if (horizontal < 0) {
        direction = 'left';
      } else if (horizontal > 0) {
        direction = 'right';
      }
    }
    api.moveCharacter(direction);
  },

  handleKeyDownInGame: (e) => {
    switch (e.key) {
      case 'w':
        if (!ui.state.keyWPressed) {
          ui.state.keyWPressTime = Date.now();
          ui.state.keyWPressed = true;
        }
        ui.sendDirectionalCommand();
        break;
      case 'a':
        if (!ui.state.keyAPressed) {
          ui.state.keyAPressTime = Date.now();
          ui.state.keyAPressed = true;
        }
        ui.sendDirectionalCommand();
        break;
      case 's':
        if (!ui.state.keySPressed) {
          ui.state.keySPressTime = Date.now();
          ui.state.keySPressed = true;
        }
        ui.sendDirectionalCommand();
        break;
      case 'd':
        if (!ui.state.keyDPressed) {
          ui.state.keyDPressTime = Date.now();
          ui.state.keyDPressed = true;
        }
        ui.sendDirectionalCommand();
        break;
    }
  },

  handleKeyUpInGame: (e) => {
    switch (e.key) {
      case 'w':
        ui.state.keyWPressed = false;
        ui.state.keyWPressTime = null;
        ui.sendDirectionalCommand();
        break;
      case 'a':
        ui.state.keyAPressed = false;
        ui.state.keyAPressTime = null;
        ui.sendDirectionalCommand();
        break;
      case 's':
        ui.state.keySPressed = false;
        ui.state.keySPressTime = null;
        ui.sendDirectionalCommand();
        break;
      case 'd':
        ui.state.keyDPressed = false;
        ui.state.keyDPressTime = null;
        ui.sendDirectionalCommand();
        break;
    }
  }

};

// ------------------------------------------------------------

ui.elements.content.loginModule.tabs.loginTab.addEventListener('click', () => {
  ui.showLoginPage();
  ui.elements.content.loginModule.pages.loginPage.usernameInput.focus();
});
ui.elements.content.loginModule.tabs.createAccountTab.addEventListener('click', () => {
  ui.showCreateAccountPage();
  ui.elements.content.loginModule.pages.createAccountPage.usernameInput.focus();
});
ui.elements.content.loginModule.pages.loginPage.usernameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ui.elements.content.loginModule.pages.loginPage.passwordInput.focus();
  }
});
ui.elements.content.loginModule.pages.loginPage.passwordInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    await ui.parseInputAndLogin();
  }
});
ui.elements.content.loginModule.pages.loginPage.loginButton.addEventListener('click', async () => {
  await ui.parseInputAndLogin();
});
ui.elements.content.loginModule.pages.createAccountPage.usernameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ui.elements.content.loginModule.pages.createAccountPage.passwordInput.focus();
  }
});
ui.elements.content.loginModule.pages.createAccountPage.passwordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ui.elements.content.loginModule.pages.createAccountPage.publicNameInput.focus();
  }
});
ui.elements.content.loginModule.pages.createAccountPage.publicNameInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    await ui.parseInputAndCreateAccount();
  }
});
ui.elements.content.loginModule.pages.createAccountPage.createAccountButton.addEventListener('click', async () => {
  await ui.parseInputAndCreateAccount();
});
ui.elements.topBar.friendsButton.addEventListener('click', () => {
  ui.refreshFriendsList();
  ui.clearFriendshipSearchResult();
  ui.elements.overlay.friendsPage.addFriendSection.idInput.value = null;
  ui.showFriendsPage();
  ui.showOverlay();
});
ui.elements.topBar.accountButton.addEventListener('click', () => {
  ui.showAccountPage();
  ui.showOverlay();
});
ui.elements.topBar.logoutButton.addEventListener('click', async () => {
  try {
    await api.logout();
  }
  catch { }
  ui.handleLogout();
});
ui.elements.overlay.root.addEventListener('click', () => {
  ui.hideOverlay();
});
ui.elements.overlay.window.addEventListener('click', e => {
  e.stopPropagation();
});
ui.elements.overlay.friendsPage.addFriendSection.idInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    await ui.parseInputAndShowFriendshipSearchResult();
  }
});
ui.elements.overlay.friendsPage.addFriendSection.searchButton.addEventListener('click', async () => {
  await ui.parseInputAndShowFriendshipSearchResult();
});
ui.elements.overlay.accountPage.modifyButton.addEventListener('click', () => {
  ui.refreshModifyAccountPage();
  ui.showModifyAccountPage();
  ui.elements.overlay.modifyAccountPage.usernameInput.focus();
});
ui.elements.overlay.modifyAccountPage.usernameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ui.elements.overlay.modifyAccountPage.passwordInput.focus();
  }
});
ui.elements.overlay.modifyAccountPage.passwordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    ui.elements.overlay.modifyAccountPage.publicNameInput.focus();
  }
});
ui.elements.overlay.modifyAccountPage.publicNameInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    await ui.parseInputAndUpdateAccount();
  }
});
ui.elements.overlay.modifyAccountPage.cancelButton.addEventListener('click', () => {
  ui.showAccountPage();
});
ui.elements.overlay.modifyAccountPage.deleteButton.addEventListener('click', async () => {
  try {
    await api.deleteAccount();
  }
  catch {
    ui.notify('Failed to delete account');
    return;
  }
  ui.notify('Successfully deleted account');
  try {
    await api.logout();
  }
  catch { }
  ui.handleLogout();
});
ui.elements.overlay.modifyAccountPage.saveButton.addEventListener('click', async () => {
  await ui.parseInputAndUpdateAccount();
});

// ------------------------------------------------------------

ui.hide(ui.elements.content.loginModule.root);
ui.hide(ui.elements.content.loginModule.pages.loginPage.root);
ui.hide(ui.elements.content.loginModule.pages.createAccountPage.root);
ui.hide(ui.elements.content.gameModule.root);
ui.hide(ui.elements.topBar.friendsButton);
ui.hide(ui.elements.topBar.accountButton);
ui.hide(ui.elements.topBar.logoutButton);
ui.hide(ui.elements.overlay.root);
ui.hide(ui.elements.overlay.friendsPage.root);
ui.cloak(ui.elements.overlay.friendsPage.addFriendSection.result.root);
ui.elements.overlay.friendsPage.incomingFriendshipRequestEntryTemplate.remove();
ui.elements.overlay.friendsPage.confirmedFriendshipEntryTemplate.remove();
ui.elements.overlay.friendsPage.outgoingFriendshipRequestEntryTemplate.remove();
ui.hide(ui.elements.overlay.accountPage.root);
ui.hide(ui.elements.overlay.modifyAccountPage.root);
ui.hide(ui.elements.notification.root);

(async () => {
  await api.initialize(ui.handleFriendshipChange, ui.handleGameSnapshot);
  if (api.getLoggedInAccount() != null) {
    ui.handleLogin();
  } else {
    ui.handleLogout();
  }
  ui.hideBlocker();
})();