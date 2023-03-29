import Web3 from "web3";
import requestServiceArtifact from "../../build/contracts/RequestService.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = requestServiceArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(requestServiceArtifact.abi,deployedNetwork.address);

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
//functions for three parties in various sub-page
	runDS: function() {
		if(document.getElementById("ds").style.display="none") {
			document.getElementById("ds").style.display="block";
		}
		else if (document.getElementById("ds").style.display="block"){
			document.getElementById("ds").style.display="none";
		}
		else {
			document.getElementById("ds").style.display="none";
		}
		document.getElementById("rp").style.display="none";
        document.getElementById("ap").style.display="none";
	},

	runRP: function() {
		if(document.getElementById("rp").style.display="none") {
			document.getElementById("rp").style.display="block";
		}
		else if (document.getElementById("rp").style.display="block"){
			document.getElementById("rp").style.display="none";
		}
		else {
			document.getElementById("rp").style.display="none";
		}
		document.getElementById("ds").style.display="none";
        document.getElementById("ap").style.display="none";
	},

	runAP: function(){
        if(document.getElementById("ap").style.display="none") {
            document.getElementById("ap").style.display="block";
        }
        else if (document.getElementById("ap").style.display="block"){
            document.getElementById("ap").style.display="none";
        }
        else {
            document.getElementById("ap").style.display="none";
        }
        document.getElementById("ds").style.display="none";
        document.getElementById("rp").style.display="none";
	},

//functions for operation sub-pages
	runRequest: function(){
		if(document.getElementById("sRequest").style.display="none") {
			document.getElementById("sRequest").style.display="block";
		} 
		else if (document.getElementById("sRequest").style.display="block"){
				document.getElementById("sRequest").style.display="none";
		}
		else {
			document.getElementById("sRequest").style.display="none";
		}
		document.getElementById("ds").style.display="none";
        document.getElementById("ap").style.display="none";
        document.getElementById("gPT").style.display="none";
		document.getElementById("sRqPToken").style.display="none";
        document.getElementById("gAPToken").style.display="none";
	},

	showRequest: function(){
		if(document.getElementById("gRequest").style.display="none") {
			document.getElementById("gRequest").style.display="block";
		}
		else if (document.getElementById("gRequest").style.display="block"){
			document.getElementById("gRequest").style.display="none";
		}
		else {
			document.getElementById("gRequest").style.display="none";
		}
		document.getElementById("rp").style.display="none";
        document.getElementById("ap").style.display="none";
	},

	showPT: function(){
        if(document.getElementById("gPT").style.display="none") {
            document.getElementById("gPT").style.display="block";
        }
        else if (document.getElementById("gPT").style.display="block"){
            document.getElementById("gPT").style.display="none";
        }
        else {
            document.getElementById("gPT").style.display="none";
        }
        document.getElementById("ds").style.display="none";
        document.getElementById("ap").style.display="none";
        document.getElementById("sRqPToken").style.display="none";
        document.getElementById("gAPToken").style.display="none";
        document.getElementById("sRequest").style.display="none";
	},

    runRqPToken: function(){
        if(document.getElementById("sRqPToken").style.display="none") {
            document.getElementById("sRqPToken").style.display="block";
        }
        else if (document.getElementById("sRqPToken").style.display="block"){
            document.getElementById("sRqPToken").style.display="none";
        }
        else {
            document.getElementById("sRqPToken").style.display="none";
        }
        document.getElementById("ds").style.display="none";
        document.getElementById("ap").style.display="none";
        document.getElementById("gPT").style.display="none";
        document.getElementById("gAPToken").style.display="none";
        document.getElementById("sRequest").style.display="none";
	},

    showRqPToken: function(){
        if(document.getElementById("gRqPToken").style.display="none") {
            document.getElementById("gRqPToken").style.display="block";
        }
        else if (document.getElementById("gRqPToken").style.display="block"){
            document.getElementById("gRqPToken").style.display="none";
        }
        else {
            document.getElementById("gRqPToken").style.display="none";
        }
        document.getElementById("rp").style.display="none";
        document.getElementById("ds").style.display="none";
        document.getElementById("sAPToken").style.display="none";
	},

    runAPToken: function(){
		if(document.getElementById("sAPToken").style.display="none") {
			document.getElementById("sAPToken").style.display="block";
		} 
		else if (document.getElementById("sAPToken").style.display="block"){
				document.getElementById("sAPToken").style.display="none";
		}
		else {
			document.getElementById("sAPToken").style.display="none";
		}
		document.getElementById("rp").style.display="none";
        document.getElementById("ds").style.display="none";
        document.getElementById("gRqPToken").style.display="none";
	},
	
	showAPToken: function(){
		if(document.getElementById("gAPToken").style.display="none") {
			document.getElementById("gAPToken").style.display="block";
		} 
		else if (document.getElementById("gAPToken").style.display="block"){
				document.getElementById("gAPToken").style.display="none";
		}
		else {
			document.getElementById("gAPToken").style.display="none";
		}
		document.getElementById("ds").style.display="none";
        document.getElementById("ap").style.display="none";
        document.getElementById("gPT").style.display="none";
        document.getElementById("sRqPToken").style.display="none";
		document.getElementById("sRequest").style.display="none";
	},
