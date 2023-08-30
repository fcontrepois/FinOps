function constructor(){};

function onFocus() {
	$.window.removeEventListener('focus', onFocus);
	validateDocsInfo();
}

function validateDocsInfo() {
	if (!Ti.App.Properties.getBool('noticeShown', false)) {
		const alertNotice = Ti.UI.createAlertDialog({
			title: 'Notice',
			message: 'This app is sponsored by Strategic Blue',
			buttonNames: [ 'Alright!', 'Strategic Blue Website', 'Don\'t show again' ],
			cancel: 0,
			destructive: 2
		});

		alertNotice.addEventListener('click', ({ index }) => {
			if (index === 1) {
				Ti.Platform.openURL('https://strategic-blue.com');
			} else if (index === 2) {
				Ti.App.Properties.setBool('noticeShown', true);
			}
		});

		alertNotice.show();
	}
}

var dialog = require('ti.webdialog');
function openUrl(event){
    var selectUrl = event.itemId;
    if (dialog.isSupported()) {
        dialog.open({
            url: selectUrl
        });
    }
}