import Client from './src/client';


export function createClient(APIKey: string) : Client {
    return new Client(APIKey);
}