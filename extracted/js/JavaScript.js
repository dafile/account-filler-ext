// Simulate paste to trigger framework input detection (Vue 3, Element Plus, etc.)
function pasteFill(input, value) {
    var el = $(input)[0];
    el.focus();
    el.dispatchEvent(new Event('focus', { bubbles: true }));
    var nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeSetter.call(el, value);
    el.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertFromPaste',
        data: value
    }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
}

// Wait for JS framework (Vue/React/Angular) to bind event handlers, then fill
function waitForFrameworkAndFill(input, value, maxWait) {
    maxWait = maxWait || 5000;
    var el = $(input)[0];
    var start = Date.now();
    var timer = setInterval(function () {
        var hasFramework = el._vei || el.__vue || el._valueTracker || el.__reactFiber$;
        if (hasFramework || Date.now() - start > maxWait) {
            clearInterval(timer);
            pasteFill(input, value);
        }
    }, 100);
}

var num = 0;
chrome.storage.local.get(function (items) {
    //alert(items);

    for (key in items) {
        num++;
    }

})

var inputLength=0;
window.onload = function () {
    if (num == 0) { return; }
    inputLength = $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='image']").length;
    if (document.readyState=="complete")
    {
        loading();
    }
    else
    {
        document.onreadystatechange = function()
        {
      
            if (document.readyState == "complete")
            {
                new loading();
            }
        }
    }

     //loading();
    setInterval(function () {
        var newInputLength = $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='image']").length;
        if (newInputLength != inputLength)
        {
            try {
                inputLength = newInputLength;
                $(".my_accounts").remove();
                new loading();
            }
            catch (ex) {

            }
        }
      

      
    }, 1000);
 


}

