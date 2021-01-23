namespace Kapitelaufgabe3Script {

    function getSubpage(): string {
        return window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1);
    }
    if (getSubpage() == "index.html") { // script for registration-Page
        let buttonSubmit: HTMLElement = document.getElementById("submit");
        let buttonSignIn: HTMLElement = document.getElementById("tosignin");
        let buttonShow: HTMLElement = document.getElementById("toshow");
        let responseDiv: HTMLElement = document.getElementById("div");


        buttonSubmit.addEventListener("click", handleSubmit);
        async function handleSubmit(_event: Event): Promise<void> {

            let formData: FormData = new FormData(document.forms[0]); //create and fill formData
            let url: string = "https://hfugis2020.herokuapp.com";
            formData.append("task", "register");
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString(); //create GET-Url

            console.log(url);

            await fetch(url).then(async function (response: Response): Promise<void> {
                let responseText: string = await response.text();
                console.log(responseText);
                let answer: HTMLElement = document.createElement("p");
                answer.innerText = responseText;
                responseDiv.appendChild(answer);
            }
            );

        }

        //Buttons to linked Sub-Pages
        buttonShow.addEventListener("click", handleToShow);
        function handleToShow(_event: Event): void {
            window.open("showusers.html", "_self");
        }

        buttonSignIn.addEventListener("click", handleToSignin);
        function handleToSignin(_event: Event): void {
            window.open("signin.html", "_self");
        }
    }
    if (getSubpage() == "showusers.html") { //Script for Users-Page
        let buttonShow: HTMLElement = document.getElementById("show");
        let buttonSignIn: HTMLElement = document.getElementById("tosignin");
        let buttonRegister: HTMLElement = document.getElementById("toregister");
        let responseUsersDiv: HTMLElement = document.getElementById("users");

        buttonShow.addEventListener("click", handleShow);
        async function handleShow(_event: Event): Promise<void> {

            let formData: FormData = new FormData(); //create and fill formData
            let url: string = "https://hfugis2020.herokuapp.com";
            formData.append("task", "showusers");
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString(); //create GET-Url

            console.log(url);

            await fetch(url).then(async function (response: Response): Promise<void> {
                let responseText: string = await response.text();
                responseUsersDiv.innerHTML = responseText;
            }
            );
        }

        //Buttons to linked Sub-Pages
        buttonRegister.addEventListener("click", handleToRegister);
        function handleToRegister(_event: Event): void {
            window.open("index.html", "_self");
        }

        buttonSignIn.addEventListener("click", handleToSignin);
        function handleToSignin(_event: Event): void {
            window.open("signin.html", "_self");
        }
    }
    if (getSubpage() == "signin.html") { //Script for log in Page
        let buttonSignin: HTMLElement = document.getElementById("signin");
        let buttonShow: HTMLElement = document.getElementById("toshow");
        let buttonRegister: HTMLElement = document.getElementById("toregister");
        let responseSignDiv: HTMLElement = document.getElementById("signdiv");

        buttonSignin.addEventListener("click", handleSignin);
        async function handleSignin(_event: Event): Promise<void> {

            let formData: FormData = new FormData(document.forms[0]);
            let url: string = "https://hfugis2020.herokuapp.com";
            formData.append("task", "signin");
            let query: URLSearchParams = new URLSearchParams(<any>formData);
            url = url + "?" + query.toString(); //create GET-Url

            console.log(url);

            await fetch(url).then(async function (response: Response): Promise<void> {
                let responseText: string = await response.text();
                responseSignDiv.innerText = responseText;
            }
            );
        }

        //Buttons to linked Sub-Pages
        buttonRegister.addEventListener("click", handleToRegister);
        function handleToRegister(_event: Event): void {
            window.open("index.html", "_self");
        }

        buttonShow.addEventListener("click", handleToShow);
        function handleToShow(_event: Event): void {
            window.open("showusers.html", "_self");
        }
    }


}