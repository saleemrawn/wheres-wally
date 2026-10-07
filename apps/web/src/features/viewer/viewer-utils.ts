import { VIEWER_ASSETS } from "./viewer-assets";
import type { ViewerAssetKey } from "./viewer-types";

const isViewerAssetKey = (token: string): token is ViewerAssetKey => {
  return Object.hasOwn(VIEWER_ASSETS, token);
};

export { isViewerAssetKey };
