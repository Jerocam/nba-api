import React, {useState, useEffect} from 'react'

const Games = () => {
    const [loadState, loadSetState] = useState(false)
    const [gameState, gameSetState] = useState([])
    const [errorState, errorSetState] = useState(null)

    useEffect(() => {
        fetch("https://free-nba.p.rapidapi.com/games?page=0&per_page=25", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-key": "a9500b4c25msh1c6e462bfe9c887p1a2de3jsn2f4d0bc9e858",
		"x-rapidapi-host": "free-nba.p.rapidapi.com"
	}
    })
    .then(res => res.json())
    .then(response => {
	    console.log(response.data)
        gameSetState(response.data)
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
        <h1 className="p-2 text-white text-xl font-sans">GAMES RESULTS</h1>
        <div class="flex flex-col m-5">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow border-b border-gray-300 sm:rounded-lg overflow-y-scroll" style={{height:'90vh'}}>
                <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-red-500">
                    <tr>
                    <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                        Home Team
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                        Visitor Team
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                        Date
                    </th>
                    <th scope="col" class="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">
                        Final score
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {gameState.map(item =>(
                        <tr key={item.id}>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                <div class="ml-4">
                                    <div class="text-md font-medium text-gray-900">
                                    {item.home_team.full_name}
                                    </div>
                                    <div class="text-md text-gray-500">
                                    {item.home_team.city}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                <div class="ml-4">
                                    <div class="text-md font-medium text-gray-900">
                                    {item.visitor_team.full_name}
                                    </div>
                                    <div class="text-md text-gray-500">
                                    {item.visitor_team.city}
                                    </div>
                                </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-md leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {item.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                                {(new Date(item.date)).toLocaleDateString()}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                                {item.home_team_score} - {item.visitor_team_score}
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
export default Games