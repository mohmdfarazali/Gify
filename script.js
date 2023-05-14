let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
  // display loader until gif is loaded
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  let wrapper = document.querySelector(".wrapper");
  wrapper.style.display = "none";

  //get search value [default -> laugh]
  let query = document.getElementById("search-box").value;
  let gifCount = 20;
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  wrapper.innerHTML = "";

  //call api
  fetch(finalURL)
    .then((response) => response.json())
    .then((result) => {
      //all gifs
      let gifData = result.data;
      gifData.forEach((gif) => {
        //generate card for every gif
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
          // if iframes has loaded correctly, reduce the count when each gif loads
          gifCount--;
          if (!gifCount) {
            // if all the gifs have loaded then hide the loader and display gifs ui
            loader.style.display = "none";
            wrapper.style.display = "grid";
          }
        };
        container.append(iframe);
        //copy link button
        let copyBtn = document.createElement("button");
        copyBtn.innerText = "Copy Link";
        copyBtn.onclick = () => {
          let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
          //copy text on clipboard
          navigator.clipboard.writeText(copyLink).then(() => {
            alert("GIF Link copied to Clipboard✨");
        }).catch(() => { 
            //if navigator not supported
            alert("GIF Link copied to Clipboard✨");
            let hiddenInput=document.createElement("input");
            hiddenInput.setAttribute("type","text");
            document.body.appendChild(hiddenInput);
            hiddenInput.value=copyLink;
            hiddenInput.select();
            document.execCommand("copy");
            document.body.replaceChild(hiddenInput);
           });
        };
        container.append(copyBtn);
        wrapper.append(container);
      });
    });
};

// generate gif on screen load or when user clicks on the submit button
submitBtn.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
