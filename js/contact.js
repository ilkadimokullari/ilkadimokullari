$(document).ready(function() {
    if($('[type="phone"]').length>0){
        $('[type="phone"]').on("keypress keyup", function(event){
            if(event.which != 8 && isNaN(String.fromCharCode(event.which)) || $(this).val().length>16){
                event.preventDefault();
            }
        });
        if($(window).width()>900){
            $('[type="phone"]').mask("0 (999) 999-9999");
        }
    }
    if($('[data-style]').length>0){
        $('[data-style]').each(function(){
            $(this).attr("style", $(this).data("style"));
        });
    }
    $(".textOnly").on("keypress keyup", function(evt){
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (((charCode <= 93 && charCode >= 65) || (charCode <= 122 && charCode >= 97) || charCode == 8) || charCode == 350 || charCode == 351 || charCode == 32 || charCode == 304 || charCode == 286 || charCode == 287 || charCode == 231 || charCode == 199 || charCode == 305 || charCode == 214 || charCode == 246 || charCode == 220 || charCode == 252) {
            return true;
        }
        return false;
    });
    $("input,textarea").keyup(function(){
        var $this = $(this),
            $type = $this.attr("type"),
            $val = $this.val();
        
        if($type == "text"){
            valText($val)?$this.removeClass("formError"):$this.addClass("formError");
        }else if($type == "phone"){
            valTel($val)?$this.removeClass("formError"):$this.addClass("formError");
        }else if($type == "email"){
            valMail($val)?$this.removeClass("formError"):$this.addClass("formError");
            clrInput($this);
        }
    });
});

function contactForm(){
    var formDiv = $("#contact"),
        formName = formDiv.find("#name").val(),
        formMail = formDiv.find("#email").val(),
        formSubject = formDiv.find("#subject").val(),
        formMsg = formDiv.find("#comments").val();

    $(".sendingGlow").addClass("active");

    formDiv.find("input, textarea").each(function(){
        if($(this).val().length<1 && !$(this).hasClass("g-recaptcha-response")){
            $(this).addClass("formError");
        }
    });

    if (captchaControl()) {
        if (formDiv.find(".formError").length > 0) {
            $(".sendingGlow").removeClass("active");
            $.fancybox.open('<div class="message"><p>Boş alanlar mevcut.</p></div>');
        } else {
            $.ajax({
                type: "POST",
                url: "/WS_Forms.asmx/IletisimFormGonder",
                data: "{txtName:'" + formName + "',txtEmail:'" + formMail + "',txtSubject:'" + formSubject + "',txtMsg:'" + formMsg + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    setTimeout(function () {
                        $.fancybox.close();
                        window.location.href = "/Tesekkurler";
                    }, 2500);
                },
                error: function (response) {
                    console.log(response);
                    $(".sendingGlow").removeClass("active");
                    $.fancybox.open('<div class="message"><p>Bir hata oluştu.</p></div>');
                }
            });
        }
    } else {
        $(".sendingGlow").removeClass("active");
        $.fancybox.open('<div class="message"><p>Lütfen doğrulamayı boş bırakmayın.</p></div>');
    }

}

function registerForm(){
    var formDiv = $(".register-form"),
        formName = formDiv.find("#name").val(),
        formMail = formDiv.find("#email").val(),
        formPhone = formDiv.find("#phone").val();

    $(".sendingGlow").addClass("active");

    formDiv.find("input, textarea").each(function(){
        if($(this).val().length<1 && !$(this).hasClass("g-recaptcha-response")){
            $(this).addClass("formError");
        }
    });

    if (captchaControl()) {
        if (formDiv.find(".formError").length > 0) {
            $(".sendingGlow").removeClass("active");
            $.fancybox.open('<div class="message"><p>Boş alanlar mevcut.</p></div>');
        } else {
            $.ajax({
                type: "POST",
                url: "/WS_Forms.asmx/registerForm",
                data: "{txtName:'" + formName + "',txtEmail:'" + formMail + "',txtPhone:'" + formPhone + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    setTimeout(function () {
                        $.fancybox.close();
                        window.location.href = "/Tesekkurler";
                    }, 2500);
                },
                error: function (response) {
                    console.log(response);
                    $(".sendingGlow").removeClass("active");
                    $.fancybox.open('<div class="message"><p>Bir hata oluştu.</p></div>');
                }
            });
        }
    } else {
        $(".sendingGlow").removeClass("active");
        $.fancybox.open('<div class="message"><p>Lütfen doğrulamayı boş bırakmayın.</p></div>');
    }

}

