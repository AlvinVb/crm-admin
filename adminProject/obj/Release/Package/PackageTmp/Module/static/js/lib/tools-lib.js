; (function ($) {
	window.alert = function (content, timeout) {
		var d = dialog({
			title: '提示',
			cancelValue: '关闭',
			skin: "black",
			content: content
		});
		d.showModal();
		if (timeout) {
			setTimeout(function () {
				d.close();
			}, timeout);
		}else if(timeout!==0){
			setTimeout(function () {
				d.close();
			}, 2000);
		}
	};
	var util = {};
	util.stopBubble=function (e) {
		if (e && e.stopPropagation) {
			//因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		} else {
			//否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
		}
	};

	util.obj2list = function(obj){
		var list = [];
		for(var i in obj){
			list.push(obj[i]);
		}
		return list;
	};

	util.list2obj = function(list,key){
		var obj = {};
		for(var i=0;i<list.length;i++){
			var idata = list[i];
			obj[idata[key]] = idata;
		}
		return obj;
	};

	util.toNewUrlPath=function(urlPath){  //页面跳转统一处理

		/*var childMenuID =this.getUrlParam("mid");
		var parentMenu_Id = this.getUrlParam("PMenuID");
		var MMenuID = this.getUrlParam("MMenuID");
		var result = urlPath.indexOf("?");
		var newUrl = result != -1 ? (urlPath + "&mid=" + childMenuID + "&PMenuID=" + parentMenu_Id + "&MMenuID=" + MMenuID) : (urlPath + "?mid=" + childMenuID + "&PMenuID=" + parentMenu_Id + "&MMenuID=" + MMenuID);*/
		location.href = urlPath;


	};
	util.getUrlParam = function(key){
		var urlstr = window.location.href.split("?"),
			params = {};
		if (urlstr[1]) {

			var items = urlstr[1].split("&");

			for (i = 0; i < items.length; i++) {

				itemarr = items[i].split("=");

				params[itemarr[0]] = itemarr[1];
			}
		}
		return key?params[key]:params;

	};
	util.toUrlWithParam=function(toUrl,param){

		var value = "",itemarr = [],params;


		params = this.getUrlParam();

		if(param){

			var temps = param.split("&"),tempparam;

			for(var i=0;i<temps.length;i++){

				tempparam = temps[i].split('=');

				params[tempparam[0]] = tempparam[1];
			}
		}


		var paramslist = [];

		for(var key in params){

			paramslist.push(key + '=' + params[key]);
		}
		location.href= toUrl + "?" + paramslist.join("&");
	};
	//提交loading 防止多点
	// notProceed  为true 没有在进行提交
	util.isLoading=function(notProceed){
		if(notProceed){
			$(".isSubmitLoading").remove();
		}else{
			if($(".isSubmitLoading").length==0) {
				$("body").append('<div class="isSubmitLoading"></div>');
			}
		}
	};
	//构建ajax
	util.buildAjaxParams=function(param){
		var _param = {
			type: "post",
			dataType: "json",
			url: "",
			data: null,
			beforeSend: function () {

			},
			success: null,
			error: function (XMLHttpRequest, textStatus, errorThrown){
				$.util.isLoading(true);
				$(".loading").hide();
			}
		};

		$.extend(_param,param);

		//var baseInfo = this.getBaseAjaxParam();

		var action = param.data.action,
			interfaceType = param.interfaceType||'Product',
			_req = {
				'Locale':null,
				'CustomerID':(param.customerId?param.customerId:null),
				'UserID':(param.userId?param.userId:null),
				'OpenID':null,
				'Token':null,
				'ChannelID':(param.ChannelID?param.ChannelID:null),
				'Parameters':param.data,
				'random':Math.random()
			};


		delete param.data.action;

		var _data = {
			'req':JSON.stringify(_req)
		};

		_param.data = _data;
		if(param.data.oldInface){
			_param.url = _param.url;
		}else {
			_param.url = _param.url + '?type=' + interfaceType + '&action=' + action;
		}
		return _param;
	};
	//最新的ajax封装
	util.ajax=function(param){

		var _param;

		if(param.url.indexOf('Gateway.ashx')!=-1){

			_param = util.buildAjaxParams(param);
		}else{

			_param = util.buildAjaxParams(param);
		}

		$.ajax(_param);
	},
		$.util=util;
})(jQuery);