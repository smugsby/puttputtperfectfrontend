import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { add_round } from '../utils/mutations';
import Auth from '../utils/auth'
import { useMutation, useQuery } from '@apollo/client';
import { refreshUser } from '../utils/queries'

const Dashboard = () => {
  const [rounds, setRounds] = useState([])
  //bring data from graph
  const {data, refetch} = useQuery(refreshUser)
  const userData = data?.currentUser
  //store data
  const [addRound] = useMutation(add_round);
  //set state on buttons
  const [input, setInput] = useState({roundId: '1', firstIn: false, lastIn: false, allMade: false});
  //start function to get value from form data
  function handleChange(event) {
    const target = event.target 
    //fix checkbox boolean
    const value = target.type === 'checkbox' ? target.checked : target.value;
   // const { value } = event.target;
    setInput({ ...input, [event.target.name]: value });
  }
  const handleSaveRound = async (e) => {
    //stop refresh on submit
    e.preventDefault(); 
    //get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      await addRound({ variables: input })
    } catch (err) {
      console.error(err);
    console.log("yo ish hit!")
    }
    refetch();
  };
  //refetch on new submit
  useEffect(() => {
    console.log(userData)

    refetch();
  }, [refetch, data]);
  //check form input
  useEffect(() => {
    console.log(input);
  }, [input])
  //check user info
  useEffect(() => {
    if(userData){
      console.log(userData);
      setRounds(userData.savedRounds)
    }
  }, [userData])

  return (
    <>
      <div id="main" className="wireFrame" style={{ width: 412, minHeight: 732 }}>
        <Navbar/>
        <div id="header">
          <p>PuttPuttPerfect</p>
          <p id="highscore">Recent High Score</p>
        </div>
        <div id="body" className="wireFrame">
          <div className="instructions">
            <strong>
              <p>
                Measure out the distance you want to practice
                <br />
                Select the distance in the drop down menu
                <br />
                Select the total about of putts made out of 10
                <br/>
                Press "Save Score" button to save results!
              </p>
            </strong>
          </div>
          <div className="playArea">
            <form onSubmit={(e) => {handleSaveRound(e);}}>
              <select name='distance' value={input.distance} onChange= {handleChange} className='distance'>
                <option>distance</option>
                <option>10 feet</option>
                <option>15 feet</option>
                <option>20 feet</option>
                <option>25 feet</option>
                <option>30 feet</option>
                <option>35 feet</option>
                <option>40 feet</option>
                <option>45 feet</option>
                <option>50 feet</option>
              </select>
              <select name='puttsMade' value={input.puttsMade} onChange= {handleChange} className='puttsMade'>
                <option>putts</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>            
              {/* <input
                type= 'text'
                name= 'puttsMadeTen'
                onChange= {handleChange}
                value= {input.puttsMadeTen}
                id={10}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  borderStyle: "solid",
                  borderWidth: 2
                }}
                defaultValue={"                "}
                ></input> */}
              <input onChange= {handleChange} type="checkbox" checked= {input.firstIn} name="firstIn"/>
              Made first
              <input onChange= {handleChange} type="checkbox" checked= {input.lastIn} name="lastIn"/>
              Made last
              <input onChange= {handleChange} type="checkbox" checked= {input.allMade} name="allMade"/>
              Made all
            <button className='submit' type="submit" style={{ width: 250, height: 50 }}>
              Save Score
            </button>
            </form>
          </div>
         <p className='distScore'><strong>Below are your results:</strong></p>
            <div className="outPut">
              {rounds !== undefined ? 
              rounds.map((round)=> 
              (<div className= "renderOutput">
              <div>{round.distance}</div>
              <div>{round.puttsMade}</div>
              </div>))
              : <></> }
              {/* <strong>
                <p>Your Total Score Is </p>
                <p id="output"> </p>
              </strong> */}
            </div>
          </div>
        </div>
    </>
  )
}

export default Dashboard