function basvuruForm(){
    var formDiv = $(".basvuruForm"),
        formName = formDiv.find("#txtName").val(),
        formMail = formDiv.find("#txtEmail").val(),
        formPhone = formDiv.find("#txtPhone").val(),
        formDate = formDiv.find("#txtDate").val()>0?formDiv.find("#txtDate").val():"",
        formSchool = formDiv.find("#txtSchool").val();

    $(".sendingGlow").addClass("active");

    formDiv.find("input, textarea").each(function(){
        if($(this).val().length<1 && !$(this).hasClass("g-recaptcha-response") && !$(this).is("#txtDate") && !$(this).attr("name")=="btnTeklifFormu"){
            $(this).addClass("formError");
        }
    });

    if (captchaControl()) {
        if (formDiv.find(".formError").length > 0) {
            $(".sendingGlow").removeClass("active");
            $.fancybox.open('<div class="message"><p>Boş alanlar mevcut.</p></div>');
        } else {
            $.ajax({
                type: "POST",
                url: "/WS_Forms.asmx/BasvuruFormGonder",
                data: "{txtName:'" + formName + "',txtEmail:'" + formMail + "',txtPhone:'" + formPhone + "',txtDate:'" + formDate + "',txtSchool:'" + formSchool + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    setTimeout(function () {
                        $.fancybox.close();
                        window.location.href = "/Tesekkurler";
                    }, 2500);
                },
                error: function (response) {
                    console.log(response);
                    $(".sendingGlow").removeClass("active");
                    $.fancybox.open('<div class="message"><p>Bir hata oluştu.</p></div>');
                }
            });
        }
    } else {
        $(".sendingGlow").removeClass("active");
        $.fancybox.open('<div class="message"><p>Lütfen doğrulamayı boş bırakmayın.</p></div>');
    }

}

function cvFormGonder(){
    var formDiv = $(".contact-form"),
        formName = formDiv.find("#txtName").val(),
        formMail = formDiv.find("#txtEmail").val(),
        formPhone = formDiv.find("#txtPhone").val(),
        formPozisyon = formDiv.find("#txtPozisyon").val(),
        formFile = formDiv.find("#txtFile");

    $(".sendingGlow").addClass("active");

    formDiv.find("input, textarea, select").each(function(){
        if($(this).val().length<1 && !$(this).hasClass("g-recaptcha-response") && !$(this).is("#txtFile")){
            $(this).addClass("formError");
        }
    });

    var data = new FormData();

    if (captchaControl()) {
        if (formDiv.find(".formError").length > 0) {
            $(".sendingGlow").removeClass("active");
            $.fancybox.open('<div class="message"><p>Boş alanlar mevcut.</p></div>');
        } else {

            var files = formFile.get(0).files;
            if (files.length > 0) {
                data.append("UploadedFile", files[0]);
            }
            
            $.ajax({
                type: "POST",
                url: "/WS_Forms.asmx/DosyaKaydet",
                data: data,
                contentType: false,
                processData: false,
                success: function () {
                    $.ajax({
                        type: "POST",
                        url: "/WS_Forms.asmx/cvFormGonder",
                        data: "{txtName:'" + formName + "',txtEmail:'" + formMail + "',txtPhone:'" + formPhone + "',txtPozisyon:'" + formPozisyon + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function () {
                            setTimeout(function () {
                                $.fancybox.close();
                                window.location.href = "/Tesekkurler";
                            }, 2500);
                        },
                        error: function (response) {
                            console.log(response);
                            $(".sendingGlow").removeClass("active");
                            $.fancybox.open('<div class="message"><p>Bir hata oluştu.</p></div>');
                        }
                    });
                },
                error: function (response) {
                    console.log(response);
                    $(".sendingGlow").removeClass("active");
                    $.fancybox.open('<div class="message"><p>Bir hata oluştu.</p></div>');
                }
            });

        }
    } else {
        $(".sendingGlow").removeClass("active");
        $.fancybox.open('<div class="message"><p>Lütfen doğrulamayı boş bırakmayın.</p></div>');
    }

}

function captchaControl() {
    if ($(".g-recaptcha").length>0) {
        if (grecaptcha.getResponse().length > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};


function valMail(t) {
    var rgx = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return rgx.test(t);
};

function valName(t) {
    var rgx = /^[a-zA-Z\ş\ç\ö\ğ\ü\ı\Ş\Ç\Ö\Ğ\Ü\İ ]+$/gmi;
    return rgx.test(t);
}

function valTel(t) {
    var rgx = /[0-9-()+]{3,20}/m;
    return rgx.test(t);
};

function valText(t) {
    return t.length > 0;
};

function clrInput(e) {
    var charMap = { "Ç": "c", "Ö": "o", "Ş": "s", "İ": "i", I: "i", "Ü": "u", "Ğ": "g", "ç": "c", "ö": "o", "ş": "s", "ı": "i", "ü": "u", "ğ": "g" };
    var str = e.val();
    strArr = str.split('');
    for (var i = 0, len = strArr.length; i < len; i++) {
        strArr[i] = charMap[strArr[i]] || strArr[i];
    }
    str = strArr.join('');
    var clrStr = str.replace(" ", "").toLowerCase();
    e.val(clrStr);
}

function openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }