//var resetButton = document.querySelector('button.reset');
//var submitButton = document.querySelector('button.submit');

function deleteTd(td) {
    if ($(td).parent().parent().children().length == 1) {
        $(td).prev().children().first().val("");
        return;
    }
    //alert($(td).parent().parent().children().first().children().first().prop("outerHTML"));
    var rowspan = parseInt($(td).parent().parent().children().first().children().first().attr("rowspan")) - 1;
    //alert(rowspan);
    if (rowspan == NaN || rowspan.toString() == "NaN" || rowspan == isNaN) {
        alert("no");
        return;
    }
    if ($(td).prevAll().length == 1) {

        $(td).parent().parent().children().first().children().first().attr("rowspan", rowspan);
        $(td).parent().parent().children().first().children().last().attr("rowspan", rowspan);
        $(td).parent().remove();
    }
    else {
        var nameTd = $(td).prev().prev();
        var addTd = $(td).next();

        $(nameTd).attr("rowspan", rowspan);
        $(addTd).attr("rowspan", rowspan);

        //alert($(addTd).prop("outerHTML"));
        $(td).parent().next().children().first().before(nameTd);
        $(td).parent().next().children().last().after(addTd);
        $(td).parent().remove();
    }
}
var storage = chrome.storage.local;
loadChanges();

 
//submitButton.addEventListener('click', saveChanges);
//resetButton.addEventListener('click', reset);

