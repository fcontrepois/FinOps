$.index.open();

function followLink(event){
    var selectUrl = event.source.link;
    Ti.Platform.openURL(selectUrl);
}