function  loading()
{
    
   // alert(1);
    var storage = chrome.storage.local;
    window.onscroll = function (event) {
        setZuoBiao($(".my_accounts").prev());
    };


    $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='password'][type!='image']").focus(function () {
        if ($("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='image']").length < 2) {
            return;
        }
        var num = 0;
        $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='image']").each(
            function () {
                if ($(this).css("display") != "none") {
                    num++;
                }
            });
        if (num < 2) {
            return;
        }
       
        var input = $(this);
        var div_width = getWidth(input);
        var songt_size = "songt_size3";
        if (div_width < 145) { songt_size = "songt_size0"; }
        else if (div_width < 160) { songt_size = "songt_size1"; }
        else if (div_width < 180) { songt_size = "songt_size2"; }
        else if (div_width < 200) { songt_size = "songt_size3"; }
        else { songt_size = "songt_size4"; }

        $(".my_accounts").remove();
        var div = '<div class="my_accounts" style="height: auto;max-height:300px;  z-index: 9999999; "><ul>';// 以 HTML 创建新元素
        storage.get(['keyName', 'keyPhone', 'keyEmail', 'keyPwd', 'keyXingMing', 'keyNiCheng', 'keyCardNum', 'keyYouBian', 'keyDiZhi', 'keyQq', 'keyGsName'], function (items) {
            if (items.keyName) {
                for (var i = 0; i < items.keyName.length; i++) {
                    div += '<li class="' + songt_size + '">帐号：<b>' + items.keyName[i] + '</b></li> ';
                }
            }
            if (items.keyPhone) {
                for (var i = 0; i < items.keyPhone.length; i++) {
                    div += '<li class="' + songt_size + '">手机：<b>' + items.keyPhone[i] + '</b></li> ';
                }

            }
            if (items.keyEmail) {
                for (var i = 0; i < items.keyEmail.length; i++) {
                    div += '<li class="' + songt_size + '">邮箱：<b>' + items.keyEmail[i] + '</b></li> ';
                }

            }
            if (items.keyXingMing) {
                for (var i = 0; i < items.keyXingMing.length; i++) {
                    div += '<li class="' + songt_size + '">姓名：<b>' + items.keyXingMing[i] + '</b></li> ';
                }

            }
            if (items.keyNiCheng) {
                for (var i = 0; i < items.keyNiCheng.length; i++) {
                    div += '<li class="' + songt_size + '">昵称：<b>' + items.keyNiCheng[i] + '</b></li> ';
                }

            }
            if (items.keyCardNum) {
                for (var i = 0; i < items.keyCardNum.length; i++) {
                    div += '<li class="' + songt_size + '">身份证：<b>' + items.keyCardNum[i] + '</b></li> ';
                }

            }
            if (items.keyYouBian) {
                for (var i = 0; i < items.keyYouBian.length; i++) {
                    div += '<li class="' + songt_size + '">邮编：<b>' + items.keyYouBian[i] + '</b></li> ';
                }

            }
            if (items.keyDiZhi) {
                for (var i = 0; i < items.keyDiZhi.length; i++) {
                    div += '<li class="' + songt_size + '">地址：<b>' + items.keyDiZhi[i] + '</b></li> ';
                }

            }
            if (items.keyQq) {
                for (var i = 0; i < items.keyQq.length; i++) {
                    div += '<li class="' + songt_size + '">QQ：<b>' + items.keyQq[i] + '</b></li> ';
                }

            }
            if (items.keyGsName) {
                for (var i = 0; i < items.keyGsName.length; i++) {
                    div += '<li class="' + songt_size + '">公司：<b>' + items.keyGsName[i] + '</b></li> ';
                }

            }
            div += '</ul></div>';
            $(input).after(div);
            //$(".my_accounts").width(div_width);
            $(".my_accounts").css("position", "fixed");
            setZuoBiao($(input));
            //$(".my_accounts").css("top", Y + "px");
            //$(".my_accounts").css("left", X + "px");
            $(".my_accounts").show();
            $(".my_accounts").blur(function () { $(".my_accounts").remove() });
            $(".my_accounts ul li").click(function () {
                $(input).val($(this).find("b").eq(0).html());
                $(".my_accounts").remove();
            });
        });

        //div += '<li class="' + songt_size + '">帐号：<b>' + localStorage.getItem('name')+'</b></li> ';
        //div += '<li class="' + songt_size + '">手机号：<b>' + localStorage.getItem('phone') + '</b></li> ';
        //div += '<li class="' + songt_size + '">邮箱：<b>' + localStorage.getItem('email') + '</b></li> ';

    });
    $("input[type='password']").focus(function () {
       
        var input = $(this);
  
        var songt_size = "songt_size3";
        var div_width = getWidth(input);
        if (div_width < 145) { songt_size = "songt_size0"; }
        else if (div_width < 160) { songt_size = "songt_size1"; }
        else if (div_width < 180) { songt_size = "songt_size2"; }
        else if (div_width < 200) { songt_size = "songt_size3"; }
        else { songt_size = "songt_size4"; }

        $(".my_accounts").remove();
        var div = '<div class="my_accounts" style="height: auto; max-height:300px; z-index: 9999999; "><ul>';// 以 HTML 创建新元素
        storage.get(['keyPwd'], function (items) {
            if (items.keyPwd) {
                for (var i = 0; i < items.keyPwd.length; i++) {
                    var pwd = items.keyPwd[i];//abcdefg
                    div += '<li class="' + songt_size + '">密码：<b index="' + i + '"  >' + pwd.substr(0, 2) + '*****' + pwd.substr(pwd.length - 2, 2) + '</b></li> ';
                }
            }

            div += '</ul></div>';
            $(input).after(div);
           
            setZuoBiao($(input));
            //$(".my_accounts").css("top", Y + "px");
            //$(".my_accounts").css("left", X + "px");
            $(".my_accounts").show();
            $(".my_accounts").blur(function () { $(".my_accounts").remove() });
            $(".my_accounts ul li").click(function () {
                var index = $(this).find("b").eq(0).attr("index");
                storage.get(['keyPwd'], function (items) {
                    if (items.keyPwd) {
                        pasteFill(input, items.keyPwd[index]);

                    }
                });
                //$(input).val($(this).find("b").eq(0).attr("value"));
                $(".my_accounts").remove();
            });
        });



    });
    $("body").click(function () {
        if ($("input:focus").length == 0 && $("input[type='password']:focus").length == 0) {
            $(".my_accounts").remove();
        }



    });
    $("input[type='text']").blur();
    $("input[type='password']").blur();
    $(document).ready(function () {
        //alert($("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='password'][type!='image']").length);
        //alert($("input[type='password']").length);
        if ($("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='password'][type!='image']").length==1&&($("input[type='password']").length==1||$("input[type='password']").length==2))
        {
            storage.get(['keyName', 'keyPhone', 'keyEmail', 'keyPwd', 'keyXingMing', 'keyNiCheng', 'keyCardNum', 'keyYouBian', 'keyDiZhi', 'keyQq', 'keyGsName'], function (items) {
                if (items.keyPwd) {
                    $("input[type='password']").each(function () {
                        if ($(this).val() == "") { waitForFrameworkAndFill(this, items.keyPwd[0]); }
                    });

                }
          $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='password'][type!='image']").each(function () {
              var outerHTML = $(this).prop("outerHTML");
              insertLogin(outerHTML, $(this), items);
             
              

              outerHTML = $(this).prev().prop("outerHTML");
              insertLogin(outerHTML, $(this), items);
            
             
                        });
                  


                
           
            });
        }
        else
        {

            storage.get(['keyName', 'keyPhone', 'keyEmail', 'keyPwd', 'keyXingMing', 'keyNiCheng', 'keyCardNum', 'keyYouBian', 'keyDiZhi', 'keyQq', 'keyGsName'], function (items) {
                if (items.keyPwd) {
                    $("input[type='password']").each(function () {
                        if ($(this).val() == "") { waitForFrameworkAndFill(this, items.keyPwd[0]); }
                    });

                }
         
                    var num = 0;
                    $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='image']").each(
                        function () {
                            if ($(this).css("display") != "none") {
                                num++;
                            }
                        });
                    if (num > 1) {
                        $("input[type!='button'][type!='reset'][type!='submit'][type!='file'][type!='checkbox'][type!='radio'][type!='hidden'][type!='password'][type!='image']").each(function () {
                            var outerHTML = $(this).prop("outerHTML");
                            insert(outerHTML, $(this), items);
                           
                            outerHTML = $(this).prev().prop("outerHTML");
                            insert(outerHTML, $(this), items);
                            

                        });
                    }


          
      
            });
        }
     

    

    });
}
function getWidth(input) {

    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }

    var padding_left = $(input).css('padding-left');
    var padding_right = $(input).css('padding-right');
    var padding_bottom = $(input).css('padding-bottom');
    var padding_top = $(input).css('padding-top');
    if (padding_left.length > 2) {
        padding_left = padding_left.substr(0, padding_left.length - 2)
    }
    else {
        padding_left = 0;
    }
    if (padding_right.length > 2) {
        padding_right = padding_right.substr(0, padding_right.length - 2)
    }
    else {
        padding_right = 0;
    }

    if (padding_bottom.length > 2) {
        padding_bottom = padding_bottom.substr(0, padding_bottom.length - 2)
    }
    else {
        padding_bottom = 0;
    }
    if (padding_top.length > 2) {
        padding_top = padding_top.substr(0, padding_top.length - 2)
    }
    else {
        padding_top = 0;
    }
    var div_width = $(input).width() + parseInt(padding_left) + parseInt(padding_right);
    return div_width;

}

