import React, {useState, useEffect} from 'react'

const Teams = () => {
    const [loadState, loadSetState] = useState(false)
    const [teamState, teamSetState] = useState([])
    const [errorState, errorSetState] = useState(null)

    useEffect(() => {
        fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "a9500b4c25msh1c6e462bfe9c887p1a2de3jsn2f4d0bc9e858",
		"x-rapidapi-host": "free-nba.p.rapidapi.com"
	}
    })
    .then(res => res.json())
    .then(response => {
	    console.log(response.data)
        teamSetState(response.data)
        loadSetState(true)
    })
    .catch(err => {
	    console.error(err)
        errorSetState(err)
    })
    }, [])

    if(errorState){
        return <div className="text-yellow-200">Error: {errorState.message}</div>; }
    else if (!loadState){
        return <div><h2 className="text-white text-2xl">Loading...</h2></div>;}
    else {
        return (
            <div>
                <h1 className="p-3 text-white text-xl font-sans">TEAM INFORMATION</h1>
                <div className="flex flex-wrap mb-2">
                {teamState.map((item, key)=>(
                    <div className="w-full md:w-1/2 xl:w-1/3 p-2 md:pr-2" key={key}>
                        <div className="bg-blue-200 border rounded shadow p-5">
                            <div className="text-center sm:text-xs">
                                <h2 className="text-xl font-medium">
                                    {item.full_name} - {item.city}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )
    }
}
// https://rapidapi.com/theapiguy/api/free-nba?endpoint=apiendpoint_3621fed2-e280-4bdf-9dd8-6a090b0ad7ac
export default Teams