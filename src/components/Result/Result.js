import './Result.css'
import { useEffect,useRef } from 'react'
function Result({ title, img_url, summary,scrollHeight}) {
    const divRef=useRef(null)
    useEffect(()=>{
        divRef.current.scrollIntoView({behavior:"smooth"})
    });
    return (    
        <div className="result"> 
            <div className="result__title">
                <center><h1>{title}</h1></center>
            </div>
            <div className="result__img">
                <center><img src={img_url} alt="" /></center>
            </div>
            <div className="result__summary" ref={divRef}>
                <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>
            </div>
        </div>
    )
}

export default Result
