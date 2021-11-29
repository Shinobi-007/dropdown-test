import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import DropdownList from "./Components/DropdownList";
import ResultsButton from "./Components/ResultsButton";

function App() {
  // variables
  const [initialData, setInitialData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subcategoriesData, setSubcategoriesData] = useState([]);
  const [speakerID, setSpeakerID] = useState("");
  const [categoriesID, setCategoriesID] = useState("");
  const [subcategoriesID, setsubcategoriesID] = useState("");
  const [results, setResults] = useState([]);

  // initial get request to API and setState for initial data
  useEffect(() => {
    try {
      const fetchInitialData = async () => {
        const response = await axios.get(
          `https://api.itorah.com/api/Speakers/allspeakers`
        );

        const sortedList = response.data.sort((a, b) =>
          a.isMainSpeaker < b.isMainSpeaker ? 1 : -1
        );
        setInitialData(sortedList);
      };
      fetchInitialData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // ID handle functions
  const handleSpeakerID = (event) => {
    const result = event.target.value;
    setSpeakerID(result);
  };

  const handleCategoriesID = (event) => {
    const result = event.target.value;
    setCategoriesID(result);
  };

  const handleSubcategoriesID = (event) => {
    const result = event.target.value;
    setsubcategoriesID(result);
  };

  // get requests to Categories API and setState for Categories data
  const getCategories = async (id) => {
    if (id === "") {
      const reset = [];
      setCategoriesData([...reset]);
      setSubcategoriesData([...reset]);
      setCategoriesID("");
      setsubcategoriesID("");
    } else {
      try {
        const response = await axios.get(
          `https://api.itorah.com/api/Categories/catfilter?SpeakerID=+${id}`
        );
        setCategoriesData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // get requests to Subcategories API and setState for Subcategories data
  const getSubcategories = async (id) => {
    if (id === "") {
      const reset = [];
      setSubcategoriesData([...reset]);
      setCategoriesID("");
      setsubcategoriesID("");
    } else {
      try {
        const response = await axios.get(
          `https://api.itorah.com/api/Categories/subfilter?CategoryID=+${id}+&SpeakerID=+${speakerID}`
        );
        setSubcategoriesData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // get request for RESULTS
  const getResults = async () => {
    if (speakerID === "" || categoriesID === "") {
      const reset = [];
      setResults([...reset]);
      return;
    } else if (subcategoriesID !== "") {
      const response = await axios.get(
        `https://api.itorah.com/api/Shiurim/all?PageIndex=1&PageSize=20&CategoryID=+${subcategoriesID}+&SpeakerID=+${speakerID}`
      );
      setResults(response.data);
      console.log(response.data);
    } else {
      const response = await axios.get(
        `https://api.itorah.com/api/Shiurim/all?PageIndex=1&PageSize=20&CategoryID=+${categoriesID}+&SpeakerID=+${speakerID}`
      );
      setResults(response.data);
      console.log(response.data);
    }
  };

  return (
    <div className='main-container'>
      <div className='top-container'>
        <div className='dropdown-container'>
          <DropdownList
            name='Speakers'
            info={initialData}
            getData={getCategories}
            setID={handleSpeakerID}
          />
          <DropdownList
            name='Categories'
            info={categoriesData}
            getData={getSubcategories}
            setID={handleCategoriesID}
          />
          <DropdownList
            name='Subcategories'
            info={subcategoriesData}
            getData={(e) => console.log("hi")}
            setID={handleSubcategoriesID}
          />
        </div>
        <ResultsButton getResults={getResults} />
      </div>
    </div>
  );
}

export default App;
