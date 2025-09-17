import { useState, useEffect } from "react"

export default function Test() {
        const [data, setData] = useState(null)
        const [count, setCount] = useState(1)
        const [show, setShow] = useState(false)

        console.log(count)
    
    useEffect(() => {
        console.log("useEffect triggered")
        fetch(`https://jsonplaceholder.typicode.com/posts/${count}`)
            .then(res => res.json())
            .then(data => setData(data))
    }, [count])        
    
    function toggle() {
        setShow(prevShow => !prevShow)
    }
    
    return (
        <>
        <section className="test">
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(prevCount => prevCount + 1)}>Add</button>
                {/* <button onClick={() => setCount(count + 1)}>Increase Count</button> */}
            </div>
            <div>
                <pre>     
                    {data ? JSON.stringify({     
                        id: data.id,
                        title: data.title,
                        body: data.body.substring(0, 100) + "...",
                        userId: data.userId
                    }, null, 2) : "Ladataan..."}
                </pre>
            </div>
        </section>
        <div className="tracker">
            <hr />
            <button onClick={toggle}>Toggle WindowTracker</button>
            {show && <WindowTracker />}
        </div>
        </>
    )
}

function WindowTracker() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        function watchWidth() {
            console.log("Setting up event listener")
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)

        return function() {
            console.log("Cleaning up event listener")
            window.removeEventListener("resize", watchWidth)
        }
    }, [])

    return (
        <>
        <div>
            <h1>Window width: {windowWidth}</h1>        
        </div>
        </>
    )
}