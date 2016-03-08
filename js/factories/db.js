newsFlashApp.factory('db', function() {
  return {
    getDBRecord: function(pageName, uniqueIdName, id) {
      var page = this.getDBPage(pageName);
      var retObj = {
        success: false,
        record: {}
      };
      for (i = 0; i < page.length; i++) {
        if (page[i][uniqueIdName] == id) {
          retObj.success = true;
          retObj.record = page[i];
        }
      }
      return retObj;
    },
    getDBPage: function(pageName) {
      var localStorageVal = localStorage.getItem(pageName);
      if (localStorageVal == null || typeof(localStorageVal) == "undefined") {
        localStorage.setItem(pageName, JSON.stringify([]));
        return [];
      }
      return JSON.parse(localStorageVal);
    },
    getDBObj: function(objName) {
      var localStorageVal = localStorage.getItem(objName);
      if (localStorageVal == null || typeof(localStorageVal) == "undefined") {
        localStorage.setItem(objName, JSON.stringify({}));
        return {};
      }
      return JSON.parse(localStorageVal);
    },
    saveDBObj: function(objName, obj) {
      localStorage.setItem(objName, JSON.stringify(obj));
      return obj;
    },
    saveDBRecord: function(pageName, uniqueIdName, record) {
      var page = this.getDBPage(pageName);
      var newId = 1;

      if (page.length > 0) {
        for (i = 0; i < page.length; i++) {
          var idNum = parseInt(page[i][uniqueIdName]) || 0;
          if (idNum >= newId) {
            newId = idNum + 1;
          }
          if (page[i][uniqueIdName] == record[uniqueIdName]) {
            page[i] = record;
            localStorage.setItem(pageName, JSON.stringify(page));
            return record[uniqueIdName];
          }
        }
      }
      if (!record.hasOwnProperty(uniqueIdName)) {
        record[uniqueIdName] = newId;
      }
      page.push(record);
      localStorage.setItem(pageName, JSON.stringify(page));
      return String(newId);
    },
    deleteDBRecord: function(pageName, uniqueIdName, id) {
      var page = this.getDBPage(pageName);
      var retVal = false;
      for (i = 0; i < page.length; i++) {
        if (page[i][uniqueIdName] == id) {
          page.splice(i, 1);
          localStorage.setItem(pageName, JSON.stringify(page));
          retVal = true;
        }
      }
      return retVal;
    },
    getDBPageFilteredByTags: function(pageName, tags) {
      var page = this.getDBPage(pageName);
      for (i = 0; i < page.length; i++) {
        for (t = 0; t < tags.length; t++) {
          if (page[i].tags.indexOf(tags[t]) == -1) {
            page.splice(i, 1);
          }
        }
      }
      return page;
    },
    filterFacts: function(facts, factSearch) {
      //factSearch.opperator = 'and';
      if (factSearch.tags.length <= 0) {
        return facts;
      } else {
        var result = [];
        for (i = 0; i < facts.length; i++) {
          var matchAll = false;
          for (t = 0; t < factSearch.tags.length; t++) {
            if (facts[i].tags.indexOf(factSearch.tags[t]) > -1) {
              if (factSearch.opperator == 'or') {
                result.push(facts[i]);
                break;
              } else {
                matchAll = true;
              }
            } else {
              matchAll = false;
            }
          }
          if (matchAll) {
            result.push(facts[i]);
          }
        }
        return result;
      }
    }
  }
});
