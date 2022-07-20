chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.type == "popup_open") {
            const [ tab ] = await chrome.tabs.query({ 'active': true,'currentWindow':true });
            const url = tab.url;

            if (!url.includes("https://myanimelist.net/anime")) return;
            chrome.tabs.sendMessage(tab.id, { type: "get_anime" });
            return;
        }

        // if (request.type == "page_loaded") {
        //     sendResponse({ type: "get_anime" });
        //     return;
        // }

        if (request.type == "get_anime_response") {
            const { url, title, slug, id } = request.payload;
            chrome.runtime.sendMessage({
                type: "load_anime",
                payload: {
                    image: "https://www3.animeflv.net/uploads/animes/covers/" + id + ".jpg",
                    url,
                    title
                }
            });
        }
    }
);