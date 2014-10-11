var Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = '';
Barcode.useLED = true;

// eventi del barcode reader

Barcode.addEventListener('error', function(e) {
	$.scanContentType.text = ' ';
	$.scanParsed.text = ' ';
	$.scanResult.text = e.message;
});
Barcode.addEventListener('cancel', function(e) {
	Ti.API.info('Cancel received');
});
Barcode.addEventListener('success', function(e) {
	Ti.API.info('Success called with barcode: ' + e.result);

	$.scanResult.text += e.result + ' ';
	$.scanContentType.text += parseContentType(e.contentType) + ' ';
	$.scanParsed.text += parseResult(e) + ' ';

});

function reset() {
    $.scanResult.text = ' ';
    $.scanContentType.text = ' ';
    $.scanParsed.text = ' ';
}

// parsing del codice scansito

function parseContentType(contentType) {
	switch (contentType) {
	case Barcode.URL:
		return 'URL';
	case Barcode.SMS:
		return 'SMS';
	case Barcode.TELEPHONE:
		return 'TELEPHONE';
	case Barcode.TEXT:
		return 'TEXT';
	case Barcode.CALENDAR:
		return 'CALENDAR';
	case Barcode.GEOLOCATION:
		return 'GEOLOCATION';
	case Barcode.EMAIL:
		return 'EMAIL';
	case Barcode.CONTACT:
		return 'CONTACT';
	case Barcode.BOOKMARK:
		return 'BOOKMARK';
	case Barcode.WIFI:
		return 'WIFI';
	default:
		return 'UNKNOWN';
	}
}

function parseResult(event) {
	var msg = '';
	switch (event.contentType) {
	case Barcode.URL:
		msg = 'URL = ' + event.result;
		break;
	case Barcode.SMS:
		msg = 'SMS = ' + JSON.stringify(event.data);
		break;
	case Barcode.TELEPHONE:
		msg = 'Telephone = ' + event.data.phonenumber;
		break;
	case Barcode.TEXT:
		msg = 'Text = ' + event.result;
		break;
	case Barcode.CALENDAR:
		msg = 'Calendar = ' + JSON.stringify(event.data);
		break;
	case Barcode.GEOLOCATION:
		msg = 'Latitude = ' + event.data.latitude + '\nLongitude = ' + event.data.longitude;
		break;
	case Barcode.EMAIL:
		msg = 'Email = ' + event.data.email + '\nSubject = ' + event.data.subject + '\nMessage = ' + event.data.message;
		break;
	case Barcode.CONTACT:
		msg = 'Contact = ' + JSON.stringify(event.data);
		break;
	case Barcode.BOOKMARK:
		msg = 'Bookmark = ' + JSON.stringify(event.data);
		break;
	case Barcode.WIFI:
		return 'WIFI = ' + JSON.stringify(event.data);
	default:
		msg = 'unknown content type';
		break;
	}
	return msg;
}

// attivazione scanner

function doClick(e) {
	reset();
	Barcode.capture({
		animate : true,
		overlay : $.overlay,
		showCancel : true,
		showRectangle : true,
		keepOpen : false,
		acceptedFormats : [Barcode.FORMAT_QR_CODE]
	});
}

$.index.open();
