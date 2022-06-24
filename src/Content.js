
import { useState, useEffect } from 'react'


const Content = () => {

    const tabs = ['POSTS', 'COMMENTS', 'ALBUMS', 'TODOS', 'USERS']
    const [datas, setDatas] = useState([])
    const [type, setTab] = useState(tabs[0])
    const [showScrollButton, setShowScrollButton] = useState(false)
    const scrollOnStartBtn = document.querySelector('.scroll-start-btn')
    const scrollOnEndBtn = document.querySelector('.scroll-end-btn')
    const appTongleBtn = document.querySelector('.app-tongle')

    useEffect(() => {

        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(datas => {
                setDatas(datas)
            })

    }, [type])

    useEffect(() => {

        const handleCroll = () => {
            const isShowBtnCroll = window.scrollY >= 175
            setShowScrollButton(isShowBtnCroll)
        }

        window.addEventListener('scroll', handleCroll)

        return () => {
            window.removeEventListener('scroll', handleCroll)
        }

    }, [showScrollButton])

    if(scrollOnStartBtn) {
        scrollOnStartBtn.onclick = () => {
            document.body.scrollIntoView({block: "start", behavior: "smooth"});
        }
    }

    if(scrollOnEndBtn) {
        scrollOnEndBtn.onclick = () => {
            document.body.scrollIntoView({block: "end", behavior: "smooth"});
        }
    }

    return (
        <div>
            <div>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setTab(tab)}
                        style={type === tab ? {
                            backgroundColor: '#333',
                            color: '#fff',
                        } : {}}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <ul>
                {datas.map(data => {
                    return (<li key={data.id}>{data.title || data.name}</li>)
                })}
            </ul>
            {!showScrollButton && <button className={!showScrollButton ? 'scroll-end-btn' : ''}>END</button>}
            {showScrollButton && <button className={showScrollButton ? 'scroll-start-btn' : ''}>TOP</button>}
        </div>
    )
}

export default Content