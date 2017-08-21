var currScheme = "complementary";

function startup() {
	$(".jQuery-slider").slider({
		min: 0,
		max: 255, 
		value: 255,
	});
	$("#red-slider").on("slidechange", function(ui, event) {setRed($("#red-slider").slider("value"))});
	$("#red-slider").on("slide", function(ui, event) {setRed($("#red-slider").slider("value"))});

	$("#blue-slider").on("slidechange", function(ui, event) {setBlue($("#blue-slider").slider("value"))});
	$("#blue-slider").on("slide", function(ui, event) {setBlue($("#blue-slider").slider("value"))});

	$("#green-slider").on("slidechange", function(ui, event) {setGreen($("#green-slider").slider("value"))});
	$("#green-slider").on("slide", function(ui, event) {setGreen($("#green-slider").slider("value"))});

	document.getElementById("selected-color").style.backgroundColor = "rgb(255,255,255)";
	updateColors();
}

//buttons and stuff
function toggleEditor() {
	var editor = document.getElementById("editor-container");
	if(editor.style.display == "none") {
		editor.style.display = "flex";
	}
	else {
		editor.style.display = "none";
	}
}

function toggleSchemes(){
	var schemes = document.getElementById("scheme-list");
	if (schemes.style.display != "flex") {
		schemes.style.display = "flex";
	}
	else {
		schemes.style.display = "none";
	}	
}

function setScheme(scheme) {
	currScheme = scheme;
	updateColors();
}

function updateColors() {
	var keyColor = document.getElementById("selected-color").style.backgroundColor;
	if(keyColor != "none") {
		keyColor = splitRGBString(keyColor);
		switch(currScheme) {
			case "analgous":
				var colors = getAnalgous(keyColor);
				break;
			case "complementary":
				var colors = getComplementary(keyColor);
				break;
			case "triad":
				var colors = getTriad(keyColor);
				break;
			case "tetradic":
				var colors = getTetrad(keyColor);
				break;
			case "split":
				var colors = getSplit(keyColor);
				break;
			case "square":
				var colors = getSquare(keyColor);
				break;
		}
		colorContainers = document.getElementsByClassName("color-container");
		colorContainers[0].style.height = (100 / (colors.length + 1) - 5) + "%";
		//colorContainers[0].style.color = getHexTextColor(keyColor);
		for(i = 0; i < colors.length; i++) {
			colorBox = colorContainers[i+1].childNodes[1];
			colorBox.style.backgroundColor = colors[i];
			colorContainers[i+1].style.height = (100 / (colors.length + 1) - 5) + "%";
			colorContainers[i+1].style.display = "flex";
			hexVal = splitRGBString(colors[i]);
			//colorBox.style.color = getHexTextColor(hexVal);
			hexVal = [RGBtoHEX(hexVal[0]), RGBtoHEX(hexVal[1]), RGBtoHEX(hexVal[2])];
			hexVal = "#" + hexVal[0] + hexVal[1] + hexVal[2];
			colorBox.childNodes[1].innerText = hexVal;
		}
		//console.log([colorContainers.length, colors.length]);
		for(i = 0; i < colorContainers.length - (colors.length + 1); i++) {
			colorContainers[colorContainers.length - 1 - i].style.display = "none";
		}
	}
}