function setZuoBiao(input) {
    var scrollPos;
    if (window.pageYOffset) {
        scrollPos = window.pageYOffset;
    }
    else if (document.compatMode && document.compatMode != 'BackCompat')
    { scrollPos = document.documentElement.scrollTop; }
    else if (document.body) { scrollPos = document.body.scrollTop; }

    var padding_left = $(input).css('padding-left');
    var padding_right = $(input).css('padding-right');
    var padding_bottom = $(input).css('padding-bottom');
    var padding_top = $(input).css('padding-top');
    if (padding_left.length > 2) {
        padding_left = padding_left.substr(0, padding_left.length - 2)
    }
    else {
        padding_left = 0;
    }
    if (padding_right.length > 2) {
        padding_right = padding_right.substr(0, padding_right.length - 2)
    }
    else {
        padding_right = 0;
    }

    if (padding_bottom.length > 2) {
        padding_bottom = padding_bottom.substr(0, padding_bottom.length - 2)
    }
    else {
        padding_bottom = 0;
    }
    if (padding_top.length > 2) {
        padding_top = padding_top.substr(0, padding_top.length - 2)
    }
    else {
        padding_top = 0;
    }
    var div_width = $(input).width() + parseInt(padding_left) + parseInt(padding_right);

    var X = $(input).offset().left - document.body.scrollLeft;
    var Y = $(input).offset().top - scrollPos + $(input).height() + parseInt(padding_bottom) + parseInt(padding_top) + 2;
    $(".my_accounts").width(div_width);
    $(".my_accounts").css("position", "fixed");
    $(".my_accounts").css("top", Y + "px");
    $(".my_accounts").css("left", X + "px");
}

