var UTMBUILDER = UTMBUILDER || (function(selector){
	
	const self = {
		init: function(selector){
			self.selector = selector;
		}
		,jsonData: {
			"data" :[
				{
					"inputName":'Website Url',
					"placeholder" : "The full website URL (e.g. https://www.example.com)",
					"id": "websiteUrl",
					"name" : "websiteUrl"
				},
				{
					"inputName":'Campaign Source',
					"placeholder" : "The referrer: (e.g. google, newsletter)",
					"id": "campaignSource",
					"name" : "campaignSource"
				},
				{
					"inputName":'Campaign Medium',
					"placeholder" : "Marketing medium: (e.g. cpc, banner, email)",
					"id": "campaignMedium",
					"name" : "campaignMedium"
				},
				{
					"inputName":'Campaign Name',
					"placeholder" : "Product, promo code, or slogan (e.g. spring_sale)",
					"id": "campaignName",
					"name" : "campaignName"
				},
				{
					"inputName":'Campaign Term',
					"placeholder" : "Identify the paid keywords",
					"id": "campaignTerm",
					"name" : "campaignTerm"
				},
				{
					"inputName":'Campaign Content',
					"placeholder" : "Use to differentiate ads",
					"id": "campaignContent",
					"name" : "campaignContent"
				}
			]
		}
		,formBuild : ()=>{
			let form = document.querySelector(self.selector);
			
			let data = self.jsonData.data;
			for(i = 0 ; i < data.length; i++){
				
				let formControl = document.createElement("div");
				formControl.setAttribute("class", "FormControl")
				form.append(formControl);

				let urlName = document.createElement("label");
				urlName.setAttribute("class", "FormControl-label");
				urlName.append("* "+data[i].inputName+"")
				formControl.append(urlName);

				let FormControlBody = document.createElement("div");
				FormControlBody.setAttribute("class", "FormControl-body")
				
				formControl.append(FormControlBody);

				var urlInput = document.createElement("input");
				urlInput.setAttribute("type", "text");
				urlInput.setAttribute("id", data[i].id);
				urlInput.setAttribute("class", "url");
				urlInput.setAttribute("name", data[i].name);
				urlInput.setAttribute("placeholder", data[i].placeholder);
				FormControlBody.append(urlInput);

			}			
		}
		,validURL: (str)=>{
			var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
			    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
			return !!pattern.test(str);
		}
		,checkLastCharacter : (strurl)=>{
			let strurlData = strurl.substr(-1);
			var tempStr = strurl;

			if(strurlData !== '/'){

				tempStr = strurl+'/';
				return tempStr;
			}else{

				tempStr = strurl;
				return tempStr;
			}
		}
		,createUrl: ()=>{
			var campaignSource = document.getElementById("campaignSource");

			var webUrlData = document.getElementById("websiteUrl");
			let campaignMediumData = document.getElementById("campaignMedium");
			let campaignNameData = document.getElementById("campaignName");
			let campaignTermData = document.getElementById('campaignTerm');
			let campaignContentData = document.getElementById("campaignContent");
			
			campaignSource.addEventListener('input', function(e){
				campaignSourceData = e.target.value;
				webUrl = webUrlData.value;
				campaignMedium = campaignMediumData.value;
				campaignName = campaignNameData.value;
				campaignTerm = campaignTermData.value;
				campaignContent = campaignContentData.value;


				var websiteUrl = self.checkLastCharacter(webUrl);
				let checkUrl = self.validURL(websiteUrl);
				console.log(websiteUrl);
				console.log(checkUrl);
				console.log(webUrl);
				console.log(campaignSourceData);
			})	
			
		}
	}

	return self;
}());
