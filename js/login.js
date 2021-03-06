/**
 * Backend for a HTML5 MDM theme's login process.
 * Uses a single-step login process with two inputs, one for username and
 * one for password. Provides a username list for easy username selection.
 * 
 * globals: jQuery mdm
 * 
 * @author  Philipp Miller
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * 
 */
(function(mdm, $) {
  
  "use strict";
  
  var $body            = $(document.body)
    , $loginForm       = $("#login")
    , $username        = $("#username", $loginForm)
    , $password        = $("#password", $loginForm)
    , faceImgElem      = $("#face", $loginForm)[0]
    
    , users            = []
    , $userlistToggle  = $("#userlist-toggle", $loginForm)
    , $usersUl         = $("#users", $loginForm)
    , userlistExpanded = false
    , selectedUser
    ;
  
  /// MDM listeners ///
  
  mdm.on("userAdded",      addUser)
     .on("userSelected",   selectUser)
     .one("passwordPrompt", function() { $password.select(); })
     ;
  
  /// DOM listeners ///
  
  // select user by typing in the input field
  $username.on("propertychange input paste", function(evt) {
    selectUser(evt, mdm.getUser(this.value));
  });
  
  $loginForm.submit(login);
  
  /// FUNCTIONS ///
  
  /**
   * Gather data and give it to mdm for login
   * 
   * @param  {event} evt  form submit event
   */
  function login(evt) {
    evt.preventDefault();
    mdm.login($username[0].value, $password[0].value);
    $password.select();
  }
  
  /**
   * Adds a user to the user list, including
   * image load and event listeners
   * @param  {event} evt   optional mdm event
   * @param  {user}  user  user object
   */
  function addUser(evt, user) {
    var $li   = $('<li>')
      , $a    = $('<a>' + user.name + '</a>')
      , $icon = $('<i class="fa fa-user">')
      , img  = new Image()
      ;
    
    $usersUl.append(
      $li.append(
        $a.prepend($icon)
      )
    );
    
    if (user.loggedIn) {
      $li.addClass("loggedIn");
    }
    
    $a.click(function(evt) {
      selectUser(evt, user);
    });
    
    img.loaded = false;
    img.src = user.facefile;
    $(img).one("load", function() {
      $icon.remove();
      $a.prepend(img);
      img.loaded = true;
    });
    
    user.$li = $li;
    user.img = img;
    users.push(user);
    if (users.length === 1) {
      $userlistToggle.one("click", toggleUserlist);
    }
    
    if (!selectedUser) {
      selectedUser = user;
    }
  }
  
  /**
   * Set a user as selected for login
   * by passing a user object
   * 
   * @param  {event} evt  mdm or click event
   * @param  {User}  user
   */
  function selectUser(evt, user) {
    selectedUser.$li.removeClass("selected");
    updateFace(user);
    
    if (!(user && user.$li)) return;
    
    if (!$username.is(evt.target)
      && user.name !== $username[0].value
    ) {
      $username.val(user.name);
    }
    
    if (user.$li) {
      user.$li.addClass("selected");
    }
    
    selectedUser = user;
  }
  
  /**
   * Sets the face image next to the loginForm
   * if the currently selected user has one.
   * The relevant file is
   * /home/{username}/.face
   * 
   * @param  {User} user   user object
   */
  function updateFace(user) {
    $loginForm.removeClass("hasface");
    
    if (!(user && user.img)) return;
    
    if (user.img.loaded) {
      faceImgElem.src = user.img.src;
      $loginForm.addClass("hasface");
    } else {
      $(user.img).one("load", function() {
        if (user == selectedUser)
        faceImgElem.src = user.img.src;
        $loginForm.addClass("hasface");
      });
    }
  }
  
  /**
   * Toggle function for the user selection list.
   * This function recursively listenes to
   * click events either on the toggle anchor (when closed)
   * or on the entire body (when expanded).
   * 
   * @param  {event} evt  click event
   */
  function toggleUserlist(evt) {
    if (userlistExpanded) {
      $body.off("click", toggleUserlist);
      $userlistToggle.one("click", toggleUserlist);
    } else {
      $body.click(toggleUserlist);
      evt.stopPropagation();
    }
    $usersUl.toggleClass("expanded");
    userlistExpanded = !userlistExpanded;
  }
  
})(mdm, jQuery);
