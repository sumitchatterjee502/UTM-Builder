var UTMBUILDER = UTMBUILDER || (function(){
	
	const self = {
		init: function(selector, refSelector){
			self.selector = selector;
			self.refSelector = refSelector;
			//console.log(self);
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
			var campaignMediumData = document.getElementById("campaignMedium");
			var campaignNameData = document.getElementById("campaignName");
			var campaignTermData = document.getElementById('campaignTerm');
			var campaignContentData = document.getElementById("campaignContent");
			
			const validData = {};

			campaignSource.addEventListener('input', function(e){

				validData.campaignSourceData = e.target.value;
				validData.webUrl = webUrlData.value;
				validData.campaignMedium = campaignMediumData.value;
				validData.campaignName = campaignNameData.value;
				validData.campaignTerm = campaignTermData.value;
				validData.campaignContent = campaignContentData.value;

				validData.websiteUrl = self.checkLastCharacter(validData.webUrl);
				validData.checkUrl = self.validURL(validData.websiteUrl);
				
				self.createAndGetUrl(validData);
			});

			campaignMediumData.addEventListener('input', function(e){

				validData.campaignMedium = e.target.value;
				validData.campaignSourceData = campaignSource.value;
				validData.webUrl = webUrlData.value;				
				validData.campaignName = campaignNameData.value;
				validData.campaignTerm = campaignTermData.value;
				validData.campaignContent = campaignContentData.value;

				validData.websiteUrl = self.checkLastCharacter(validData.webUrl);
				validData.checkUrl = self.validURL(validData.websiteUrl);
				
				self.createAndGetUrl(validData);
			});

			campaignNameData.addEventListener('input', function(e){

				validData.campaignName = e.target.value;
				validData.campaignSourceData = campaignSource.value;
				validData.webUrl = webUrlData.value;
				validData.campaignMedium = campaignMediumData.value;	
				validData.campaignTerm = campaignTermData.value;
				validData.campaignContent = campaignContentData.value;

				validData.websiteUrl = self.checkLastCharacter(validData.webUrl);
				validData.checkUrl = self.validURL(validData.websiteUrl);
				
				self.createAndGetUrl(validData);
			});

			campaignTermData.addEventListener('input', function(e){

				validData.campaignTerm = e.target.value;
				validData.campaignSourceData = campaignSource.value;
				validData.webUrl = webUrlData.value;
				validData.campaignMedium = campaignMediumData.value;	
				validData.campaignName = campaignNameData.value;
				validData.campaignContent = campaignContentData.value;

				validData.websiteUrl = self.checkLastCharacter(validData.webUrl);
				validData.checkUrl = self.validURL(validData.websiteUrl);
				
				self.createAndGetUrl(validData);
			});

			campaignContentData.addEventListener('input', function(e){

				validData.campaignContent = e.target.value;
				validData.campaignSourceData = campaignSource.value;
				validData.webUrl = webUrlData.value;
				validData.campaignMedium = campaignMediumData.value;	
				validData.campaignName = campaignNameData.value;
				validData.campaignTerm = campaignTermData.value;

				validData.websiteUrl = self.checkLastCharacter(validData.webUrl);
				validData.checkUrl = self.validURL(validData.websiteUrl);
				
				self.createAndGetUrl(validData);
			});	
			
		}
		,createAndGetUrl: (data)=>{
			td = self.refSelector;
			let reSelector = document.getElementById(td);

			if(data.checkUrl){
				if(data.campaignSourceData){
					if(data.campaignMedium){
						if(data.campaignName){
							if(data.campaignTerm){
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_campaign="+data.campaignName+"&utm_term="+data.campaignTerm+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_campaign="+data.campaignName+"&utm_term="+data.campaignTerm;
								}
							}else{
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_campaign="+data.campaignName+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_campaign="+data.campaignName;
								}
							}
						}else{
							if(data.campaignTerm){
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_term="+data.campaignTerm+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_term="+data.campaignTerm;	
								}
							}else{
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_medium="+data.campaignMedium;
								}
							}
						}
					}else{
						if(data.campaignName){
							if(data.campaignTerm){
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_campaign="+data.campaignName+"&utm_term="+data.campaignTerm+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_campaign="+data.campaignName+"&utm_term="+data.campaignTerm;
								}
							}else{
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_campaign="+data.campaignName+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_campaign="+data.campaignName;
								}
							}
						}else{
							if(data.campaignTerm){
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_term="+data.campaignTerm+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_term="+data.campaignTerm;	
								}
							}else{
								if(data.campaignContent){
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData+"&utm_content="+data.campaignContent;
								}else{
									reSelector.value = data.websiteUrl+"?utm_source="+data.campaignSourceData;
								}
							}
						}
					}
				}else{
					reSelector.value = "";
				}
			}else{
				document.getElementById("websiteUrl").focus();
			}
		}
	}

	return self;
}());
