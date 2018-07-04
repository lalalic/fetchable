var uuid=0
var cached=new Map()//to support Fetchable("xxx").createObjectURL

module.exports=function fetchable(PROTOCOL="blob"){
	if(window.URL){
		return {
			createObjectURL(data,type){
				return window.URL.createObjectURL(new Blob([data],{type}))
			},
			revokeObjectURL(){
				window.URL.revokeObjectURL(...arguments)
			}
		}
	}
	
	
	
	
	var cachedData=cached.get(PROTOCOL)
	if(!cachedData){
		cached.set(PROTOCOL,cachedData=new Map())
	}

	this.createObjectURL=function(data){
		var url=PROTOCOL+"://"+(uuid++)
		cachedData.set(url,{data})
		return url
	}
	
	this.revokeObjectURL=function(url){
		return cachedData.delete(url)
	}
	
	
	//customized fetch to support `${PROTOCOL}://${id}`
	function fetcher(url){
		return new Promise(function(resolve, reject){
			var cache=cachedData.get(url)
			if(cache){
				resolve(new Response(Buffer.from(cache.data),{}))
			}else{
				resolve(new Response("",{status:400, statusText:"data not exists"}))
			}
		})
	}

	fetcher.support=function(url){
		if(arguments.length==0){
			return PROTOCOL+"://"
		}else if(url.startsWith(PROTOCOL+"://")){
			return true
		}
		return false
	}
	
	fetch.support(fetcher)
}