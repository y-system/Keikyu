var pageWorkers = require("page-worker");
 
// This content script sends header titles from the page to the add-on:
var script = "var elements = document.querySelectorAll('big'); " +
             "for (var i = 0; i < elements.length; i++) { " +
			 "  self.postMessage(elements[i].textContent) " +
             "}";
var unko = true;

const widgets = require("widget");
const tabs = require("tabs");
var self = require("self");
var widget = widgets.Widget({
  id: "keikyu icon",
  label: "Keikyu website",
  contentURL: self.data.url("favicon.ico"),
  onClick: function() {
  panel.show();
  }
});

// Create a page worker that loads keikyu:http://www.keikyu.co.jp/train/operation_info.shtml
pageWorkers.Page({
  contentURL: "http://www.keikyu.co.jp/train/operation_info.shtml",
  contentScript: script,
  contentScriptWhen: "end",
  onMessage: function(message) {
    unko = message;
	console.log(unko);
	if(unko=="京急線は平常通り運転しています。"){
	console.log("ok dayo");
	var messs="平常どおり";
}else{
	console.log("damepo");
	var messs="情報があります";
}
require("widget").Widget({
  id: "keikyu",
  label: "京急："+unko,
  content: messs,
  width: messs.length*13,
  onClick: function() {
  panel.show();
  }
});
  }
});

var panel = require("panel").Panel({
  width: 360,
  height: 560,
  contentURL: "http://www.keikyu.co.jp/train/operation_info.shtml"
});