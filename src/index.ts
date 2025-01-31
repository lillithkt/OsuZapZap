import config, { Mode } from "config";
import providers from "providers";
import WebSocket from "ws";


console.log('Config:', config);

let cooldownTriggered = false;
function triggerCooldown() {
  cooldownTriggered = true;
  setTimeout(() => {
    cooldownTriggered = false;
  }, config.config.cooldown * 1000);
}

let misses = 0;
let hits = 0;

const providerClass = providers[config.config.hapticMode]
if (!providerClass) {
  console.error('Invalid hapticMode:', config.config.hapticMode);
  process.exit(1);
}
const provider = new providerClass();
provider.init();

(async () => {
  while (true) {
    await new Promise(res => {
      const ws = new WebSocket('ws://127.0.0.1:24050/websocket/v2');
      ws.onopen = () => {
        console.log('Connected to TOsu');
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data.toString());
        const oldMisses = misses;
        const oldHits = hits;
        misses = data.play.hits["0"];
        hits = data.play.hits["50"] + data.play.hits["100"] + data.play.hits["300"];
        if (oldHits === 0 && oldMisses === 0) {
          return;
        }
        const shouldHaptic = config.config.mode === Mode.onHit ? hits > oldHits : misses > oldMisses;
        if (shouldHaptic && !cooldownTriggered) {
          triggerCooldown();
          console.log('Sending Haptic...');
          provider.haptic();
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from TOsu, retrying in 1 second...');
        setTimeout(res, 1000);
      };
    });
  }
})();