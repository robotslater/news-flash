newsFlashApp.service('AuthService', function(db) {

  var dbPageName = 'users';
  var dbUniqueIdName = 'username';

  var currentUser = db.getDBObj('currentUser')
  console.log(currentUser);

  return {
    getUser: function(user) {
      var queryResult = db.getDBRecord(dbPageName, dbUniqueIdName, user.username);
      var retObj;
      if (queryResult.success) {
        if (queryResult.record.password != user.password) {
          queryResult.success = false;
          queryResult.message = "Incorrect password"
        }
      } else {
        queryResult.message = "Incorrect username"
      }
      return queryResult;
    },
    createUser: function(user) {
      var queryResult = this.getUser(user);
      if (!db.getDBRecord(dbPageName, dbUniqueIdName, user.username).success) {
        var result = db.saveDBRecord(dbPageName, dbUniqueIdName, user);
        currentUser = db.saveDBObj('currentUser',user);
        return {
          success: true,
          message: null
        };
      } else {
        return {
          success: false,
          message: 'Username already exists'
        };
      }
    },
    login: function(user) {
      var queryResult = this.getUser(user);
      if (queryResult.success) {
        currentUser = db.saveDBObj('currentUser',user);
      }
      return queryResult;
    },
    logout: function(user) {
      currentUser = db.saveDBObj('currentUser',{});
    },
    isLoggedIn: function(user) {
      if (user.hasOwnProperty('username')){
        return (user.username == currentUser.username);
      } else {
        return false;
      }
    },
    userIsLoggedIn: function() {
      return (currentUser.hasOwnProperty('username') && currentUser.username.length)
    },
    currentUser: function() {
      return currentUser;
    },
    removeUser: function(user){
      var result = db.getDBRecord(dbPageName, dbUniqueIdName, user.username);
      if(result.success && user.password == result.record.password){
        db.deleteDBRecord(dbPageName, dbUniqueIdName, user.username);
        return {
          sucess:true,
          message: "User successfully deleted"
        }
      } else {
        return {
          sucess:false,
          message: "Error: Username or Password not correct "
        }
      }

    }

  };
});