function saveChanges() {
    var myName = $('.name');
    var myPhone = $('.phone');
    var myEmail = $('.email');
    var myXingMing = $('.xingMing');
    var myNiCheng = $('.niCheng');
    var myCardNum = $('.cardNum');
    var myYouBian = $('.youBian');
    var myDiZhi = $('.diZhi');
    var myQq = $('.qq');
    var myGsName = $('.gsName');
    var myPwd = $('.pwd');

    //var nameStr = myName.value;
    //var phoneStr = myPhone.value;
    //var emailStr = myEmail.value;
    //var pwdStr = myPwd.value;
    //if (!nameStr) {
    //    alert("空");
    //    return;
    //}

    var nameStr = new Array(); var phoneStr = new Array(); var emailStr = new Array(); var pwdStr = new Array();

    var num = 0;
    for (var i = 0; i < myName.length; i++) {
        if (myName.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myName.eq(i).val(), nameStr) > -1) { num++; continue; }
        nameStr[i-num] = myName.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myPhone.length; i++) {
        if (myPhone.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        myPhone.eq(i).css("border", "1px solid #bfbfbf");
        if (!(isValidPhone(myPhone.eq(i).val()))) { myPhone.eq(i).css("border", "1px solid #ff0000"); alert("手机号码格式不正确，请检查！"); return; }
        if (jQuery.inArray(myPhone.eq(i).val(), phoneStr) > -1) { num++; continue; }
        phoneStr[i - num] = myPhone.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myEmail.length; i++) {
        if (myEmail.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        myEmail.eq(i).css("border", "1px solid #bfbfbf");
        if (!(isValidEmail(myEmail.eq(i).val()))) { myEmail.eq(i).css("border", "1px solid #ff0000"); alert("邮箱号码格式不正确，请检查！"); return; }

        if (jQuery.inArray(myEmail.eq(i).val(), emailStr) > -1) { num++; continue; }
        emailStr[i - num] = myEmail.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myPwd.length; i++) {
        if (myPwd.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        myPwd.eq(i).css("border", "1px solid #bfbfbf");
        if (!(isValidPwd1(myPwd.eq(i).val()))) { myPwd.eq(i).css("border", "1px solid #ff0000"); alert("密码长度应为6-16位，请检查！"); return; }

        if (jQuery.inArray(myPwd.eq(i).val(), pwdStr) > -1) { num++; continue; }
        pwdStr[i - num] = myPwd.eq(i).val();
    }
    num = 0;
    var xingMingStr = new Array(); var niChengStr = new Array(); var cardNumStr = new Array(); var youBianStr = new Array();
    var diZhiStr = new Array(); var qqStr = new Array(); var gsNameStr = new Array();

    for (var i = 0; i < myXingMing.length; i++) {
        if (myXingMing.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myXingMing.eq(i).val(), xingMingStr) > -1) { num++; continue; }
        xingMingStr[i - num] = myXingMing.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myNiCheng.length; i++) {
        if (myNiCheng.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myNiCheng.eq(i).val(), niChengStr) > -1) { num++; continue; }
        niChengStr[i - num] = myNiCheng.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myCardNum.length; i++) {
        if (myCardNum.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myCardNum.eq(i).val(), cardNumStr) > -1) { num++; continue; }
        cardNumStr[i - num] = myCardNum.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myYouBian.length; i++) {
        if (myYouBian.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myYouBian.eq(i).val(), youBianStr) > -1) { num++; continue; }
        youBianStr[i - num] = myYouBian.eq(i).val();
    }
    num = 0;

    for (var i = 0; i < myDiZhi.length; i++) {
        if (myDiZhi.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myDiZhi.eq(i).val(), diZhiStr) > -1) { num++; continue; }
        diZhiStr[i - num] = myDiZhi.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myQq.length; i++) {
        if (myQq.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myQq.eq(i).val(), qqStr) > -1) { num++; continue; }
        qqStr[i - num] = myQq.eq(i).val();
    }
    num = 0;
    for (var i = 0; i < myGsName.length; i++) {
        if (myGsName.eq(i).val().replace(/\s+/g, "") == "") { num++; continue; }
        if (jQuery.inArray(myGsName.eq(i).val(), gsNameStr) > -1) { num++; continue; }
        gsNameStr[i - num] = myGsName.eq(i).val();
    }
  

    if (nameStr.length > 0) { storage.set({ 'keyName': nameStr }, function () { }); } else { storage.remove('keyName', function (items) { }) }
 
    if (phoneStr.length > 0) { storage.set({ 'keyPhone': phoneStr }, function () { }); } else { storage.remove('keyPhone', function (items) { }) }
 
    if (emailStr.length > 0) { storage.set({ 'keyEmail': emailStr }, function () { }); } else { storage.remove('keyEmail', function (items) { }) }
    if (pwdStr.length > 0) { storage.set({ 'keyPwd': pwdStr }, function () { }); } else { storage.remove('keyPwd', function (items) { }) }

    if (xingMingStr.length > 0) { storage.set({ 'keyXingMing': xingMingStr }, function () { }); } else { storage.remove('keyXingMing', function (items) { }) }
    if (niChengStr.length > 0) { storage.set({ 'keyNiCheng': niChengStr }, function () { }); } else { storage.remove('keyNiCheng', function (items) { }) }
    if (cardNumStr.length > 0) { storage.set({ 'keyCardNum': cardNumStr }, function () { }); } else { storage.remove('keyCardNum', function (items) { }) }
    if (youBianStr.length > 0) { storage.set({ 'keyYouBian': youBianStr }, function () { }); } else { storage.remove('keyYouBian', function (items) { }) }
    if (diZhiStr.length > 0) { storage.set({ 'keyDiZhi': diZhiStr }, function () { }); } else { storage.remove('keyDiZhi', function (items) { }) }
    if (qqStr.length > 0) { storage.set({ 'keyQq': qqStr }, function () { }); } else { storage.remove('keyQq', function (items) { }) }
    if (gsNameStr.length > 0) { storage.set({ 'keyGsName': gsNameStr }, function () { }); } else { storage.remove('keyGsName', function (items) { }) }
 

    alert("保存完毕！");
    location.href = document.URL;
}

function loadChanges() {
     
   
    storage.get(['keyName', 'keyPhone', 'keyEmail', 'keyPwd', 'keyXingMing', 'keyNiCheng', 'keyCardNum', 'keyYouBian', 'keyDiZhi', 'keyQq', 'keyGsName'], function (items) {
 
        getTr(items.keyName, 'name', '用户名');
        getTr(items.keyPhone, 'phone', '手机号');
        getTr(items.keyEmail, 'email', '邮箱');
        getTr(items.keyPwd, 'pwd', '密码');
 
        getTr(items.keyXingMing, 'xingMing', '姓名');
        getTr(items.keyNiCheng, 'niCheng', '昵称');
        getTr(items.keyCardNum, 'cardNum', '身份证');
        getTr(items.keyYouBian, 'youBian', '邮编');
        getTr(items.keyDiZhi, 'diZhi', '地址');
        getTr(items.keyQq, 'qq', 'QQ');
        getTr(items.keyGsName, 'gsName', '公司名');
        $(".AddButton").click(function () {

            var clas = $(this).parent().prev().prev().children().first().attr("class");
            var tr = ' <tr> <td class="TdSize"><input type="text" class="' + clas + '" placeholder="内容为空则不保存该项" value=""></td> <td id="RemoveExt" class="RemoveButton">X</td></tr>';
            // alert($(this).parent().parent().parent().children().last().prop("outerHTML"));
            $(this).parent().parent().parent().children().last().after(tr);

            var rowspan = parseInt($(this).parent().attr("rowspan")) + 1;
            $(this).parent().attr("rowspan", rowspan)
            $(this).parent().prev().prev().prev().attr("rowspan", rowspan)
            $(".RemoveButton").unbind("click");
            //submitButton.removeEventListener('click', saveChanges);
            //submitButton.removeEventListener('click', reset);
            //submitButton.addEventListener('click', saveChanges);
            //resetButton.addEventListener('click', reset);
            $(".submit").unbind("click");
            $(".reset").unbind("click");
            $(".reset").click(function () { reset() });
            $(".submit").click(function () { saveChanges() });

            $(".RemoveButton").click(function () {
                deleteTd($(this));

            });
        });
        $(".RemoveButton").click(function () {
            deleteTd($(this));
        });
 
    });
    $(".submit").unbind("click");
    $(".reset").unbind("click");
    $(".reset").click(function () { reset() });
    $(".submit").click(function () { saveChanges() });
}

