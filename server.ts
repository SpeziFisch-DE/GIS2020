import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_1Server {
    console.log("Starting server");

    interface MyInput {
        Name: string;
        Nachname: string;
        email: string;
        Adresse: string;
        Passwort: string;
        task: string;
    }

    interface User {
        Name: string;
        Nachname: string;
        email: string;
        Adresse: string;
        Passwort: string;
        //[type: string]: string | string[];
    }

    function inputUser(_input: MyInput): User {
        let myUser: User;
        myUser.Name = _input.Name;
        myUser.Nachname = _input.Nachname;
        myUser.email = _input.email;
        myUser.Adresse = _input.Adresse;
        myUser.Passwort = _input.Passwort;
        return myUser;
    }

    let users: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let databaseUrl: string = "mongodb+srv://Fabian:Fabian@specificcluster.n4qe3.mongodb.net/Test?retryWrites=true&w=majority";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(_port);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        users = mongoClient.db("Test").collection("users");
        console.log("Database connected: " + users != undefined);
    }

    function storeUser(_user: User): void {
        users.insertOne(_user);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function checkUser(_user: User): Promise<boolean> {
        let newUser: User = JSON.parse(JSON.stringify(await users.findOne({ "email": _user.email })));
        return _user.email == newUser.email;
    }
    async function checkPassword(_user: MyInput): Promise<boolean> {
        let newUser: User = JSON.parse(JSON.stringify(await users.findOne({ "Passwort": _user.Passwort, "email": _user.email })));
        return (_user.email == newUser.email && _user.Passwort == newUser.Passwort);
    }
    async function getUsers(): Promise<string> {
        let returnString: string = "";

        let myUsers: User[] = JSON.parse(JSON.stringify(await users.find()));
        for (let i: number = 0; myUsers.length; i++) {
            returnString = returnString + "<p>" + myUsers[i].Name + " " + myUsers[i].Nachname + "</p></br>";
        }

        return returnString;
    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let q: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        console.log(q.search);
        let jsonString: string = JSON.stringify(q.query);
        let input: MyInput = JSON.parse(jsonString);
        if (input.task == "register") {
            let user: User;
            user.Name = input.Name;
            user.Nachname = input.Nachname;
            user.email = input.email;
            user.Adresse = input.Adresse;
            user.Passwort = input.Passwort;
            if (!(await checkUser(user).catch(() => {
                console.log("Check failed!");
            }))) {
                storeUser(user);
                _response.write("user created!");
                _response.end();
            } else {
                _response.write("user already exists!");
                _response.end();
            }
        } else if (input.task == "showusers") {
            let responseString: string | void;
            responseString = (await getUsers().catch(() => {
                console.log("failed!");
                responseString = "Failed to load users!";
            }));
            _response.write(responseString);
        } else if (input.task == "signin") {
            if ((await checkPassword(input).catch(() => {
                console.log("Sign in failed!");
            }))) {
                _response.write("Sign in sucessful!");
                _response.end();
            } else {
                _response.write("Sign in unsucessful!");
                _response.end();
            }
        } else {
            _response.write("something went wrong!");
            _response.end();
        }
    }
}