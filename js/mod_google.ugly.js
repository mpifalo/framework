var GOOGLE=function(pub){function setupGALink($anElem){var thisGaCat="external link",thisGaAction="click",thisGaLabel=typeof $anElem.attr("title")!=="undefined"?$anElem.attr("title"):$anElem.attr("href");$anElem.data("ga",{category:thisGaCat,action:thisGaAction,label:thisGaLabel}).addClass("ga")}pub.callGaEvent=function(anElem){var $theElem=$(anElem),gaCategory=$theElem.data("ga").category,gaAction=$theElem.data("ga").action,gaLabel=$theElem.data("ga").label;ga("send","event",gaCategory,gaAction,gaLabel)};pub.callGaSocial=function(anElem){var $theElem=$(anElem),socialNetwork=$theElem.data("ga").socialnetwork,socialAction=$theElem.data("ga").socialaction,socialTarget=typeof $theElem.data("ga").socialtarget!=="undefined"?$theElem.data("ga").socialtarget:document.location.pathname;ga("send","social",socialNetwork,socialAction,socialTarget)};pub.init=function(profileID){var hasGA=typeof window.ga==="function"?true:false,hasProfileID=typeof profileID!=="undefined"?true:false;if(!hasGA){(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date;a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga")}if(hasProfileID){ga("create",profileID,"auto");ga("send","pageview")}EIS.loadOnce("jQuery",function(){$("body").on("click",".ga",function(){GOOGLE.callGaEvent($(this))});$("body").on("click",".gaSocial",function(){GOOGLE.callGaSocial($(this))});var $gaLoad=$(".ga-load");if($gaLoad.length>0){$gaLoad.each(function(){GOOGLE.callGaEvent($(this))})}var $gaExtLink=$(".gaExtLink");if($gaExtLink.length>0){$gaExtLink.each(function(){setupGALink($(this))})}})};return pub}(GOOGLE||{});