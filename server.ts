import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace P_3_1Server {
    console.log("Starting server");

    interface User {
        Name: string;
        Nachname: string;
        email: string;
        Adresse: string;
        Passwort: string;
        //[type: string]: string | string[];
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
        let newUser: User;
        try {
            newUser = await users.findOne({ "email": _user.email });
        } catch (error) {
            console.log(error.stack);
        }
        return _user.email == newUser.email;
    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let q: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        console.log(q.host);
        console.log(q.pathname);
        console.log(q.search);
        let jsonString: string = JSON.stringify(q.query);
        let user: User = JSON.parse(jsonString);
        if (!(await checkUser(user))) {
            storeUser(user);
            _response.write("user created!");
            _response.end();
        } else {
            _response.write("user already exists!");
            _response.end();
        }
    }
}