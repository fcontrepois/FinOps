$.index.open();

var dialog = require('ti.webdialog');

function followLink(event){
    var selectUrl = event.source.link;
    if (dialog.isSupported()) {
        dialog.open({
            url: selectUrl
        });
    }
}
