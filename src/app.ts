import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";

import "reflect-metadata"
import { buildSchema } from "type-graphql";

import auth from "./handlers/authHandler"
import DB from "./db/data-source";
import { UserResolver } from "./resolvers/userResolver";


// init graphql
const main = async () => {
    const schema = await buildSchema({
        resolvers: [UserResolver,],
        emitSchemaFile: true,
        validate: false
    })

    // establish the database connection
    DB.initialize()
        .then(() => {
            console.log("Connected to the database")
        }).catch(err => {
            console.log("Error connecting to the database", err)
        })

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
    });

    const app = express();

    const port = 3000; // default port to listen

    // Configure Express to use EJS
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    await server.start();
    server.applyMiddleware({ app })

    // start the express server
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`🚀 Server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`)
    });


}

main().catch((error) => {
    console.log(error, 'error');
});


// define a route handler for the default home page
// app.get("/", (req, res) => {
//     // render the index template
//     res.send("Hello world!");
// });

// app.use("/api/auth", auth)