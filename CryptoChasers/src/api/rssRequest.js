import { urlStrings } from "./index";
import * as rssParser from 'react-native-rss-parser';
export const rssRequest = async () => {
    let response = await fetch(urlStrings.cryptoChasersXml);
    let responseText = await response.text();
    let rss = await rssParser.parse(responseText);
    return { rss: rss, filteredContent: rss.items };
}