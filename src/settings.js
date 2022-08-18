import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "bbc788fe2b494a8e8f3e0bae18ffe112";
const token =
  "007eJxTYLh8wGlJe7lO79o3fMXsi+uvTpadUXx/2yoeZc9FnCcnW1koMCQlJZtbWKSlGiWZWJokWqRapBmnGiQlphpapKWlGhoaCf//mzQ54H/Se28NBkYoBPG5GbxKi0vcijJT81KKGRgAqdsl1w==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "JustFriends";
