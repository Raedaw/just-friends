import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId ="bbc788fe2b494a8e8f3e0bae18ffe112";
const token ="006bbc788fe2b494a8e8f3e0bae18ffe112IACmoRRBBzmjTUk3tegwUQ4BKS5i6+DTvNAfJq71m3pLcKpIC90AAAAAEAASK8+Ib/r9YgEAAQBv+v1i";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "JustFriends";



