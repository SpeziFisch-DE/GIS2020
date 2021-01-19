"use strict";
var Kapitelaufgabe3Script;
(function (Kapitelaufgabe3Script) {
    let buttonSubmit = document.getElementById("submit");
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
})(Kapitelaufgabe3Script || (Kapitelaufgabe3Script = {}));
//# sourceMappingURL=script.js.map