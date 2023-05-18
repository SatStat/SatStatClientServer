import e from "cors";

// Data Handler Class
export class DataHandler {

    // Membros estáticos da classe DataHandler
    private static network_traffic: JSON[];
    private static protocol_traffic: JSON[];
    private static hostname_traffic: JSON[];

    private static dayTraffic: number[] = [0, 0];
    private static nightTraffic: number[] = [0, 0];
    private static recentTraffic: JSON;

    private static buffer_size: number = 1000;
    private static request_size: number = 100;

    constructor() {

        DataHandler.network_traffic = [];
        DataHandler.protocol_traffic = [];
        DataHandler.hostname_traffic = [];
    }

    // Método para traduzir os dados recebidos
    protected jsonify(data: string): JSON | null {

        try {

            // Filtra o dado e retorna um objeto json
            data = data.substring(2, data.length - 1);
            const json_data = JSON.parse(data);
            return json_data;

        } catch (error) {
            console.error('Erro ao converter mensagem para JSON:', error);
            return null;
        }
    }

    // Método setter para append em network_traffic
    protected appendNetworkTraffic(data: JSON | any): void {
        DataHandler.recentTraffic = data;
        DataHandler.network_traffic.push(data);
        this.networkTrafficManager();
    }

    // Método setter para append em protocol_traffic
    protected appendProtocolTraffic(data: JSON): void {
        DataHandler.protocol_traffic.push(data);
        this.protocolTrafficManager();
    }

    // Método setter para append em hostname_traffic
    protected appendHostnameTraffic(data: JSON): void {
        DataHandler.hostname_traffic.push(data);
        this.hostnameTrafficManager();

        // Iterativamente soma todo o tráfego 
        // se estiver dentro do intervalo de 7am - 23:59pm
        const hour = new Date().getHours();
        if (hour >= 7 && hour < 23) {

            // TODO: COMPENSAR PELA ESCALA (BYTE, KILO, MEGA, GIGA)
            for (const key in data) {
                DataHandler.dayTraffic[0] += parseFloat(data[key]['download'].replace(/[A-Za-z]/g, ''));
                DataHandler.dayTraffic[1] += parseFloat(data[key]['upload'].replace(/[A-Za-z]/g, ''));
            }


        }
        else {
            
            // TODO: COMPENSAR PELA ESCALA (BYTE, KILO, MEGA, GIGA)
            for (const key in data) {
                DataHandler.nightTraffic[0] += parseFloat(data[key]['download'].replace(/[A-Za-z]/g, ''));
                DataHandler.nightTraffic[1] += parseFloat(data[key]['upload'].replace(/[A-Za-z]/g, ''));
            }
        }
    }

    // Método para gerenciamento do tamanho do buffer
    private networkTrafficManager(): void {

        if (DataHandler.network_traffic.length >= DataHandler.buffer_size) {
            DataHandler.network_traffic.shift();
        }
    }

    // Método para gerenciamento do tamanho do buffer
    private protocolTrafficManager(): void {

        if (DataHandler.protocol_traffic.length >= DataHandler.buffer_size) {
            DataHandler.protocol_traffic.shift();
        }
    }

    // Método para gerenciamento do tamanho do buffer
    private hostnameTrafficManager(): void {

        if (DataHandler.hostname_traffic.length >= DataHandler.buffer_size) {
            DataHandler.hostname_traffic.shift();
        }
    }

    // Getter para o buffer de dados
    public getTrafficBuffer(_request_size: number = DataHandler.request_size): JSON[] {

        // Joins all traffic arrays into one json object
        const traffic_buffer: JSON[] = [];

        if (DataHandler.network_traffic.length < _request_size) {

            traffic_buffer.push(...DataHandler.network_traffic);
            traffic_buffer.push(...DataHandler.protocol_traffic);
            traffic_buffer.push(...DataHandler.hostname_traffic);

            DataHandler.network_traffic = [];
            DataHandler.protocol_traffic = [];
            DataHandler.hostname_traffic = [];
        }
        else {
            traffic_buffer.push(...DataHandler.network_traffic.splice(0, _request_size));
            traffic_buffer.push(...DataHandler.protocol_traffic.splice(0, _request_size));
            traffic_buffer.push(...DataHandler.hostname_traffic.splice(0, _request_size));
        }

        // Returns the traffic buffer
        return traffic_buffer;
    }

    // Método getter para o tráfego total das aplicações (network) diurno
    public getDayTraffic(): number[] {
        return DataHandler.dayTraffic;
    }

    // Método getter para o tráfego total das aplicações (network) noturno
    public getNightTraffic(): number[] {
        return DataHandler.nightTraffic;
    }

    // Método getter para o tráfego recente das aplicações (network)
    public getRecentTraffic(): JSON {
        return DataHandler.recentTraffic;
    }

    // Método getter para o buffer de network_traffic
    public seeNetworkTrafficBuffer(): JSON[] {
        return DataHandler.network_traffic;
    }

    // Método getter para o buffer de protocol_traffic
    public seeProtocolTrafficBuffer(): JSON[] {

        return DataHandler.protocol_traffic;
    }

    // Método getter para o buffer de hostname_traffic
    public seeHostnameTrafficBuffer(): JSON[] {

        return DataHandler.hostname_traffic;
    }
}

// Exporta o módulo