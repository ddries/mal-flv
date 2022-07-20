(() =>{
    // chrome.runtime.sendMessage({ type: "page_loaded" }, async response => {
    //     console.log(response);

    //     if (response.type != "get_anime") {
    //         return;
    //     }

        
    // });
    chrome.runtime.onMessage.addListener(
        async function(request, sender, sendResponse) {
            if (request.type == "get_anime") {
                console.log("> loaded mal-animeflv extension script");
                console.log("> scanning for anime title");
            
                let elements = document.getElementsByClassName("title-name h1_bold_none");
            
                console.log("> found " + elements.length + " element(s)");
            
                if (elements.length <= 0) {
                    return;
                }
            
                const animeTitle = elements[0].children.item(0).textContent;
            
                console.log("> found anime title " + animeTitle);
                console.log("> scanning for type");
                
                elements = document.getElementsByClassName("information type");

                const type = elements[0].children.item(0).textContent.toLowerCase();

                console.log("> found type " + type);

                try {
                    const r = await (await fetch("https://www3.animeflv.net/api/animes/search",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "value=" + encodeURIComponent(animeTitle)
                        }
                    )).json();

                    if (!r) {
                        console.log("> could not fetch response");
                        return;
                    }

                    let entry;

                    for (const ent of r) {
                        if (ent.type != type) continue;
                        if (!animeTitle.includes(ent.title)) continue;

                        entry = ent;
                        break;
                    }
            
                    if (!entry) {
                        console.log("> could not fetch anime entry");
                        return;
                    }
            
                    const animeFLVUrl = "https://www3.animeflv.net/anime/" + entry.slug;
            
                    console.log("> successfully translated to url " + animeFLVUrl);
                    chrome.runtime.sendMessage({ type: "get_anime_response", payload: { ...entry, url: animeFLVUrl } });
                } catch(e) {
                    console.log("> error with animeflv api");
                    console.error(e);
                }
            }
        }
    );
    
})();