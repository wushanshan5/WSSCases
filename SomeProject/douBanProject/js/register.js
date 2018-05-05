window.onload = function () {
    var protocol = document.getElementsByClassName("protocol")[0];
    var close = protocol.getElementsByClassName("close")[0];
    var btn = protocol.getElementsByClassName("protocol-button")[0];
    close.onclick = function () {
        protocol.style.display = "none";
    }
    btn.onclick = function () {
        protocol.style.display = "none";
    }
    var inp2 = document.getElementsByClassName("inp2")[0];
    var inp3 = document.getElementsByClassName("inp3")[0];
    var inp4 = document.getElementsByClassName("inp4")[0];
    inp2.onfocus = function () {
        if(this.value == "") {
            this.nextElementSibling.className = "regular-right";
            this.nextElementSibling.nextElementSibling.className = "regular-font-right";
            this.nextElementSibling.nextElementSibling.innerHTML = "最少包含大小写字母最少八个字符，区分大小写";
        }
    }
    inp2.onblur = function () {
        if(this.value == "") {
            this.nextElementSibling.nextElementSibling.className = "regular-font-error";
            this.nextElementSibling.className = "regular-error";
            this.nextElementSibling.nextElementSibling.innerHTML = "密码不能为空";
        } else if(/[a-z]{1,}[A-Z]{1,}/.test(this.value)) {
            this.nextElementSibling.className = "";
            this.nextElementSibling.nextElementSibling.innerHTML = "";
        } else {
            this.nextElementSibling.className = "regular-error";
            this.nextElementSibling.nextElementSibling.className = "regular-font-error";
            this.nextElementSibling.nextElementSibling.innerHTML = "格式不正确";
        }
    }
    inp3.onfocus = function () {
        if(this.value == "") {
            this.nextElementSibling.className = "regular-right";
            this.nextElementSibling.nextElementSibling.className = "regular-font-right";
            this.nextElementSibling.nextElementSibling.innerHTML = "中、英文皆可，最长十四个英文或七个汉字，";
        }
    }
    inp3.onblur = function () {
        if(this.value == "") {
            this.nextElementSibling.nextElementSibling.className = "regular-font-error";
            this.nextElementSibling.className = "regular-error";
            this.nextElementSibling.nextElementSibling.innerHTML = "名号不能为空";
        } else {
            this.nextElementSibling.className = "";
            this.nextElementSibling.nextElementSibling.innerHTML = "";
        }
    }
    inp4.onblur = function () {
        if(this.value == "") {
            this.nextElementSibling.nextElementSibling.nextElementSibling.className = "regular-font-error";
            this.nextElementSibling.nextElementSibling.className = "regular-error";
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "验证码不能为空";
        } else {
            this.nextElementSibling.nextElementSibling.className = "";
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
        }
    }
}