namespace Kapitelaufgabe3Script {
    let htmlDIV: HTMLElement = document.getElementById("div");
    let buttonSubmit: HTMLElement = document.getElementById("submit");
    let formData: FormData = new FormData(document.forms[0]);


    buttonSubmit.addEventListener("click", handleSubmit);
    async function handleSubmit(_event: Event): Promise<void> {
        let url: string = "https://hfugis2020.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        await fetch(url).then(async function(response: Response): Promise<void> {
            let responseText: string = await response.text();
            console.log(responseText);
        }
        );

    }
}