//functions for data process
	sendRequest: async function() {
  		this.refreshShow();
  		const dataSubject = document.getElementById("dataSubject").value;
  		const purpose = document.getElementById("purpose").value;
  		const dateFrom = document.getElementById("dateFrom").value;
  		const dateTo = document.getElementById("dateTo").value;
		const notes = document.getElementById("notes").value;
		const requestingParty = document.getElementById("requestingParty").value;

		let file = {
			purpose: purpose,
			dateFrom: dateFrom,
			dateTo: dateTo,
			notes: notes
		};
		const content = JSON.stringify(file);
		
		this.setStatus("Initiating transaction... (please wait)");
	
		const { saveRequest } = this.meta.methods;
        await saveRequest(dataSubject, requestingParty, content).send({ from: this.account, gas: 3141592 });
		//const r = await saveRequest(dataSubject, requestingParty, content).send({ from: this.account, gas: 3141592 });

		//document.getElementById("show").innerHTML = r;
		this.setStatus("Transaction of service request complete!");
		document.getElementById("saveRequestReceipt").style.display = "block";
  	},

	getRequest: async function() {
		const getDataSubject = document.getElementById("getDataSubject").value;
		const getRequestingParty = document.getElementById("getRequestingParty").value;

		this.setStatus("Initiating transaction... (please wait)");

		const { getRequest }=this.meta.methods;
		const r = await getRequest(getDataSubject, getRequestingParty).call({from: this.account});

		document.getElementById("show").innerHTML = r;
		this.setStatus("Transaction of request view complete!");

        document.getElementById("url").style.display="block";
		document.getElementById("yourSignature").style.display="block";
		document.getElementById("authRequestBtn").style.display = "block";
	},

	authRequest: async function(){
		//document.write("<script type='text/javascript' src='spark-md5.js'></script> ");
  		const getDataSubject = document.getElementById("getDataSubject").value;
		const getRequestingParty = document.getElementById("getRequestingParty").value;
		const authURL = document.getElementById("url").value;
		const yourSignature = document.getElementById("yourSignature").value;
		const status = "authorized";

        this.setStatus("Initiating transaction... (please wait)");

        const { getRequest }=this.meta.methods;
        const content = await getRequest(getDataSubject, getRequestingParty).call({from: this.account});

		let req = {
			requestTo: getDataSubject,
			requestFrom: getRequestingParty,
			requestContent: content
		};
		const requestContent = JSON.stringify(req);
		//let hexHash = SparkMD5.hash(json);

		const { authRequest } = this.meta.methods;
        await authRequest(yourSignature, status, authURL, requestContent).send({ from: this.account, gas: 3141592 });
		this.setStatus("Transaction of request authorization complete!");

        document.getElementById("saveAuthRequestReceipt").style.display = "block";
	},

	getPT: async function(){
        this.refreshShow();
  		const getNameFrom = document.getElementById("getNameFrom").value;
        const getStatus = document.getElementById("getStatus").value;

        this.setStatus("Initiating transaction... (please wait)");

        const { getAuthURL }=this.meta.methods;
		const authURL = await getAuthURL(getNameFrom, getStatus).call({from: this.account});

        const { getAuthContent }=this.meta.methods;
        const authContent = await getAuthContent(getNameFrom, getStatus).call({from: this.account});

        let result = {
			From: getNameFrom,
			authStatus: getStatus,
			authURL: authURL,
			PT: authContent
        };
		const res = JSON.stringify(result);
        document.getElementById("show").innerHTML = res;
        this.setStatus("Transaction of permission ticket view complete!");
        document.getElementById("downloadPT").style.display = "block";
	},

	uploadRqPToken: async function(){
		this.refreshShow();
  		var file = document.getElementById("upRqPToken").files[0];
        var reader = new FileReader();
        reader.readAsText(file);// read upload file
        reader.onload = function() {
            var fileContent = JSON.stringify(this.result);
            document.getElementById("rqpToken").innerHTML = fileContent;
        }
        this.setStatus("Transaction of token upload complete!");
        document.getElementById("shareTokenBtn").style.display = "block";
        document.getElementById("rpName").style.display = "block";
        document.getElementById("receiverAP").style.display = "block";
	},

	shareToken: async function(){
  		this.refreshShow();
  		var token = document.getElementById("rqpToken").innerHTML;
  		var rpName = document.getElementById("rpName").value;
  		var receiver = document.getElementById("receiverAP").value;
        this.setStatus("Initiating transaction... (please wait)");

        const { saveRqPToken } = this.meta.methods;
        await saveRqPToken(rpName,receiver,token).send({ from: this.account, gas: 3141592 });
        this.setStatus("Transaction of token sharing complete!");

        document.getElementById("saveRqPTokenReceipt").style.display="block";
	},

    getRqPToken: async function(){
  		this.refreshShow();
  		var getYourSignature = document.getElementById("getYourSignature").value;
  		var getFrom = document.getElementById("getFrom").value;

        const { getRqPToken }=this.meta.methods;
        const tokenContent = await getRqPToken(getFrom, getYourSignature).call({from: this.account});
        document.getElementById("show").innerHTML = tokenContent;

        this.setStatus("Transaction of token view complete!");

        document.getElementById("downloadRqPToken").style.display  ="block";
	},

    uploadAPToken: async function(){
        this.refreshShow();
  		var file = document.getElementById("upAPToken").files[0];
        var reader = new FileReader();
        reader.readAsText(file);// read upload file
        reader.onload = function() {
            var fileContent = JSON.stringify(this.result);
            document.getElementById("apToken").innerHTML = fileContent;
        }
        this.setStatus("Transaction of token upload complete!");
        document.getElementById("authTokenBtn").style.display = "block";
        document.getElementById("apName").style.display = "block";
        document.getElementById("receiverRP").style.display = "block";
    },
 
    authToken: async function() {
        this.refreshShow();
  		var token = document.getElementById("apToken").innerHTML;
        var apName = document.getElementById("apName").value;
        var receiver = document.getElementById("receiverRP").value;
        this.setStatus("Initiating transaction... (please wait)");

      	const { saveAPToken } = this.meta.methods;
      	await saveAPToken(apName, receiver, token).send({ from: this.account, gas: 3141592 });


        this.setStatus("Transaction of token authorization complete!");
        document.getElementById("saveAPTokenReceipt").style.display = "block";
  },
  
  	getAPToken: async function() {
		this.refreshShow();
  		const authName = document.getElementById("authName").value;
		const getSignature = document.getElementById("getSignature").value;
		this.setStatus("Initiating transaction... (please wait)");
	
		const { getAPToken } = this.meta.methods;
		var result = await getAPToken(authName, getSignature).call({ from: this.account });
		const status = document.getElementById("show");
    	status.innerHTML = result;
	
		this.setStatus("Transaction of token view complete!");
		document.getElementById("downloadAPToken").style.display="block";
  },

  refreshShow: function(){
  	document.getElementById("show").innerHTML = null;
  },
	setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
	
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }

  App.start();
});
