import { registerPlugin } from "@capacitor/core";
const MetaAds = registerPlugin("MetaAds", {
    web: () => import("./web").then((m) => new m.MetaAdsWeb()),
});
export * from "./definitions";
export { MetaAds };
//# sourceMappingURL=index.js.map