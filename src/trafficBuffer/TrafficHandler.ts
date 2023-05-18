// Importa os módulos 'net' e 'DataHandler' usando require
const ImportDataHandler = require('./DataHandler');
const net = require('net');

// Server connection class
class TrafficHandler extends ImportDataHandler {

    // instância estática da classe TrafficHandler
    private static instance: TrafficHandler;

    // Atributos da classe TrafficHandler
    private static HOST = '127.0.0.1';
    private static PORT_NETWORK_TRAFFIC = 50000;
    private static PORT_PROTOCOL_TRAFFIC = 50001;
    private static PORT_HOSTNAME_TRAFFIC = 50002;

    private static network_client: any;
    private static protocol_client: any;
    private static hostname_client: any;

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
            const json_data = Object.entries(this.jsonify(data.toString()));
            if (json_data !== null) {
                var json_array = [];
                json_data.forEach((element: any[]) => {
                    const { download, upload, name } = element[1];
                    json_array.push({ pid: element[0], upload, download, name, timestamp: Date.now() });
                });
                this.appendNetworkTraffic(json_array);
            }
        });

        TrafficHandler.protocol_client.on('data', (data) => {
            const json_data = Object.entries(this.jsonify(data.toString()));
            if (json_data !== null) {
                var json_array = [];
                json_data.forEach((element: any[]) => {
                    const { total, download, upload } = element[1];
                    json_array.push({ protocol: element[0], total, upload, download, timestamp: Date.now() });
                });
                this.appendProtocolTraffic(json_array);
            }
        });

        TrafficHandler.hostname_client.on('data', (data) => {
            const json_data = Object.entries(this.jsonify(data.toString()));
            var json_array = [];
            if (json_data !== null) {
                json_data.forEach((element: any[]) => {
                    const { host, total, download, upload } = element[1];
                    json_array.push({ id: element[0], host, total, upload, download, timestamp: Date.now() });
                });
                this.appendHostnameTraffic(json_array);
            }

            console.log(json_array);
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

    // Método para iniciar a captura de tráfego
    public static startNetworkCapture() {
        const localCaptureServer = TrafficHandler.getInstance();
        localCaptureServer.connectToSockets();
        localCaptureServer.receiveDataFromSockets();
        // localCaptureServer.closeConnection();
    }
}

module.exports = TrafficHandler;

TrafficHandler.startNetworkCapture();