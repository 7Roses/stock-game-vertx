package be.faros.demos.stockgameserver;

import be.faros.demos.stockgameserver.server.RestServer;
import be.faros.demos.stockgameserver.server.SockJSServer;
import be.faros.demos.stockgameserver.server.StaticWebsiteServer;
import be.faros.demos.stockgameserver.server.WebsocketServer;
import be.faros.demos.stockgameserver.stockmanagement.controller.StockBrokerController;
import io.vertx.core.Vertx;

public class VertxEmbeddedStarter {

	private static final StockBrokerController stockBrokerController = new StockBrokerController();

	public static void main(String[] args) {
		Vertx.vertx().deployVerticle(new StaticWebsiteServer());
        Vertx.vertx().deployVerticle(new SockJSServer(stockBrokerController));
        Vertx.vertx().deployVerticle(new RestServer(stockBrokerController));
        Vertx.vertx().deployVerticle(new WebsocketServer(stockBrokerController));
	}

}
