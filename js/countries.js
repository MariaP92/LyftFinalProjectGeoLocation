"use strict";
let appCountry = {

    init: function () {
        $("#peru").click(function () {
            $("#cod").val("+51");
        });
        $("#mexico").click(function () {
            $("#cod").val("+52");
        });
        $("#chile").click(function () {
            $("#cod").val("+56");
        });
        $("#generateCode").click(function () {
            let textboxPhone = document.getElementById("telC");
            let modalBody= document.getElementById("modalBody");
            if (textboxPhone.value != "") {
                modalBody.innerHTML = "";
                let randomCode = "LAB-" + appCountry.makeid();
                localStorage.setItem(textboxPhone.value, randomCode);
                let code = document.createTextNode("your code is: " + randomCode);
                let pa = document.createElement("p");
                pa.appendChild(code);
                modalBody.appendChild(pa);
                $("#modalCode").modal();
                $("#next").show();

            }
            else {
                $("#modalError").modal();
            }
        });
    },
    makeid: function () {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

$(document).ready(appCountry.init);
