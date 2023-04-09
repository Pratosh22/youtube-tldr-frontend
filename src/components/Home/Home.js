import { useRef, useEffect } from "react";
import "./Home.css";
import Typed from "typed.js";
import Form from "../Form/Form";
function Home() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Summarize", "Explain"],
      typeSpeed: 100,
      backSpeed: 40,
      showCursor: false,
      loop: true,
    });
  }, []);
  return (
    <>
      <header>
        <center>
          <h1>
            <span ref={el} className="typed"></span> any video <br></br>in a
            click.
          </h1>
        </center>
      </header>
      <article>
        <p>
          YTLDR helps you summarize any video into concise, easy to digest
          content so you can free yourself from information overload.
        </p>
      </article>
      <div className="content">
        <Form />
      </div>
    </>
  );
}

export default Home;
