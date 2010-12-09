var superSecretProg = {
	prefs: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.supersecret."),
	inPrivateBrowsingMode: false,
	didQuarantineOps: false,
	tempProfileDir: "",
	myID: "supersecret187@nyms.net",
	
  onLoad: function() {
  	//initialization code
    this.initialized = true;
    
    if(!superSecretSettingsProg.prefs.prefHasUserValue("quarantineLSOFiles")) {
    	superSecretSettingsProg.prefs.setBoolPref("quarantineLSOFiles", true);
    }
    
    if(!superSecretSettingsProg.prefs.prefHasUserValue("quarantineMISFiles")) {
    	superSecretSettingsProg.prefs.setBoolPref("quarantineMISFiles", true);
    }
    
    //load the observers
    superSecretProg.register();
        
    var myTempDirString = superSecretProg.randomString();
    myTempDirString += "hat";
    
    
    var oldTempDirString = "";
    if(superSecretSettingsProg.prefs.prefHasUserValue("supersecretTempProfile")) {
    	oldTempDirString = superSecretSettingsProg.prefs.getCharPref("supersecretTempProfile");
    	var myOldPath = superSecretProg.getTempProfilePath(oldTempDirString);
    	superSecretProg.deleteFile(myOldPath);
    }
    
    superSecretSettingsProg.prefs.setCharPref("supersecretTempProfile", myTempDirString);
    superSecretProg.tempProfileDir = myTempDirString;
   
    //now spawn the temp profile
    superSecretSettingsProg.spawnTempProfile(myTempDirString);
  },
  
  observe: function(subject, topic, data)
  {
  	if (topic == "private-browsing") {
  		if (data == "enter") {
  			//debug
  			//alert("entering private mode");
  			
  			superSecretProg.inPrivateBrowsingMode = true;
  			
  			superSecretProg.doQuarantineOps();
  		} else if (data == "exit") {
  			//debug
  		  //alert("leaving private mode");
  		  
  		  superSecretProg.inPrivateBrowsingMode = false;
  		  
  		  //do LSO restore and associated tasks here
  		  if(superSecretProg.didQuarantineOps)
  		  {
  		    superSecretProg.doRecoveryOps();
  		    superSecretProg.didQuarantineOps = false;
  		  }
  		}
  	}
  	if (topic == "quit-application-granted") {
  		//if still in private mode, restore LSOs
  		if(superSecretProg.inPrivateBrowsingMode)
  		{
  			if(superSecretProg.didQuarantineOps)
  			{
  			  superSecretProg.doRecoveryOps();
  			}
  		}
  		
  		// Saves preferences to default loc (prefs.js, in profile root)
  	  var prefService = Components.classes["@mozilla.org/preferences-service;1"]
                               .getService(Components.interfaces.nsIPrefService);
      prefService.savePrefFile(null);
      // end pref save
  		
  		//remove observers before shutdown completes
  		superSecretProg.unregister();
  	}
  },
  
  get observerService() {
  	return Components.classes["@mozilla.org/observer-service;1"]
                     .getService(Components.interfaces.nsIObserverService);
  },
  
  register: function()
  {
    this.observerService.addObserver(this, "private-browsing", false);
    this.observerService.addObserver(this, "quit-application-granted", false);
  },

  unregister: function()
  {
    this.observerService.removeObserver(this, "private-browsing");
    this.observerService.removeObserver(this, "quit-application-granted");
  },
  
  randomString: function() {
  	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 12;
    var randomstring = "";
    
    for (var i=0; i<string_length; i++) {
    	var rnum = Math.floor(Math.random() * chars.length);
    	randomstring += chars.substring(rnum,rnum+1);
    }
    
    return randomstring;
  },
  
  deleteFile: function(targetfile)
  {
  	var aFile = Components.classes["@mozilla.org/file/local;1"].createInstance();
    if (aFile instanceof Components.interfaces.nsILocalFile)
    {
      aFile.initWithPath(targetfile);
      //recursive=true
      if(aFile.exists())
      {
        aFile.remove(true);
      }
    }
  },
  
  getTempProfilePath: function(mydir)
  {
  	var thisOS = superSecretProg.getOperatingSystem();
  	var myPath = "";
  	if( thisOS == "win" )
  	{
  		myPath = "C:\\Users\\Public\\";
  		myPath += mydir;
  	}
  	else
  	{
  		myPath = "/tmp/";
  		myPath += mydir;
  	}
  	return myPath;
  },
  
  getCurrentProfilePath: function()
  {
    var id = superSecretProg.myID;
  	var extension = Components.classes["@mozilla.org/extensions/manager;1"].getService(Components.interfaces.nsIExtensionManager).getInstallLocation(id).getItemLocation(id);
    extension.append("userChrome.css");

    return extension.path;
  },
  
  //sourcefile: full path of file, destdir: full path of dest dir
  copyFile: function(sourcefile, destdir)
  {
  	//get a component for the file to move
    var aFile = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
    if (!aFile) return false;

    //get a component for the directory to move to
    var aDir = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
    if (!aDir) return false;

    //next, assign URLs to the file components
    aFile.initWithPath(sourcefile);
    aDir.initWithPath(destdir);
    
    //finally, move the file
    //if second arg is null, will not rename
    aFile.copyTo(aDir, "");
  },  
  
  //sourcefile: full path of file, destdir: full path of dest dir, newname: new file name ("" for none)
  moveFile: function(sourcefile, destdir, newname)
  {
  	//get a component for the file to move
    var aFile = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
    if (!aFile) return false;

    //get a component for the directory to move to
    var aDir = Components.classes["@mozilla.org/file/local;1"]
      .createInstance(Components.interfaces.nsILocalFile);
    if (!aDir) return false;

    //next, assign URLs to the file components
    aFile.initWithPath(sourcefile);
    aDir.initWithPath(destdir);
    
    //finally, move the file
    //if second arg is null, will not rename
    aFile.moveTo(aDir, newname);
  },
  
  getOperatingSystem: function()
  {
  	//get the application info
	  var appInfo = Components.classes["@mozilla.org/xre/app-info;1"]
                     .getService(Components.interfaces.nsIXULAppInfo)
                     .QueryInterface(Components.interfaces.nsIXULRuntime);
                     
    //return the host OS
    if(appInfo.OS == "Darwin") { return "mac"; }
    if(appInfo.OS == "WINNT")  { return "win"; }
    if(appInfo.OS == "Linux")  { return "linux"; }
    return appInfo.OS;
  },
  
  //find where LSOs are stored on the local FS
  findLSOStore: function(operation)
  {
  	//get the host OS
  	var myOS = superSecretProg.getOperatingSystem();
  	
  	//get the directory service component
  	var dirService = Components.classes["@mozilla.org/file/directory_service;1"].  
                     getService(Components.interfaces.nsIProperties);
                     
    //path to LSO home
    var homeDirFile;
    
    if(myOS == "mac")
    {
      homeDirFile = dirService.get("UsrPrfs", Components.interfaces.nsIFile); // returns an nsIFile object  
      homeDirFile.append("Macromedia");
      if(operation == "quarantine") { homeDirFile.append("Flash Player"); }
      if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    }
    else if(myOS == "win")
    {
    	homeDirFile = dirService.get("AppData", Components.interfaces.nsIFile); // returns an nsIFile object
    	//there are two possible known locations for LSOs on Windoze
    	homeDirFile.append("Roaming");
    	homeDirFile.append("Macromedia");
    	if(operation == "quarantine") { homeDirFile.append("Flash Player"); }
    	if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    	else
    	{
    		homeDirFile = dirService.get("AppData", Components.interfaces.nsIFile); // returns an nsIFile object
    		homeDirFile.append("Macromedia");
    		if(operation == "quarantine") { homeDirFile.append("Flash Player"); }
    		if(homeDirFile.exists() && homeDirFile.isDirectory())
    		{
    			return homeDirFile;
    		}
    	}
    }
    else if(myOS == "linux")
    {
    	homeDirFile = dirService.get("Home", Components.interfaces.nsIFile); // returns an nsIFile object
    	homeDirFile.append(".macromedia");
    	if(operation == "quarantine") { homeDirFile.append("Flash_Player"); }
    	if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    }
    
    //unable to determine LSO location
    //only want to alert if we can't find the original location!
    if(superSecretProg.inPrivateBrowsingMode)
    {
  	  //alert("Anonymous Web was unable to locate your LSO store!");
    }
  	return null;
  },
  
  findSomeLocs: function()
  {
  	//get the host OS
  	var myOS = superSecretProg.getOperatingSystem();
  	
  	//get the directory service component
  	var dirService = Components.classes["@mozilla.org/file/directory_service;1"].  
                     getService(Components.interfaces.nsIProperties);
                     
    //path to MIS home
    var homeDirFile;
    
    if(myOS == "mac")
    {
      homeDirFile = dirService.get("ULibDir", Components.interfaces.nsIFile); // returns an nsIFile object
      homeDirFile.append("Application Support");
      homeDirFile.append("Microsoft");
      homeDirFile.append("Silverlight");
    }
  },
  
  //find where MISs are stored on the local FS
  findMISStore: function(operation)
  {
  	//get the host OS
  	var myOS = superSecretProg.getOperatingSystem();
  	
  	//get the directory service component
  	var dirService = Components.classes["@mozilla.org/file/directory_service;1"].  
                     getService(Components.interfaces.nsIProperties);
                     
    //path to MIS home
    var homeDirFile;
    
    if(myOS == "mac")
    {
      homeDirFile = dirService.get("ULibDir", Components.interfaces.nsIFile); // returns an nsIFile object
      homeDirFile.append("Application Support");
      homeDirFile.append("Microsoft");
      homeDirFile.append("Silverlight");
      if(operation == "quarantine") { homeDirFile.append("is"); }
      if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    }
    else if(myOS == "win")
    {
    	homeDirFile = dirService.get("Home", Components.interfaces.nsIFile); // returns an nsIFile object
    	//there are several possible known locations for LSOs on Windoze
    	homeDirFile.append("AppData");
    	homeDirFile.append("LocalLow");
    	homeDirFile.append("Microsoft");
    	homeDirFile.append("Silverlight");
    	if(operation == "quarantine") { homeDirFile.append("is"); }
    	if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    	else
    	{
    		//not sure if there are other locations, will finish this later
    		//if the above code block doesn't work for you try checking under
    		// ...Users\YourUserName\AppData\somedir\Microsoft\Silverlight and let me
    		// know how it looks on your system (no documentation, yay)
    		homeDirFile = dirService.get("Home", Components.interfaces.nsIFile); // returns an nsIFile object
    		//might need to use Home instead of AppData as above...
    		//homeDirFile.append("...");
    		homeDirFile.append("AppData");
    	  homeDirFile.append("Roaming");
    	  homeDirFile.append("Microsoft");
    	  homeDirFile.append("Silverlight");
    		if(operation == "quarantine") { homeDirFile.append("is"); }
    		if(homeDirFile.exists() && homeDirFile.isDirectory())
    		{
    			return homeDirFile;
    		}
    		else
    		{
    			homeDirFile = dirService.get("LocalAppData", Components.interfaces.nsIFile); // returns an nsIFile object
    			homeDirFile.append("Microsoft");
    	    homeDirFile.append("Silverlight");
    		  if(operation == "quarantine") { homeDirFile.append("is"); }
    		  if(homeDirFile.exists() && homeDirFile.isDirectory())
    		  {
    			  return homeDirFile;
    			}
    		}
    	}
    }
    else if(myOS == "linux")
    {
    	//NOT CURRENTLY SUPPORTING LINUX for Silverlight
    	homeDirFile = dirService.get("Home", Components.interfaces.nsIFile); // returns an nsIFile object
    	//homeDirFile.append(".microsoft");
    	/*
    	if(operation == "quarantine") { homeDirFile.append("is"); }
    	if(homeDirFile.exists() && homeDirFile.isDirectory())
    	{
    		return homeDirFile;
    	}
    	*/
    	return null;
    }
    
    //unable to determine MIS location
    //only want to alert if we can't find the original location!
    if(superSecretProg.inPrivateBrowsingMode)
    {
  	  //alert("Anonymous Web was unable to locate your MIS store!");
    }
  	return null;
  },
  
  quarantineLSOStore: function()
  {
  	//LSO directory to move
  	var myLSOStore = superSecretProg.findLSOStore("quarantine");
  	
  	//get the root path to LSO store
  	var myLSOStoreRoot = superSecretProg.findLSOStore("root");
  	
  	if(myLSOStore) {
  	  superSecretProg.moveFile(myLSOStore.path, myLSOStoreRoot.path, "hat");
  	}
  },
  
  quarantineMISStore: function()
  {
  	//MIS directory to move
  	var myMISStore = superSecretProg.findMISStore("quarantine");
  	
  	//get the root path to MIS store
  	var myMISStoreRoot = superSecretProg.findMISStore("root");
  	
  	if(myMISStore) {
  	  superSecretProg.moveFile(myMISStore.path, myMISStoreRoot.path, "hat");
  	}
  },
  
  recoverLSOStore: function()
  {
  	//LSO quarantine directory for recovery
  	var myLSOStore = superSecretProg.findLSOStore("root");
  	myLSOStore.append("hat");
  	
  	//first make sure the destination path is clean
  	var myLSOStoreGarbage = superSecretProg.findLSOStore("quarantine");
  	//have to determine OS here cause the other routine checks for file
  	//existence, haw, then append
  	if(myLSOStoreGarbage)
  	{
  	  superSecretProg.deleteFile(myLSOStoreGarbage.path);
  	}
  	
  	var myOS = superSecretProg.getOperatingSystem();
  	var myNewDirName;
  	if(myOS == "linux") {
  		myNewDirName = "Flash_Player";
  	}
  	else
  	{
  		myNewDirName = "Flash Player";
  	}
  	
  	var myLSOStoreRoot;
  	if(myLSOStore)
  	{
  		myLSOStoreRoot = superSecretProg.findLSOStore("root");
  		superSecretProg.moveFile(myLSOStore.path, myLSOStoreRoot.path, myNewDirName);
  	}
  },
  
  recoverMISStore: function()
  {
  	//MIS quarantine directory for recovery
  	var myMISStore = superSecretProg.findMISStore("root");
  	myMISStore.append("hat");
  	
  	//first make sure the destination path is clean
  	var myMISStoreGarbage = superSecretProg.findMISStore("quarantine");
  	//hurrr
  	if(myMISStoreGarbage)
  	{
  	  superSecretProg.deleteFile(myMISStoreGarbage.path);
  	}
  	
  	var myOS = superSecretProg.getOperatingSystem();
  	var myNewDirName;
  	if(myOS == "linux") {
  		//should never do anything for linux, no supported Silverlight, but.. third party thingy
  		myNewDirName = "is";
  	}
  	else
  	{
  		myNewDirName = "is";
  	}
  	
  	var myMISStoreRoot;
  	if(myMISStore)
  	{
  		myMISStoreRoot = superSecretProg.findMISStore("root");
  		superSecretProg.moveFile(myMISStore.path, myMISStoreRoot.path, myNewDirName);
  	}
  },
  
  doQuarantineOps: function()
  {
  	var doLSOQuarantine = superSecretProg.prefs.getBoolPref("quarantineLSOFiles");
  	var doMISQuarantine = superSecretProg.prefs.getBoolPref("quarantineMISFiles");
  	
  	if(doLSOQuarantine)
  	{
  		superSecretProg.quarantineLSOStore();
  		superSecretProg.didQuarantineOps = true;
  	}
  	
  	if(doMISQuarantine)
  	{
  		var myOS = superSecretProg.getOperatingSystem();
  	  if(myOS != "linux") {
  		  //do the MIS stuff
  		  superSecretProg.quarantineMISStore();
  		  superSecretProg.didQuarantineOps = true;
  	  }
  	}
  	//after private browsing initiated and quarantine, load private window
  	superSecretSettingsProg.loadSecretWindow();
  },
  
  doRecoveryOps: function()
  {
  	var doLSOQuarantine = superSecretProg.prefs.getBoolPref("quarantineLSOFiles");
  	var doMISQuarantine = superSecretProg.prefs.getBoolPref("quarantineMISFiles");
  	
  	if(doLSOQuarantine)
  	{
  		superSecretProg.recoverLSOStore();
  	}
  	
  	if(doMISQuarantine)
  	{
  		var myOS = superSecretProg.getOperatingSystem();
  	  if(myOS != "linux") {
  		  //do the MIS stuff
  		  superSecretProg.recoverMISStore();
  	  }
  	}
  },
};

window.addEventListener("load", function(e) { superSecretProg.onLoad(e); }, false);
