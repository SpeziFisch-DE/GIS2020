namespace Kapitelaufgabe3Script {
    let buttonSubmit: HTMLElement = document.getElementById("submit");
    let formData: FormData = new FormData(document.forms[0]);


    buttonSubmit.addEventListener("click", handleSubmit);
    async function handleSubmit(_event: Event): Promise<void> {
        let url: string = "https://hfugis2020.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        await fetch(url);
        buttonSubmit.innerHTML = "" + formData.get("Name");
    }
}