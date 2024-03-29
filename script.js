

function generatePhoneField (type, code, no) {
	const phoneHref = "(" + no.slice(0,3) + ")%20" + no.slice(3,6) + "-" + no.slice(6,no.length);
	const fullNumber = code + no;
	const snippet = `<span style="float: left; padding-top: 3px;"> ` +
      `<a href="tel:${fullNumber}" style="float: left;padding-top: 2px;padding-right: 10px; text-decoration:none; display: inline-block; color: #fff" value="${fullNumber}" target="_blank">` +
         `<img alt="Phone" style="height: 20px;width: 20px;float: left;padding-right: 5px;margin-top: -2px;" src="https://razorthink.com/img/signature-template-images/phone.png">` +
         `${ type ? "<span style='text-decoration: none;color: #7f7f7f;font-family: Arial, sans-serif;font-size: 14px;line-height: 16px;'>" + type + ": </span>" : ''}` +
         `<span style="text-decoration: none;color: #7f7f7f;font-family: Arial, sans-serif;font-size: 14px;line-height: 16px;">${code} ${no}</span>` +
      `</a>` +
   `</span>`;
   return snippet;
}

function getTinyURL(url, cb) {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
	  if (xhr.readyState === 4) {
	    xhr.status === 200 ? cb(xhr.responseText) : console.error('error')
	  }
	}
	xhr.open('POST', '/.netlify/functions/tinifyURL');
	xhr.send(JSON.stringify({ url: url}));
}

function submitaction(e) {
	const fields = [
		{label: 'name', name: "name", value:"John Doe"}, 
		{label: 'desig', name: "desig", value:"Project Manager"}, 
		{label: 'email', name: "email", value:"johndoe@gmail.com"}, 
		{label: 'skype', name: "skype", value:"john.doe"}, 
		{label: 'type1', name: "type-1", value:"USA"}, 
		{label: 'code1', name: "code-1", value:"+1"}, 
		{label: 'phone1', name: "phone-1", value:"5417543010"}, 
		{label: 'type2', name: "type-2", value:"India"},
		{label: 'code2', name: "code-2", value:"+91"},  
		{label: 'phone2', name: "phone-2", value:"9999999999"}, 
		{label: 'type2', name: "type-3", value:"India"}, 
		{label: 'code3', name: "code-3", value:"+91"},  
		{label: 'phone3', name: "phone-3", value:"9999999992"}
	];

	const phoneNumberWrapper = document.getElementById("email-phone-wrapper");

	const newfields = fields.map(field => ({
		...field,
		value: document.getElementById("form-" + field.name).value || field.value,		
	}))

	const fieldNames = ["name", "desig", "email", "skype"];
	fieldNames.forEach((item, index) => {
		console.log('Voila', item);
		// Skype
		if(item === "skype") {
			document.getElementById("email-skype-href").href = `skype:${newfields[index].value}?chat` ;
		}
		document.getElementById("email-" + item).textContent = newfields[index].value;
	});

	if(newfields[2].value) {
		document.getElementById("email-email-href").href = `mailto:${newfields[2].value}`;
	}

	if(newfields[3].value) {
		// SKYPE ID
		getTinyURL(newfields[3].value, function(skypeTinyUrl) {
			// document.getElementById("email-skype-href").href = skypeTinyUrl ;
			console.log('TINIFIED', skypeTinyUrl);
		});
	}
	

	let snippet = "";
	[1,2].forEach(index => {
		if( document.getElementById(`form-phone-${index}`).value){
			snippet += generatePhoneField(
				document.getElementById(`form-type-${index}`).value || (index === 1 ? "USA" : "India"),
				document.getElementById(`form-code-${index}`).value || (index === 1 ? "+1" : "+91"),
				document.getElementById(`form-phone-${index}`).value || "9999999999"
			);
		}
	});

	phoneNumberWrapper.innerHTML = snippet;

	let officeNo= "";
	if( document.getElementById(`form-phone-3`).value){
		officeNo += generatePhoneField(
			document.getElementById('form-type-3').value,
			document.getElementById('form-code-3').value,
			document.getElementById('form-phone-3').value
		);
	}

	const officeNumberWrapper = document.getElementById("office-phone-wrapper");
	officeNumberWrapper.innerHTML = officeNo;

	document.getElementById("template").classList.remove("hide");
}

function initiateClipBoard() {
	var clipboard = new ClipboardJS('#copy-btn');
    clipboard.on('success', function(e) {
        console.log(e);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });
}

function init(){
	document.getElementById("submitBtn").addEventListener('click', submitaction);
	initiateClipBoard()
}

window.onload = init;