function reset() {
    if(confirm("是否清空？"))
    {
        storage.remove(['keyName', 'keyPhone', 'keyEmail', 'keyPwd', 'keyXingMing', 'keyNiCheng', 'keyCardNum', 'keyYouBian', 'keyDiZhi', 'keyQq', 'keyGsName'], function (items) {
            alert("清空完毕！");
            location.href = document.URL;
        });
    }

 
    //myName.value = '';
    //myPhone.value = '';
    //myEmail.value = '';
    //myPwd.value = '';
}

function clear()
{
    storage.clear(function () { });
}
function getTr(key,clas,tdName)
{
    var type = "text";
    if (clas=="pwd")
    {
        type = "password";
    }
    var tr = ' <tr><td class="td_ziDuan" rowspan="';
    if (key) {
 
        tr += key.length + '">' + tdName + ' </td><td class="TdSize"><input type="' + type + '" class="size ' + clas + '" placeholder="内容为空则不保存该项" value="' + key[0] + '"></td><td id="RemoveExt" class="RemoveButton">X</td><td rowspan="' + key.length + '"><button id="AddExt" class="AddButton">新增一个</button> </td></tr>';
        for (var i = 1; i < key.length; i++) {
  
            tr += '<tr> <td class="TdSize"><input type="' + type + '" class="size ' + clas + '" placeholder="" value="' + key[i] + '"></td> <td id="RemoveExt" class="RemoveButton">X</td></tr>';
        }

   
    }
    else {
        tr += '1">' + tdName + ' </td><td class="TdSize"><input type="' + type + '" class="size ' + clas + '" placeholder="内容为空则不保存该项" value=""></td><td id="RemoveExt" class="RemoveButton">X</td><td rowspan="1"><button id="AddExt" class="AddButton">新增一个</button> </td></tr>';
    }
    $("#"+clas).html(tr);
   
}


function isValidPwd1(pwd1) {
    if (pwd1 == "") {

        return false;
    }
    else {
        if (pwd1.length < 6 || pwd1.length > 16) {

            return false;
        }
        else {
            return true;
        }

    }
}

function isValidPwd2(pwd2) {
    if (pwd2 == "") {

        return false;
    }
    else {
        if (pwd2.length < 6 || pwd2.length > 16) {

            return false;
        }
        else {
            var pwd1 = $("#pwd1").val();
            if (pwd2 != pwd1) {
                return false;
            }
            else {
                return true;
            }
        }

    }
}

function isValidName(name) {
    if (name == "") {

        return false;
    }
    else {

        name = name.replace(/\s+/g, "");
        if (name == "") {

            return false;
        }
        else {
            if (name.length < 2  ) {

                return false;
            }
            else {
                return true;
            }

        }
    }

}



function isValidPhone(phone) {
    if (phone == "") {

        return false;
    }
    else {

        phone = phone.replace(/\s+/g, "");
        if (phone.length != 11) {

            return false;
        }

        else {


            if (phone.search(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})(8869[0-7]{1})|(8526[0-7]{1})||(18[0-9]{1}))+\d{8})$/) != -1) {

                redflag = 0;
                return true;

            }

            else {



                redflag = 1;

                return false;

            }

        }
    }
}
function isValidEmail(email) {

    if (email.search(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/) != -1) {

        redflag = 0;
        return true;

    }

    else {

        redflag = 1;
        return false;

    }
}
