var superSecretSettingsProg = {
  prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.supersecret."),
  
  loadWindow: function() {
    window.open("chrome://supersecret/content/supersecretSettingsOverlay.xul", "sssettings", "chrome,width=650,height=350");
  },
  
  doSecretTasks: function() {
  	superSecretSettingsProg.loadSecretWindow();
  },
  
  loadSecretWindow: function() {
  	//alert
  	alert("For maximum privacy, use the new blue marked browser window. Close the window when finished browsing privately and exit private browsing mode in the parent Firefox window"); 
  	
    // grab installation path
	  var dirService = Components.classes["@mozilla.org/file/directory_service;1"]
  									 .getService(Components.interfaces.nsIProperties);   
  
    // CurProcD should always be the install location (binary should be in there)
    var installDirFile = dirService.get("CurProcD", Components.interfaces.nsIFile); // returns an nsIFile object  
  
	  // get the application info
	  var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
                     .getService(Components.interfaces.nsIXULAppInfo)
                     .QueryInterface(Components.interfaces.nsIXULRuntime);
  
    // create an nsILocalFile for the executable
    var file = Components.classes["@mozilla.org/file/local;1"]
                     .createInstance(Components.interfaces.nsILocalFile);
                     
    var myOS = superSecretProg.getOperatingSystem();
    
    if(myOS == "win") {
  	  installDirFile.append("firefox.exe");
    }
    else if(myOS == "mac") {
  	  installDirFile.append("firefox-bin");
    }
    else {
    	installDirFile.append("firefox");
    }
    
    // Extract the actual path from the file object
    var installPath = installDirFile.path;
  
    file.initWithPath(installPath);

    // create an nsIProcess
    var process = Components.classes["@mozilla.org/process/util;1"]
                        .createInstance(Components.interfaces.nsIProcess);
    process.init(file);

    // Run the process.
    // If first param is true, calling thread will be blocked until
    // called process terminates.
    // Second and third params are used to pass command-line arguments
    // to the process.
    //var args = ["-private", "-no-remote", "-P", "hat"];
    //var args = ["-no-remote", "-P", "hat"];
    var args = ["-no-remote", "-P", superSecretProg.tempProfileDir];
    process.run(false, args, args.length);
    
  },
  
  spawnTempProfile: function(dirname) {
  	// grab installation path
	  var dirService = Components.classes["@mozilla.org/file/directory_service;1"]
  									 .getService(Components.interfaces.nsIProperties);   
  
    // CurProcD should always be the install location (binary should be in there)
    var installDirFile = dirService.get("CurProcD", Components.interfaces.nsIFile); // returns an nsIFile object  
  
	  // get the application info
	  var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
                     .getService(Components.interfaces.nsIXULAppInfo)
                     .QueryInterface(Components.interfaces.nsIXULRuntime);
  
    // create an nsILocalFile for the executable
    var file = Components.classes["@mozilla.org/file/local;1"]
                     .createInstance(Components.interfaces.nsILocalFile);
                     
    var myOS = superSecretProg.getOperatingSystem();
    
    if(myOS == "win") {
  	  installDirFile.append("firefox.exe");
    }
    else if(myOS == "mac") {
  	  installDirFile.append("firefox-bin");
    }
    else {
    	installDirFile.append("firefox");
    }
    
    // Extract the actual path from the file object
    var installPath = installDirFile.path;
  
    file.initWithPath(installPath);

    // create an nsIProcess
    var process = Components.classes["@mozilla.org/process/util;1"]
                        .createInstance(Components.interfaces.nsIProcess);
    process.init(file);

    // Run the process.
    // If first param is true, calling thread will be blocked until
    // called process terminates.
    // Second and third params are used to pass command-line arguments
    // to the process.
    var pathToTempProfile = superSecretProg.getTempProfilePath(dirname);
    var argProfile = dirname + " " + pathToTempProfile;
    
    var args = ["-no-remote", "-CreateProfile", argProfile];
    process.run(false, args, args.length);
    
    //copy over the css
    if(myOS == "win") {
    	pathToTempProfile += "\\chrome";
    }
    else {
    	pathToTempProfile += "/chrome";
    }
    var cssPath = superSecretProg.getCurrentProfilePath();
    superSecretProg.copyFile(cssPath, pathToTempProfile);
  },
  
  loadSettings: function() {
  	var quarantineLSOCheckBox = document.getElementById("quarantineLSOCheckBox");
  	var myLSOCheckedStatus = superSecretSettingsProg.prefs.getBoolPref("quarantineLSOFiles");
  	quarantineLSOCheckBox.setAttribute("checked",myLSOCheckedStatus);
  	
  	var quarantineMISCheckBox = document.getElementById("quarantineMISCheckBox");
  	var myMISCheckedStatus = superSecretSettingsProg.prefs.getBoolPref("quarantineMISFiles");
  	quarantineMISCheckBox.setAttribute("checked",myMISCheckedStatus);
  },
  
  doStuffLSO: function(isChecked) {
  	superSecretSettingsProg.prefs.setBoolPref("quarantineLSOFiles", isChecked);
  },
  
  doStuffMIS: function(isChecked) {
  	superSecretSettingsProg.prefs.setBoolPref("quarantineMISFiles", isChecked);
  },
};
