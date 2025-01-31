import { IntifaceProvider } from "./intiface";
import { PiShockProvider } from "./pishock";

const allProviders = Object.fromEntries([
    PiShockProvider,
    IntifaceProvider
].map(i=>[i.providerConfigMode, i]))

export default allProviders;