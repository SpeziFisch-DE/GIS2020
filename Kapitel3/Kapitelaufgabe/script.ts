namespace Kapitelaufgabe3Script {

    function getSubpage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    if (getSubpage() == "index.html") {
        let buttonSubmit: HTMLElement = document.getElementById("submit");
        let buttonSignIn: HTMLElement = document.getElementById("tosignin");
        let buttonShow: HTMLElement = document.getElementById("toshow");
        let responseDiv: HTMLElement = document.getElementById("div");


        buttonSubmit.addEventListener("click", handleSubmit);
        async function handleSubmit(_event: Event): Promise<void> {
            let formData: FormData = new FormData(document.forms[0]);
            let url: string = "https://hfugis2020.herokuapp.com";
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString();
            console.log(url);
            console.log(formData.get("Name"));
            await fetch(url).then(async function (response: Response): Promise<void> {
                let responseText: string = await response.text();
                console.log(responseText);
                let answer: HTMLElement = document.createElement("p");
                answer.innerText = responseText;
                responseDiv.appendChild(answer);
            }
            );

        }
    }
    if (getSubpage() == "showusers.html"){
        let buttonShow: HTMLElement = document.getElementById("show");
        let responseUsersDiv: HTMLElement = document.getElementById("users");

        buttonShow.addEventListener("click", handleShow);
        async function handleShow(_event: Event): Promise<void> {
            let formData: FormData = new FormData();
            let url: string = "https://hfugis2020.herokuapp.com";
            formData.append("task", "showusers");
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString();
            console.log(url);
            await fetch(url).then(async function (response: Response): Promise<void> {
                let responseText: string = await response.text();
                responseUsersDiv.innerText = responseText;
            }
            );
        }
    }


}