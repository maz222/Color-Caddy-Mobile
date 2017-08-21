function setRed(value) {
	var text = document.getElementById("red-text");
	value = verifyRGB(value);
	if(value != $("#red-slider").slider("value"))
	{
		$("#red-slider").slider("value", value);
	}
	text.value = value;
	text.style.backgroundColor = "rgb(" + value + ",0,0)";
	setHex();
}

function setGreen(value) {
	var text = document.getElementById("green-text");
	value = verifyRGB(value);
	if(value != $("#green-slider").slider("value"))
	{
		$("#green-slider").slider("value", value);
	}	
	text.value = value;
	text.style.backgroundColor = "rgb(0," + value + ",0)";
	setHex();
}

function setBlue(value) {
	var text = document.getElementById("blue-text");
	value = verifyRGB(value);
	if(value != $("#blue-slider").slider("value"))
	{
		$("#blue-slider").slider("value", value);
	}	
	text.value = value;
	text.style.backgroundColor = "rgb(0,0," + value + ")";
	setHex();
}

function verifyRGB(value) {
	if(isNaN(value)) {
		return 0;
	}
	return(Math.min(Math.max(value,0),255));
}

function setHex() {
	var redVal = document.getElementById("red-text").value;
	var greenVal = document.getElementById("green-text").value;
	var blueVal = document.getElementById("blue-text").value;
	var hexField = document.getElementById("hex-text");
	hexField.style.backgroundColor = mergeRGB([redVal, greenVal, blueVal]);
	hexVal = [RGBtoHEX(redVal), RGBtoHEX(greenVal), RGBtoHEX(blueVal)];
	hexVal = "#" + hexVal[0] + hexVal[1] + hexVal[2];
	hexField.value = hexVal;
	hexField.style.color = getHexTextColor([redVal, greenVal, blueVal]);

	var selectedColor = document.getElementById("selected-color");
	selectedColor.style.backgroundColor = mergeRGB([redVal, greenVal, blueVal]);
	selectedColor.childNodes[1].innerText = hexVal;

	updateColors();
}

function setFromHex(value) {
	value = value.replace(/\s+/, "");
	if(value[0] == "#")
	{
		value = value.slice(1,value.length);
	}
	if(value.length < 6 || !verifyHEX(value.slice(0,2)) || !verifyHEX(value.slice(2,4)) || !verifyHEX(value.slice(4,6)))
	{
		value = "000000";
	}
	var RGB = [parseInt(value.slice(0,2), 16), parseInt(value.slice(2,4), 16), parseInt(value.slice(4,6), 16)];
	setRed(RGB[0]);
	setGreen(RGB[1]);
	setBlue(RGB[2]);

	updateColors();
}

function getHexTextColor(RGBvalue) {
	var whiteContrast = Math.abs(255 - RGBvalue[0]) + Math.abs(255 - RGBvalue[1]) + Math.abs(255 - RGBvalue[2]);
	var RGBTotal = parseInt(RGBvalue[0]) + parseInt(RGBvalue[1]) + parseInt(RGBvalue[2]);
	if(whiteContrast > RGBTotal) {
		return "rgb(255,255,255)";
	}
	return "rgb(0,0,0)";
}

function verifyHEX(value) {
	var val = parseInt(value, 16);
	if(isNaN(val)) {
		return false;
	}
	if(val > 255 || val < 0) {
		return false;
	}
	return true;
}
