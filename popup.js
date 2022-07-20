document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ type: "popup_open" });
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type == "load_anime") {
                const { payload } = request;

                const container = document.getElementById("container");
                container.innerHTML = "";

                const animeImage = document.createElement("img");
                const animeTitle = document.createElement("span");
                const animeButton = document.createElement("button")

                animeImage.src = payload.image;
                animeImage.classList.add("w-50");
                animeImage.classList.add("p-3");
                container.appendChild(animeImage);
                
                animeTitle.textContent = payload.title;
                animeTitle.classList.add("text-white");
                animeTitle.classList.add("justify-center");
                animeTitle.classList.add("text-center");
                animeTitle.classList.add("text-lg");
                animeTitle.classList.add("font-bold");
                container.appendChild(animeTitle);

                animeButton.innerHTML = `<span class="text">WATCH</span><span>On AnimeFLV</span>`;
                animeButton.classList.add("button-57");
                animeButton.role = "button";
                animeButton.onclick = () => {
                    window.open(payload.url).focus();
                };
                container.appendChild(animeButton);
            }
        }
    ) 
});