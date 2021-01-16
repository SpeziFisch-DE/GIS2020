"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kapitelaufgabe3Script = void 0;
var Kapitelaufgabe3Script;
(function (Kapitelaufgabe3Script) {
    let buttonSubmit = document.getElementById("submit");
    let formData = new FormData(document.forms[0]);
    buttonSubmit.addEventListener("click", handleSubmit);
    function handleSubmit(_event) {
        console.log(formData.get("Name"));
    }
})(Kapitelaufgabe3Script = exports.Kapitelaufgabe3Script || (exports.Kapitelaufgabe3Script = {}));
//# sourceMappingURL=script.js.map