
const chatBox = document.getElementById("chatBox");

const API_URL = "Api Key"; //===========DATA BASE API KEY==========//

function addMessage(text,type){
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(){
    const t = document.createElement("div");
    t.className = "typing";
    t.id = "typing";
    t.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
    chatBox.appendChild(t);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping(){
    const t = document.getElementById("typing");
    if(t) t.remove();
}

async function sendMessage(){
    const input = document.getElementById("userInput");
    const text = input.value.trim();

    if(!text) return;

    addMessage(text,"user");
    input.value="";

    showTyping();

    try {
        const res = await fetch(API_URL + "?msg=" + encodeURIComponent(text));
        const data = await res.text();

        setTimeout(()=>{
            removeTyping();
            addMessage(data,"bot");
        },700);

    } catch (err) {
        removeTyping();
        addMessage("Server error ❌","bot");
    }
}

document.getElementById("userInput")
.addEventListener("keypress",e=>{
    if(e.key === "Enter") sendMessage();
});


