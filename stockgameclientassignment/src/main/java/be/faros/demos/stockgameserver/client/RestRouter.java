package be.faros.demos.stockgameserver.client;

import be.faros.demos.stockgameserver.shared.registration.UserRegistration;
import be.faros.demos.stockgameserver.shared.server.ServerInfo;
import be.faros.demos.stockgameserver.shared.stocks.OrderAction;
import io.vertx.core.Handler;
import io.vertx.core.http.HttpClient;
import io.vertx.core.http.HttpClientRequest;
import io.vertx.core.json.Json;

public class RestRouter {

    private final HttpClient httpClient;

    public RestRouter(HttpClient httpClient) {
        this.httpClient = httpClient;
    }

    /*
        TODO 4 Try to send a Buy or Sell request to the server
        Since the goal of our application is to send buy and sell requests to the broker server, let's try exactly that.
        Take a look at how we sent a registration request, but this time send an Order instead. The order requires an
        OrderAction, and your username and password. After coding this, try running it from the ClientStarter. To test this,
        just create an OrderAction with a Buy OrderType, for 1 stock, then pass it to this method with your username and password.
        To verify your order arrived on the server succesfully, check for a status code 200. If you are confident it worked, go to
        next part of the exercise
     */

    public void sendOrder(OrderAction orderAction, String username, String password) {

    }

    /*
        TODO 3 Take a closer look at what actually happened in the previous part of the assignment.
        custom event handler was passed to print the password, which got triggered after we received a reply from the server. When looking at the command line you can see that this happened
        in an asynchronous way. Your application continued running the rest of the code, but then reacted to the response of the server by printing out the password
        it received.
    */
    public void doRegistration(final UserRegistration registration, final Handler<String> handler) {
        final String registrationAction = Json.encodePrettily(registration);

        System.out.println("Sending a reqistration request to the server");

        HttpClientRequest request = httpClient.post(ServerInfo.REST, ServerInfo.SERVER, ServerInfo.REGISTRATION_URL, httpClientResponse -> {
            System.out.println("Response code for registration was " + httpClientResponse.statusCode());
            httpClientResponse.bodyHandler(totalBuffer -> {
                String password = totalBuffer.toString();
                handler.handle(password);
            });
        }).putHeader("content-type", "application/json").putHeader("content-length", Integer.toString(registrationAction.length()));

        System.out.println("Waiting for the server's response...");

        request.end(registrationAction);
    }
}
