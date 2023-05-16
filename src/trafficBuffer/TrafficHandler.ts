// Importa os módulos 'net' e 'DataHandler' usando require
const DataHandler = require('./DataHandler');
import net = require('net');

// Server connection class
class TrafficHandler extends DataHandler {

    // instância estática da classe TrafficHandler
    private static instance: TrafficHandler;

    // Atributos da classe TrafficHandler
    private static HOST = '127.0.0.1';
    private static PORT_NETWORK_TRAFFIC = 50000;
    private static PORT_PROTOCOL_TRAFFIC = 50001;
    private static PORT_HOSTNAME_TRAFFIC = 50002;

    private static network_client: net.Socket;
    private static protocol_client: net.Socket;
    private static hostname_client: net.Socket;

    // Contrutor privado para evitar instanciação (single-ton)
    private constructor() {
        super();
    }

    // Método para retornar a instância da classe TrafficHandler
    public static getInstance(): TrafficHandler {
        if (!TrafficHandler.instance) {
            TrafficHandler.instance = new TrafficHandler();
        }
        return TrafficHandler.instance;
    }

    // Método para conectar à todos os sockets
    public connectToSockets(): void {

        TrafficHandler.network_client = new net.Socket();
        TrafficHandler.network_client.connect(TrafficHandler.PORT_NETWORK_TRAFFIC, TrafficHandler.HOST, () => {
            // console.log('Conectado ao provedor de trafégo por aplicativo.');
        });

        TrafficHandler.protocol_client = new net.Socket();
        TrafficHandler.protocol_client.connect(TrafficHandler.PORT_PROTOCOL_TRAFFIC, TrafficHandler.HOST, () => {
            // console.log('Conectado ao provedor de trafégo por protocolo de rede.');
        });

        TrafficHandler.hostname_client = new net.Socket();
        TrafficHandler.hostname_client.connect(TrafficHandler.PORT_HOSTNAME_TRAFFIC, TrafficHandler.HOST, () => {
            // console.log('Conectado ao provedor de trafégo por hosts.');
        });
    }

    // Método para lidar com erros
    private handleError(): void {

        TrafficHandler.network_client.on('error', (error) => {
            console.error('Erro recebido no network_client:', error);
        });

        TrafficHandler.protocol_client.on('error', (error) => {
            console.error('Erro recebido no protocol_client:', error);
        });

        TrafficHandler.hostname_client.on('error', (error) => {
            console.error('Erro recebido no hostname_client:', error);
        });
    }

    // Método para receber dados dos sockets
    public receiveDataFromSockets(): void {

        TrafficHandler.network_client.on('data', (data) => {
            // console.log('Dado recebido do network_client:', data.toString());
            const json_data = this.jsonify(data.toString());
            if (json_data !== null) {
                this.appendNetworkTraffic(json_data);
            }
        });

        TrafficHandler.protocol_client.on('data', (data) => {
            // console.log('Dado recebido do protocol_client:', data.toString());
            const json_data = this.jsonify(data.toString());
            if (json_data !== null) {
                this.appendProtocolTraffic(json_data);
            }
        });

        TrafficHandler.hostname_client.on('data', (data) => {
            // console.log('Dado recebido do hostname_client:', data.toString());
            const json_data = this.jsonify(data.toString());
            if (json_data !== null) {
                this.appendHostnameTraffic(json_data);
            }
        });

        this.handleError();
    }

    // Método para fechar a conexão
    public closeConnection(): void {

        TrafficHandler.network_client.on('close', () => {
            console.log('Conexão encerrada com o network_client.');
        });

        TrafficHandler.protocol_client.on('close', () => {
            console.log('Conexão encerrada com o protocol_client.');
        });

        TrafficHandler.hostname_client.on('close', () => {
            console.log('Conexão encerrada com o hostname_client.');
        });
    }
}

// const localCaptureServer = TrafficHandler.getInstance();
// localCaptureServer.connectToSockets();
// localCaptureServer.receiveDataFromSockets();
// localCaptureServer.closeConnection();