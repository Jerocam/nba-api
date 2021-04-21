import React, {useState, useEffect} from 'react'

const Players = () => {
    const [loadState, loadSetState] = useState(false)
    const [playersState, playersSetState] = useState([])
    const [errorState, errorSetState] = useState(null)

    useEffect(() => {
        fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page=55", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "a9500b4c25msh1c6e462bfe9c887p1a2de3jsn2f4d0bc9e858",
		"x-rapidapi-host": "free-nba.p.rapidapi.com"
	}
    })
    .then(res => res.json())
    .then(response => {
	    console.log(response.data)
        playersSetState(response.data)
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
                <h1 className="p-2 text-white text-xl font-sans">PLAYERS INFORMATION</h1>
                <div class="flex flex-col m-5">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow border-b border-gray-300 sm:rounded-lg overflow-y-scroll" style={{height:'90vh'}}>
                    <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-green-500">
                        <tr>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            First Name
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            Last Name
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            Position
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            Team
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            Height
                        </th>
                        <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                            Weight
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {playersState.map(item =>(
                            <tr key={item.id}>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.first_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.last_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.position}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.team.full_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.height_feet} - {item.height_inches}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                    {item.weight_pounds}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}
// https://rapidapi.com/theapiguy/api/free-nba?endpoint=apiendpoint_3621fed2-e280-4bdf-9dd8-6a090b0ad7ac
export default Players