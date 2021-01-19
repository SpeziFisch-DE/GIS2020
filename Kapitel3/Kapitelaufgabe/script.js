"use strict";
var Kapitelaufgabe3Script;
(function (Kapitelaufgabe3Script) {
    function getSubpage() {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    if (getSubpage() == "index.html") {
        let buttonSubmit = document.getElementById("submit");
        let buttonSignIn = document.getElementById("tosignin");
        let buttonShow = document.getElementById("toshow");
        let responseDiv = document.getElementById("div");
        buttonSubmit.addEventListener("click", handleSubmit);
        async function handleSubmit(_event) {
            let formData = new FormData(document.forms[0]);
            let url = "https://hfugis2020.herokuapp.com";
            let query = new URLSearchParams(formData);
            url = url + "?" + query.toString();
            console.log(url);
            console.log(formData.get("Name"));
            await fetch(url).then(async function (response) {
                let responseText = await response.text();
                console.log(responseText);
                let answer = document.createElement("p");
                answer.innerText = responseText;
                responseDiv.appendChild(answer);
            });
        }
    }
    if (getSubpage() == "showusers.html") {
        let buttonShow = document.getElementById("show");
        let responseUsersDiv = document.getElementById("users");
        buttonShow.addEventListener("click", handleShow);
        async function handleShow(_event) {
            let formData = new FormData();
            let url = "https://hfugis2020.herokuapp.com";
            formData.append("task", "showusers");
            let query = new URLSearchParams(formData);
            url = url + "?" + query.toString();
            console.log(url);
            await fetch(url).then(async function (response) {
                let responseText = await response.text();
                responseUsersDiv.innerText = responseText;
            });
        }
    }
})(Kapitelaufgabe3Script || (Kapitelaufgabe3Script = {}));
//# sourceMappingURL=script.js.map