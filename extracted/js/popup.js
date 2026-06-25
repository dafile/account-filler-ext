 
 
var storage = chrome.storage.local;
 
storage.get(function (items) {
    //alert(items);
    var num = 0;
    for (key in items) {
        num++;
    }
    if (num == 0) { $(".lead").html("您还未设置你的账号信息！"); }
})
 
 