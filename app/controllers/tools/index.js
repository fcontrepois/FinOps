import { logger } from 'logger';
(function constructor() {

}());

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

function openComponent(e) {
	const identifier = 'tools/' + e.section.getItemAt(e.itemIndex).properties.itemId;
	const component = Alloy.createController(identifier).getView();

	Alloy.CFG.tabGroup.activeTab.open(component);

	logger.log('Ti.UI.TabGroup.activeTab.open', identifier);
}