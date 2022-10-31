import { Check, GameController } from 'phosphor-react'
import { Input } from '../components/Form/input'
import * as Dialog from '@radix-ui/react-dialog'
import * as CheckBox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useState, useEffect, FormEvent } from 'react'
import axios from 'axios';

interface Game {
  id: string;
  title: string;

}

export function CreateAdModal (){

const [games, setGames] = useState<Game[]>([])
const [weekaDays, setWeekDays] = useState<string[]>([])
const [useVoiceChannel, setUseVoiceChannel] = useState(false)


  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  }, [])
  
  async function handleCreatedAd(event: FormEvent ){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    try {
      axios.post(`http:localhost:3333/games/${data.game}/ads`, {
        name:data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekaDays.map(Number),
        hourStart: data.hourStart,
        hourEnd:data.hourEnd,
        useVoiceChannel: useVoiceChannel
    })

      alert('Anuncio criado com sucesso!!!')
    } catch (err){
      console.log(err)
      alert('Erro ao criar anuncio')
    }

  }


 return (
  <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black">
            <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio</Dialog.Title>
        
              <form onSubmit={handleCreatedAd}className='mt-6 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="game">Qual o game</label>
                  <select 
                    className="bg-zinc-900 py-3 px-4 rounded text-sm  placeholder:text-zinc-500 appearance-none" 
                    name="game"
                    id="game" 
                    defaultValue=""
                  >
                    <option disabled selected value=''>Selecione o game que deseja jogar</option>

                    {games.map(game => {
                      return(
                        <option 
                          key={game.id} 
                          value={game.id}
                        >
                          {game.title}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" id='name' placeholder='Como te chamam dentro do game'/>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yeaysPlaying">Joga há quanto tempo</label>
                    <Input id ="yeaysPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu discord</label>
                    <Input type="text" name="discord"id="discord" placeholder='Usuario#0000' />
                  </div>
                 </div>
                  <div className='flex gap-6'>
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="weekDays">Quando constuma jogar</label>
                      <ToggleGroup.Root className='grid grid-cols-4 gap-2' value={weekaDays} type="multiple" onValueChange={setWeekDays}>
                        <ToggleGroup.Item value='0'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('0') ? 'bg-violet-500' : ''}`}title='domingo'>D</ToggleGroup.Item>
                        <ToggleGroup.Item value='1'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('1') ? 'bg-violet-500' : ''}`}title='segunda'>S</ToggleGroup.Item>
                        <ToggleGroup.Item value='2'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('2') ? 'bg-violet-500' : ''}`}title='terça'>T</ToggleGroup.Item>
                        <ToggleGroup.Item value='3'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('3') ? 'bg-violet-500' : ''}`}title='quarta'>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value='4'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('4') ? 'bg-violet-500' : ''}`}title='quinta'>Q</ToggleGroup.Item>
                        <ToggleGroup.Item value='5'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('5') ? 'bg-violet-500' : ''}`}title='sexta'>S</ToggleGroup.Item>
                        <ToggleGroup.Item value='6'className={`w-8 h-8 rounded bg-zinc-900 gap ${weekaDays.includes('6') ? 'bg-violet-500' : ''}`}title='sábado'>S</ToggleGroup.Item>
                      </ToggleGroup.Root>

                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                      <label htmlFor="hourStart">Qual horario do dia</label>
                    <div className='grid grid-cols-2 gap-2 '>
                      <Input name="hourStart" id='hourStart' type="time" placeholder='De' />
                      <Input name="hourEnd"  id="hourEnd" type="time" placeholder='até' />
                    </div>
                  </div>
                </div>
                <label className='mt-2 flex gap-2 text-sm items-center'>
                  <CheckBox.Root 
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                    if (checked === true){
                      setUseVoiceChannel(true)
                    }else {
                      setUseVoiceChannel(false)
                    }
                  }} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                    <CheckBox.Indicator>
                      <Check className='w-4 h-4 text-emerald-400 '/>
                    </CheckBox.Indicator>
                  </CheckBox.Root>
                  Constumo me conectar ao chat de voz
                </label>
                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                  <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>

        </Dialog.Overlay>
      </Dialog.Portal>
 ) 
}