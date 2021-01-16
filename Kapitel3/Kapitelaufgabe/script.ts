export namespace Kapitelaufgabe3Script {
    let buttonSubmit: HTMLElement = document.getElementById("submit");
    let formData: FormData = new FormData(document.forms[0]);

    buttonSubmit.addEventListener("click", handleSubmit);
    function handleSubmit(_event: Event): void {
        console.log(formData.get("Name"));
    }

}