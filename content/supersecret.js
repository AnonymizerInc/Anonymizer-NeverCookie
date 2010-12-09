/***********************************************************************

Anonymizer, Inc. Nevercookie™ License

1) Grant of Copyright License.  Anonymizer, Inc. (“Licensor”) grants You a worldwide, royalty-free, non-exclusive, sublicensable license, for the duration of the copyright, to do the following:
   a) to reproduce the Original Work in copies, either alone or as part of a collective work;
   b) to translate, adapt, alter, transform, modify, or arrange the Original Work, thereby creating derivative works ("Derivative Works") based upon the Original Work;
   c) to distribute or communicate copies of the Original Work and Derivative Works to the public, under any license of your choice that does not contradict the terms and conditions, including Licensor's reserved rights and remedies, in this License;
   d) to perform the Original Work publicly; and
   e) to display the Original Work publicly.
2) Grant of Patent License. Licensor grants You a worldwide, royalty-free, non-exclusive, sublicensable license, under patent claims owned or controlled by the Licensor that are embodied in the Original Work as furnished by the Licensor, for the duration of the patents, to make, use, sell, offer for sale, have made, and import the Original Work and Derivative Works.
3) Grant of Source Code License. The term "Source Code" means the preferred form of the Original Work for making modifications to it and all available documentation describing how to modify the Original Work. Licensor agrees to provide a machine-readable copy of the Source Code of the Original Work along with each copy of the Original Work that Licensor distributes. Licensor reserves the right to satisfy this obligation by placing a machine-readable copy of the Source Code in an information repository reasonably calculated to permit inexpensive and convenient access by You for as long as Licensor continues to distribute the Original Work.
4) Exclusions From License Grant. Neither the names of Licensor, nor the names of any contributors to the Original Work, nor any of their trademarks or service marks, may be used to endorse or promote products derived from this Original Work without express prior permission of the Licensor. Except as expressly stated herein, nothing in this License grants any license to Licensor's trademarks, copyrights, patents, trade secrets or any other intellectual property. No patent license is granted to make, use, sell, offer for sale, have made, or import embodiments of any patent claims other than the licensed claims defined in Section 2. No license is granted to the trademarks of Licensor even if such marks are included in the Original Work. Nothing in this License shall be interpreted to prohibit Licensor from licensing under terms different from this License any Original Work that Licensor otherwise would have a right to license.
5) External Deployment. The term "External Deployment" means the use, distribution, or communication of the Original Work or Derivative Works in any way such that the Original Work or Derivative Works may be used by anyone other than You, whether those works are distributed or communicated to those persons or made available as an application intended for use over a network. As an express condition for the grants of license hereunder, You must treat any External Deployment by You of the Original Work or a Derivative Work as a distribution under section 1(c).
6) Attribution Rights. You must retain, in the Source Code of any Derivative Works that You create, all copyright, patent, or trademark notices from the Source Code of the Original Work, as well as any notices of licensing and any descriptive text identified therein as an "Attribution Notice." You must cause the Source Code for any Derivative Works that You create to carry a prominent Attribution Notice reasonably calculated to inform recipients that You have modified the Original Work.
7) Disclaimer of Warranty. THE ORIGINAL WORK IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. This DISCLAIMER OF WARRANTY constitutes an essential part of this License. No license to the Original Work is granted by this License except under this disclaimer.
8) Limitation of Liability. Under no circumstances and under no legal theory, whether in tort (including negligence), contract, or otherwise, shall the Licensor be liable to anyone for any indirect, special, incidental, or consequential damages of any character arising as a result of this License or the use of the Original Work including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses. This limitation of liability shall not apply to the extent applicable law prohibits such limitation.
9) Acceptance and Termination. If, at any time, You expressly assented to this License, that assent indicates your clear and irrevocable acceptance of this License and all of its terms and conditions. If You distribute or communicate copies of the Original Work or a Derivative Work, You must make a reasonable effort under the circumstances to obtain the express assent of recipients to the terms of this License. This License conditions your rights to undertake the activities listed in Section 1, including your right to create Derivative Works based upon the Original Work, and doing so without honoring these terms and conditions is prohibited by copyright law and international treaty. Nothing in this License is intended to affect copyright exceptions and limitations (including "fair use" or "fair dealing"). This License shall terminate immediately and You may no longer exercise any of the rights granted to You by this License upon your failure to honor the conditions in Section 1(c).
10) Termination for Patent Action. This License shall terminate automatically and You may no longer exercise any of the rights granted to You by this License as of the date You commence an action, including a cross-claim or counterclaim, against Licensor or any licensee alleging that the Original Work infringes a patent. This termination provision shall not apply for an action alleging patent infringement by combinations of the Original Work with other software or hardware.
11) Jurisdiction, Venue and Governing Law. Any action or suit relating to this License may be brought only in the courts of a jurisdiction wherein the Licensor resides or in which Licensor conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions. The application of the United Nations Convention on Contracts for the International Sale of Goods is expressly excluded. Any use of the Original Work outside the scope of this License or after its termination shall be subject to the requirements and penalties of copyright or patent law in the appropriate jurisdiction. This section shall survive the termination of this License.
12) Attorneys' Fees. In any action to enforce the terms of this License or seeking damages relating thereto, the prevailing party shall be entitled to recover its costs and expenses, including, without limitation, reasonable attorneys' fees and costs incurred in connection with such action, including any appeal of such action. This section shall survive the termination of this License.
13) Miscellaneous. If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.
14) Definition of "You" in This License. "You" throughout this License, whether in upper or lower case, means an individual or a legal entity exercising rights under, and complying with all of the terms of, this License. For legal entities, "You" includes any entity that controls, is controlled by, or is under common control with you. For purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
15) Right to Use. You may use the Original Work in all ways not otherwise restricted or conditioned by this License or by law, and Licensor promises not to interfere with or be responsible for such uses by You.


**********************************************************************/
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
