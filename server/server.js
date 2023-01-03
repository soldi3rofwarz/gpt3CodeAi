import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration,OpenAIApi } from 'openai'

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_AAPI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async(req,res)=>{
    res.status(200).send({
        message:'apalastruka'
    })
})

app.post('/', async (req,res)=>{
    try{
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    }catch(e){
        console.log(e)
        res.status(500).send({e})
    }
})

app.listen(5000, ()=> console.log('server is running port 5000'))