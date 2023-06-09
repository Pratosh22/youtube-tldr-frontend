import { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import Result from "../Result/Result";
import Spinner from "../Spinner/Spinner";
import "./Form.css";
function Form() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [selection, setSelection] = useState("summarize");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    //clear previous data
    setData("");
    setTitle("");
    setImg("");

    e.preventDefault();

    if (!url) {
      alert("Please enter a url");
      return;
    }

    if (
      !url.startsWith("https://www.youtube.com/watch?v=") &&
      !url.startsWith("https://youtu.be/")
    ) {
      alert("Please enter a valid youtube url");
      return;
    }
    
    //get video id from url
    const videoId =
      url.split("https://www.youtube.com/watch?v=")[1] ||
      url.split("https://youtu.be/")[1];

    const checkCaptions = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API}`
    );

    if (checkCaptions.data.items.length === 0) {
      alert("Video does not have captions");
      return;
    }
    setLoading(true);
    const getTitle = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&fields=items(id%2Csnippet)&key=${process.env.REACT_APP_YOUTUBE_API}`
    );

    if (selection === "summarize") {
      try {
        const response = await fetch("https://ytldr.onrender.com/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: url,
          }),
        });

        const data = await response.json();
        setData(data.message);
        setTitle(getTitle.data.items[0].snippet.title);
        setImg(getTitle.data.items[0].snippet.thumbnails.high.url);
        setLoading(false);
      } catch (err) {
        alert("Something went wrong, please try again");
        setLoading(false);
      }
    }
    if (selection === "explain") {
      try {
        const response = await fetch("https://ytldr.onrender.com/explain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: url,
          }),
        });
        const data = await response.json();
        setData(data.message);
        setTitle(getTitle.data.items[0].snippet.title);
        setImg(getTitle.data.items[0].snippet.thumbnails.high.url);
        setLoading(false);
      } catch (err) {
        alert("Something went wrong, please try again");
        setLoading(false);
      }
    }
  };
  const handleRadio = (e) => {
    setSelection(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="radio">
          <div>
            <input
              type="radio"
              name="select"
              id="summarize"
              value="summarize"
              checked={selection === "summarize"}
              onChange={handleRadio}
            />
            <label htmlFor="summary">Summarize</label>
          </div>
          <div>
            <input
              type="radio"
              name="select"
              id="explain"
              checked={selection === "explain"}
              value="explain"
              onChange={handleRadio}
            />
            <label htmlFor="summary">Explain</label>
          </div>
        </div>
        <div className="input-url">
          <div>
            <label className="label-url">Enter Video URL: </label>
            <input
              className="url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
        </div>
        <Button />
      </form>
      {loading && <Spinner />}
      {data && (
        <Result
          title={title}
          img_url={img}
          summary={data}
          scrollHeight={document.body.scrollHeight}
        />
      )}
    </>
  );
}

export default Form;
