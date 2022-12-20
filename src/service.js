import AmityClient from "@amityco/js-sdk";

const API_KEY = process.env.REACT_APP_API_KEY;

const AmityClientSession = new AmityClient({
  apiKey: API_KEY,
  apiRegion: "SG",
});

export default AmityClientSession;
