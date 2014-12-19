function findPos(obj){var currLeft=currTop=0;if(obj.offsetParent){do{currLeft+=obj.offsetLeft;currTop+=obj.offsetTop}while(obj=obj.offsetParent)}return[currLeft,currTop]}EIS.loadOnce("jQuery",function(){function checkRow($menuRow){var wrapCt=0,itemLength=0;if($menuRow===undefined){$menuRow=$(".top-nav > li")}itemLength=$menuRow.length;if(itemLength>0){var firstTop=findPos($menuRow[0])[1],i=0;for(;i<itemLength;i++){var thisElem=$menuRow[i],thisTop=findPos(thisElem)[1];if(thisTop!==firstTop){if(wrapCt===0){$(thisElem).addClass("wrap-block")}else{$(thisElem).addClass("after-wrap")}wrapCt++}}}return wrapCt}function resetRow($menuRow){if($menuRow===undefined){$menuRow=$(".top-nav > li")}$menuRow.filter(".wrap-block").removeClass("wrap-block");$menuRow.filter(".after-wrap").removeClass("after-wrap")}function getMobileState(){var mobileState=false;if($("#mobile-menu").css("display")==="block"||$(".lt-ie8").length>0){mobileState=true}return mobileState}function setupFallbacks(){var cssPointerElem=document.createElement("div"),navSpacerElem=document.createElement("div"),$elemsWithPointer=$("#siteNav").find(".drop > a");cssPointerElem.className="cssPointer";navSpacerElem.className="navSpacer";$elemsWithPointer.append(navSpacerElem)}function hoverFallbacks($hoverElem,hoverState){if(hoverState==="mouseover"){var spacerHeight="61px";if($hoverElem.find(".double-space").length>0){spacerHeight="114px"}$hoverElem.find(".cssPointer").stop(true,true).animate({opacity:1,top:"38px"},state.slideDown);$hoverElem.find(".navSpacer").stop(true,true).animate({height:spacerHeight},state.slideDown)}else if(hoverState==="mouseoff"){$hoverElem.find(".cssPointer").stop(true,true).animate({opacity:0,top:"43px"},state.slideUp);$hoverElem.find(".navSpacer").stop(true,true).animate({height:"0"},state.slideUp,function(){var thisTicker=setTimeout(function(){$(this).css("display","inline");clearTimeout(thisTicker);thisTicker=null},500)})}else{window.console&&console.log("ERROR: cannot run fallbacks - no hoverState passed")}}function openMenu($aNavitem,callbackFn){var $theSubmenu=$aNavitem.find(".sub-menu li"),$theSpacer,$theNavIdx=$dropElems.index($aNavitem),isSubWrapped;$aNavitem.find(".sub-menu").finish().slideDown(state.slideDown,function(){$aNavitem.addClass("current")});isSubWrapped=checkRow($theSubmenu);if(isSubWrapped>0){$theSpacer=$aNavitem.find("a");$theSpacer.addClass("double-space");$aNavitem.addClass("double")}if(noCssTransitions){hoverFallbacks($aNavitem,"mouseover")}state.openedIdx=$theNavIdx;if(callbackFn&&typeof callbackFn==="function"){callbackFn()}}function closeMenu($aNavitem,callbackFn){var $theSubmenu=$aNavitem.find(".sub-menu li"),$theSpacer=$aNavitem.find("a"),$theNavIdx=$dropElems.index($aNavitem);$dropElems.find(".sub-menu").finish().slideUp(state.slideUp,function(){$aNavitem.removeClass("current")});if(noCssTransitions){hoverFallbacks($aNavitem,"mouseoff")}resetRow($theSubmenu);$theSpacer.removeClass("double-space");$aNavitem.removeClass("double");$(".navSpacer").css("display","inline");state.openedIdx=-1;if(callbackFn&&typeof callbackFn==="function"){callbackFn()}}$(".lt-ie9 #mobile-menu").css("display","none");var noCssTransitions=$(".no-csstransitions").length>0,ieFallback=$(".lt-ie9").length===1,ie9Fallback=$(".lt-ie10").length===1,mobileState=getMobileState(),isWrapped,hasActive=$(".top-nav .drop").hasClass("active"),ticker,state={hoverIdx:-1,mouseoutIdx:-1,openedIdx:-1,activeIdx:-1,slideDown:500,slideUp:500,hoverDelay:400,mouseoutDelay:400},$dropElems=$(".top-nav > li");if(!mobileState){isWrapped=checkRow()}if(ieFallback&&!mobileState){setupFallbacks()}else if(ie9Fallback&&!mobileState){var navSpacerElem=document.createElement("div"),$elemsWithPointer=$("#siteNav").find(".drop > a");navSpacerElem.className="navSpacer";$elemsWithPointer.append(navSpacerElem)}if(hasActive&&!mobileState){var $activeItem=$(".top-nav .drop.active"),isSubWrapped=checkRow($activeItem.find(".sub-menu li")),activeIdx=$dropElems.index($activeItem);state.openedIdx=activeIdx;state.activeIdx=activeIdx;if(isSubWrapped>0){var thisSpacer=$activeItem.find("a");thisSpacer.addClass("double-space")}if(ie9Fallback){hoverFallbacks($activeItem,"mouseover")}}function resizing(){mobileState=getMobileState();if(!mobileState){resetRow();isWrapped=checkRow();if(hasActive){$dropElems.eq($dropElems.index(activeIdx)).addClass("active")}}else{if(hasActive){$(".top-nav .drop.active").removeClass("active").find(".sub-menu").removeAttr("style")}}}window.onresize=function(){resizing()};$("#siteNav").on("click","#mobile-menu",function(){$(this).toggleClass("isOpen")});$dropElems.hover(function(){var $thisSubMenu=$(this).find(".sub-menu li"),isSubWrapped=0,$this=$(this);state.hoverIdx=$dropElems.index($this);if(!mobileState){clearTimeout(ticker);ticker=null;state.mouseoutIdx=-1;if(state.openedIdx===-1){openMenu($this)}else{ticker=setTimeout(function(){var thisIdx=$dropElems.index($this);if(state.hoverIdx===thisIdx){if(thisIdx!==state.openedIdx){closeMenu($dropElems.eq(state.openedIdx),function(){if(hasActive){$dropElems.eq($dropElems.index($activeItem)).addClass("active")}})}if(state.openedIdx!==thisIdx){openMenu($this,function(){if(hasActive&&state.activeIdx!==thisIdx){$dropElems.eq($dropElems.index($activeItem)).removeClass("active")}})}ticker=null;clearTimeout(ticker)}},state.hoverDelay)}}},function(){var $thisSubMenu=$(this).find(".sub-menu li"),$thisSpacer=$(this).find("a"),$this=$(this),thisIdx=$dropElems.index($this);state.mouseoutIdx=thisIdx;if(!mobileState){ticker=setTimeout(function(){if(state.mouseoutIdx===state.openedIdx){if(thisIdx!==state.activeIdx){closeMenu($this);if(hasActive){var $thisActive=$dropElems.eq($dropElems.index($activeItem));openMenu($thisActive,function(){$dropElems.eq($dropElems.index($activeItem)).addClass("active")});ticker=null;clearTimeout(ticker)}}}},state.mouseoutDelay)}});$dropElems.find("*").on("focus",function(){$(this).closest(".drop").trigger("mouseenter")});$dropElems.find("*").on("blur",function(){$(this).trigger("mouseoff")})});