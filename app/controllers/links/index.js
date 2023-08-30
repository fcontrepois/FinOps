function constructor(){};

var dialog = require('ti.webdialog');
function openUrl(event){
    var selectUrl = event.itemId;
    if (dialog.isSupported()) {
        dialog.open({
            url: selectUrl
        });
    }
}