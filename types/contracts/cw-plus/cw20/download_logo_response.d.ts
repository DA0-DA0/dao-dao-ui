import { Binary } from "./shared-types";

/**
 * When we download an embedded logo, we get this response type. We expect a SPA to be able to accept this info and display it.
 */
export interface DownloadLogoResponse {
data: Binary
mime_type: string
[k: string]: unknown
}
