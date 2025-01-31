export class BaseProvider {
    static providerConfigMode: string;
    init() {
        console.error('BaseProvider.init() not implemented');
        process.exit(1);
    }

    haptic() {
        console.error('BaseProvider.haptic() not implemented');
        process.exit(1);
    }
}