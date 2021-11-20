"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const apollo_server_core_1 = require("apollo-server-core");
const typeorm_1 = require("typeorm");
class Server {
    constructor() { }
    async start() {
        this.configure();
        await this.setup();
        this.listen();
    }
    configure() {
        this.configurePort();
        this.configureOrm();
    }
    configureOrm() {
        (0, typeorm_1.createConnection)();
    }
    configurePort() {
        this.port = process.env.PORT || 4000;
    }
    async setup() {
        this.createExpressApplication();
        await this.createGraphqlServer();
    }
    createExpressApplication() {
        this.app = (0, express_1.default)();
    }
    async createGraphqlServer() {
        const schema = await (0, type_graphql_1.buildSchema)({
            resolvers: [__dirname + '/**/*.resolver.{ts,js}']
        });
        this.graphQLServer = new apollo_server_express_1.ApolloServer({
            schema,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()]
        });
        await this.graphQLServer.start();
        this.graphQLServer.applyMiddleware({ app: this.app });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server is running at ' + this.port);
        });
    }
}
const bootstrap = () => {
    const server = new Server();
    server.start();
};
bootstrap();
//# sourceMappingURL=index.js.map