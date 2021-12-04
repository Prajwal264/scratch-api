import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { createConnection } from 'typeorm';
import { getUserIdByAuthorizationBearer } from './helpers/token.helper';
class Server {

  /**
   *
   *
   * @private
   * @type {Application}
   * @memberof Server
   */
  private app: Application;

  /**
   *
   *
   * @private
   * @type {ApolloServer}
   * @memberof Server
   */
  private graphQLServer: ApolloServer;

  /**
   *
   *
   * @private
   * @type {string}
   * @memberof Server
   */
  private port: string | number;

  /**
   * Creates an instance of Server.
   * @memberof Server
   */
  constructor() { }

  /**
   *
   *
   * @memberof Server
   */
  public async start() {
    this.configure();
    await this.setup();
    this.listen();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private configure() {
    this.configurePort();
    this.configureOrm();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private configureOrm() {
    createConnection();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private configurePort() {
    this.port = process.env.PORT || 4000;
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private async setup() {
    this.createExpressApplication();
    await this.createGraphqlServer();
  }

  /**
   *
   *
   * @private
   * @memberof Server
   */
  private createExpressApplication() {
    this.app = express();
  }

  private async createGraphqlServer() {
    const schema = await buildSchema({
      resolvers: [__dirname + '/**/*.resolver.{ts,js}']
    })
    this.graphQLServer = new ApolloServer({
      schema,
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        const userId = getUserIdByAuthorizationBearer(token)
        if (userId) return { req, userId }
        return { req }
      },
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })

    await this.graphQLServer.start();

    this.graphQLServer.applyMiddleware({ app: this.app })
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running at ' + this.port)
    })
  }

}

const bootstrap = () => {
  const server = new Server();
  server.start();
};

bootstrap();