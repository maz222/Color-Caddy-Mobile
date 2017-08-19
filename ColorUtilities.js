//rgb = [red, green, blue]
function mergeRGB(rgb) {
	return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
}

function splitRGBString(rgb) {
    rgb = rgb.slice(4, rgb.length - 1);
    rgb = rgb.split(",");
    for(num in rgb) {
        rgb[num] = parseInt(rgb[num]);
    }
    return rgb;
}
//colorVal = int : 0 - 255
function RGBtoHEX(colorVal) {
	colorVal = parseInt(colorVal).toString(16).toUpperCase();
	if(colorVal.length < 2) {
		colorVal = "0" + colorVal;
	}
	return colorVal;
}

//rgb = [red, green, blue]
function RGBtoHSL(rgb) {
    var red = rgb[0] / 255;
    var green = rgb[1] / 255;
    var blue = rgb[2] / 255;
    var cMax = Math.max(red, green, blue);
    var cMin = Math.min(red, green, blue);
    var delta = cMax - cMin;
    var hue = 0;
    if (delta != 0) {
        switch (cMax) {
            case red:
                hue = 60 * (((green - blue) / delta) % 6);
                break;
            case green:
                hue = 60 * (((blue - red) / delta) + 2);
                break;
            case blue:
                hue = 60 * (((red - green) / delta) + 4);
                break;
        }
    }
    var lightness = (cMax + cMin) / 2;
    var saturation = 0;
    if (delta != 0) {
        saturation = delta / (1 - Math.abs(2*lightness - 1));
    }
    return [hue, saturation, lightness];
}

// hsl = [Hue, saturation, lightness] - [(int),(float <= 1),(float <= 1)]
function HSLtoRGB(hsl){

	var h = hsl[0] / 360;
	var s = hsl[1];
	var l = hsl[2];

    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function getColors(hsl, hueVals) {
	var colors = []
	for(hVal in hueVals) {
		var color = HSLtoRGB([hueVals[hVal], hsl[1], hsl[2]]);
		color = mergeRGB(color);
		colors.push(color);
	}
	return colors;
}

function getComplementary(rgb) {
	var hsl = RGBtoHSL(rgb);
	var comColor = (hsl[0] + 180) % 360;
	return getColors(hsl, [comColor]);
}

function getAnalgous(rgb) {
	var hsl = RGBtoHSL(rgb);
	var analColor1 = (hsl[0] + 30) % 360;
    var analColor2 = (hsl[0] - 30) % 360;
    return getColors(hsl, [analColor1, analColor2]);
}

function getSplit(rgb) {
	var hsl = RGBtoHSL(rgb);
	var splitColor1 = (hsl[0] + 180 - 30) % 360;
    var splitColor2 = (hsl[0] + 180 + 30) % 360;
    return getColors(hsl, [splitColor1, splitColor2]);
}

function getTriad(rgb) {
	var hsl = RGBtoHSL(rgb);
	var triadColor1 = (hsl[0] + 120) % 360;
    var triadColor2 = (hsl[1] - 120) % 360;
    return getColors(hsl, [triadColor1, triadColor2]);
}

function getTetrad(rgb) {
	var hsl = RGBtoHSL(rgb);    
	var tetradColor1 = (hsl[0] + 60) % 360;
    var tetradColor2 = (hsl[0] + 180) % 360;
    var tetradColor3 = (hsl[0] - 120) % 360;
    return getColors(hsl, [tetradColor1, tetradColor2, tetradColor3]);
}

function getSquare(rgb) {
	var hsl = RGBtoHSL(rgb);
	var squareColor1 = (hsl[0] + 90) % 360;
    var squareColor2 = (hsl[0] - 90) % 360;
    var squareColor3 = (hsl[0] + 180) % 360;
    return getColors(hsl, [squareColor1, squareColor2, squareColor3]);
}