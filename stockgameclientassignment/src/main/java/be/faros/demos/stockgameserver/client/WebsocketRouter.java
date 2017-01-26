package be.faros.demos.stockgameserver.client;

import be.faros.demos.stockgameserver.shared.server.ServerInfo;
import be.faros.demos.stockgameserver.shared.stocks.GameState;
import io.vertx.core.eventbus.EventBus;
import io.vertx.core.http.HttpClient;
import io.vertx.core.json.Json;

public class WebsocketRouter {

    public WebsocketRouter(EventBus eventBus, HttpClient httpClient) {
        startWebsocketClient(ServerInfo.WEBSOCKET, httpClient);
    }

    /*
     TODO 6 Uh-oh! The Stock websocket service seems to be very unreliable, but we have been given the promise that if one of them goes down, we can rely on a backup service.
     However, when the regular websocket service comes up again, the backup one will be closed automatically.
     Modify the websocket client code, so that if the connection goes down, it automatically switches over to the other port and vice versa.

     HINT: Take a look at the Connection close handler

     http://vertx.io/docs/apidocs/io/vertx/core/http/WebSocket.html#endHandler-io.vertx.core.Handler-

     HINT 2: Take a look at the Exception handler you can add as an argument to the websocket open method, which will be called when the initial connection fails

     http://vertx.io/docs/apidocs/io/vertx/core/http/HttpClient.html#websocket-int-java.lang.String-java.lang.String-io.vertx.core.Handler-io.vertx.core.Handler-

     EXTRA:
     You can also chain an extra event handler, which will be called in case an exception occurs on an exception after the connection has been established

     http://vertx.io/docs/apidocs/io/vertx/core/http/WebSocket.html#exceptionHandler-io.vertx.core.Handler-

    */
    public void startWebsocketClient(final int port, final HttpClient client) {
        System.out.println("Starting websocket router connection");

        client.websocket(port, ServerInfo.SERVER, ServerInfo.WEBSOCKET_CHANNEL, webSocket -> {
            webSocket.handler(data -> {
                GameState newState = Json.decodeValue(data.toString("ISO-8859-1"), GameState.class);
                System.out.println("Got websocket info. Current price is " + newState.getStockValue());
            });
        });
    }

    /*
     TODO 7B Let's start using the eventbus now. Use the websocket handler above, so that it also publishes the newState object to the event bus.
     Use InternalChannels.UPDATES.name() (or another chosen name) as the name of the channel to put it on.
     */
}