function insertLogin(outerHTML, input, items) {
    outerHTML = outerHTML.replace(/\s+/g, "");
    // alert(outerHTML); alert($(input).val());
     if ($(input).val() == "") {
    if (outerHTML.indexOf("用户名") > -1 || outerHTML.indexOf("帐号") > -1 || outerHTML.indexOf("会员名") > -1 || outerHTML.indexOf("会员ID") > -1) {
        waitForFrameworkAndFill(input, items.keyName[0]);
    }
    else if (outerHTML.indexOf("手机") > -1 || outerHTML.indexOf("电话") > -1) {
        waitForFrameworkAndFill(input, items.keyPhone[0]);
    }
    else if (outerHTML.indexOf("邮箱") > -1 || outerHTML.indexOf("邮件") > -1 || outerHTML.indexOf("电邮") > -1) {
        waitForFrameworkAndFill(input, items.keyEmail[0]);
    }
    else if (outerHTML.indexOf("姓") > -1) {
        waitForFrameworkAndFill(input, items.keyXingMing[0]);
    }
    else if (outerHTML.indexOf("昵称") > -1 || outerHTML.indexOf("网名") > -1) {
        waitForFrameworkAndFill(input, items.keyNiCheng[0]);
    }
    else if (outerHTML.indexOf("身份") > -1 || outerHTML.indexOf("证件") > -1) {
        waitForFrameworkAndFill(input, items.keyCardNum[0]);
    }
    else if (outerHTML.indexOf("邮编") > -1 || outerHTML.indexOf("邮政") > -1) {
        waitForFrameworkAndFill(input, items.keyYouBian[0]);
    }
    else if (outerHTML.indexOf("地址") > -1 || outerHTML.indexOf("住址") > -1) {
        waitForFrameworkAndFill(input, items.keyDiZhi[0]);
    }
    else if (outerHTML.indexOf("qq") > -1 || outerHTML.indexOf("QQ") > -1) {
        waitForFrameworkAndFill(input, items.keyQq[0]);
    }
    else if (outerHTML.indexOf("公司") > -1 || outerHTML.indexOf("单位") > -1) {
        waitForFrameworkAndFill(input, items.keyGsName[0]);
    }
    else
    {
        waitForFrameworkAndFill(input, items.keyName[0]);
    }
    }
}
function insert(outerHTML, input, items)
{
    outerHTML = outerHTML.replace(/\s+/g, "");
   // alert(outerHTML); alert($(input).val());
     if ($(input).val() == "") {
    if (outerHTML.indexOf("用户名") > -1 || outerHTML.indexOf("帐号") > -1 || outerHTML.indexOf("会员名") > -1 || outerHTML.indexOf("会员ID") > -1) {
        waitForFrameworkAndFill(input, items.keyName[0]);
    }
    else if (outerHTML.indexOf("手机") > -1 || outerHTML.indexOf("电话") > -1) {
        waitForFrameworkAndFill(input, items.keyPhone[0]);
    }
    else if (outerHTML.indexOf("邮箱") > -1 || outerHTML.indexOf("邮件") > -1 || outerHTML.indexOf("电邮") > -1) {
        waitForFrameworkAndFill(input, items.keyEmail[0]);
    }
    else if (outerHTML.indexOf("姓") > -1) {
        waitForFrameworkAndFill(input, items.keyXingMing[0]);
    }
    else if (outerHTML.indexOf("昵称") > -1 || outerHTML.indexOf("网名") > -1) {
        waitForFrameworkAndFill(input, items.keyNiCheng[0]);
    }
    else if (outerHTML.indexOf("身份") > -1 || outerHTML.indexOf("证件") > -1) {
        waitForFrameworkAndFill(input, items.keyCardNum[0]);
    }
    else if (outerHTML.indexOf("邮编") > -1 || outerHTML.indexOf("邮政") > -1) {
        waitForFrameworkAndFill(input, items.keyYouBian[0]);
    }
    else if (outerHTML.indexOf("地址") > -1 || outerHTML.indexOf("住址") > -1) {
        waitForFrameworkAndFill(input, items.keyDiZhi[0]);
    }
    else if (outerHTML.indexOf("qq") > -1 || outerHTML.indexOf("QQ") > -1) {
        waitForFrameworkAndFill(input, items.keyQq[0]);
    }
    else if (outerHTML.indexOf("公司") > -1 || outerHTML.indexOf("单位") > -1) {
        waitForFrameworkAndFill(input, items.keyGsName[0]);
    }
   }
}

