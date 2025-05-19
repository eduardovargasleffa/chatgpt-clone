import './styles/App.css'
import SideMenu from './components/SideMenu'
import { useState } from 'react'
import ChatMessage, { type PropMessage } from './components/ChatMessage'
import { makeRequest } from './api/api'
function App() {
  const [input, setInput] = useState('')
  const [chatlog, setChatlog] = useState<PropMessage[]>([
    {
      user: 'gpt',
      message: 'Como posso te ajudar hoje?'
    }
  ])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data } = await makeRequest({ prompt: input })

    setChatlog([
      ...chatlog,
      {
        user: 'me',
        message: `${input}`
      },
      {
        user: 'gpt',
        message: data.split('\n').map((line: string) => <p>{line}</p>)
      }
    ])

    setInput('')
  }

  return (
    <div className='App'>
      <SideMenu />
      <section className='chatbox'>
        <div className='chat-log'>
          {chatlog.map((item, index) => {
            return <ChatMessage key={index} message={item} />
          })}
        </div>
        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              className='chat-input-textarea'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  )
}

export default App
