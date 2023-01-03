import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector("form");
const chatContainer=  document.querySelector('#chat_container')

let loadinterval;

function loader(e){
  e.textContent ='';

  loadinterval = setInterval(()=>{
    e.textContent += ' .';

    if(e.textContent==='****'){
      e.textContent='';
    }
  }, 300)
}

function typetext(e,text){  
  let index =0;

 let interval = setInterval(()=>{
  if(index < text.length){
    e.innerHTML += text.charAt(index)
    index ++;
  }else{
    clearInterval(interval)
  }
 }, 20)
}

function generateUniqueId(){
  const time = Date.now();
  const randomNumber = Math.random()
  const hexaString = randomNumber.toString(16)

  return `id-${time}-${hexaString}`;
}

function chatStripe(isAi,value,uniqueId){
      return(
        `
      <div class='wrapper ${isAi && 'ai'}' >
        <div class='chat'>
          <div class='profile'>
            <img src='${isAi?bot:user}' alt='${isAi?'bot':'user'}'/>
          </div>
          <div class='message' id=${uniqueId}>${value}</div>
        </div>
      </div>
        `
      )
}

const handleSubmit = async(e)=>{
  e.preventDefault;

  const data = new FormData(form)

  //user
  chatContainer.innerHTML+=chatStripe(false,data.get('prompt'));
  form.reset();

  //bot
  const uniqueId= generateUniqueId()
  chatContainer.innerHTML += chatStripe(true,' ',uniqueId)
  chatContainer.scrollTop= chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId)
  loader(messageDiv)

  //fetch desde el servidor
  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers:{
      'Content-type': 'aplication/json'
    },
    body:JSON.stringify({
      prompt:data.get('prompt')
    })

  })
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup',(e)=>{
  if(e.keyCode ===13){
    handleSubmit(e)
  }
})