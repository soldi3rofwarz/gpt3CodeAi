import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('#indexForm')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
       
        element.textContent += '.';

        
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
    let index = 0

    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

// genera un id unico al combinar fecha exacta con un numero random, este se le aplicara a cada
//caracter devuelto por la ia para hacer el efecto de escritura
function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(form)

    // user
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    
    form.reset()

    // bot
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, "", uniqueId)

    
    chatContainer.scrollTop = chatContainer.scrollHeight;

    
    const messageDiv = document.getElementById(uniqueId)

   
    loader(messageDiv)

    const response = await fetch('https://gpt3codex.onrender.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = ""

    if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim()  

        typeText(messageDiv, parsedData)
    } else {
        const err = await response.text()

        messageDiv.innerHTML = "Something went wrong"
        alert(err)
    }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})

// voz
let rec

if(!("webkitSpeechRecognition" in window)){
    alert("el navegador no reconoce la app, por favor cambiar a otro navegador")
}else{
    rec = new webkitSpeechRecognition()
    rec.continuous = true;
    rec.lang = "es-mx", "en-us"
    rec.interim = true 
    rec.addEventListener('result', iniciar)
    rec.addEventListener('audioend', () => {
        console.log('Audio capturing ended');
      });
}

function iniciar (e){
    for(let i = e.resultIndex; i< e.results.length; i++){
        document.getElementById('prompt').innerHTML= e.results[i][0].transcript
    }
}

let btn = document.getElementById('voz')
btn.addEventListener('click', ()=>{rec.start()})
