import React, { useContext, useState } from "react";
import { MetadataContext } from "../metadata/metadataContext";
import Alert from "./Alert";

const Search = () => {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const { fetchMetaData } = useContext(MetadataContext);
  //If the input value changes to update
  const handleClick = (e) => {
    setText(e.target.value);
  };

  //to set alert message if the input is empty
  const handleAlert = () => {
    setAlert(true);
    setTimeout(() => setAlert(false), 2000);
  };

  //when user clicked the button
  const handleSubmit = (e) => {
    e.preventDefault();
    //if the user entered nothing
    if (text == "") {
      handleAlert();
    } else {
      //if everything goes call the fetchMetaData function
      setText("");
      fetchMetaData(text);
    }
  };
  return (
    <main className="  container mx-auto px-3 pb-12 pt-20">
      <div className="grid  grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-2 gap-8">
        <div>
          <form>
            <div className="form-control">
              {alert && <Alert />}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" Enter a website name to start ..."
                  value={text}
                  onChange={handleClick}
                  className="w-full pr-40 bg-gray-200 input input-lg text-black"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg  "
                >
                  GO
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Search;
