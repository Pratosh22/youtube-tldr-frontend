import "./Home.css";
import Form from "../Form/Form";
import { useTypeWriter } from "@vegadev/react-type-writer";
function Home() {
  const text = useTypeWriter({
    text: [
      "Summarize ",
      "Explain ",
    ],
    infiniteLoop: true,
    delay: 1000,
    blinker: '',
  });
  return (
    <>
      <header>
        <center>
          <h1>
            <span>{text}</span> 
            
             any video <br></br>in a click.
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
