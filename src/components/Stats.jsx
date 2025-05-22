import { useAuth } from "../context/AuthContext"
import { calculateCoffeeStats, calculateCurrentCaffeineLevel,
     getTopThreeCoffees, statusLevels } from "../Utils"

function StatsCard (props){
    const { lg, title, children } = props
    return(
        <div className={"card stat-card  " + (lg ? 'col-span-2' : 2)} >
            <h4>{title}</h4>
            {children}
        </div>
    )
}

export function Stats (){

const { globalData } = useAuth()

    const stats = calculateCoffeeStats(globalData)

    const caffeineLevel = calculateCurrentCaffeineLevel(globalData)
    const warningLevel =  caffeineLevel < statusLevels['low'].maxLevel ?
        'low' :
        caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' :
            'high'

    return(
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple"></i>
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatsCard lg title="Active caffeine Level">
                    <div className="stattus">
                        <p> <span className="stat-text">{caffeineLevel}</span>mg</p>
                        <h4 
                        style={{ color:statusLevels[warningLevel].color, 
                        background:statusLevels[warningLevel].background}
                        }> {warningLevel}</h4>
                        <p>{statusLevels[warningLevel].description}</p>
                    </div>
                </StatsCard>
                <StatsCard title="Daily Caffeine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span></p>
                </StatsCard>
                <StatsCard title="Avg # of Coffees">
                      <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatsCard>
                <StatsCard title=" Daily Cost">
                     <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatsCard>
                <StatsCard title="Total Cost">
                       <p>$ <span className="stat-text">{stats.total_cost}</span></p>
                </StatsCard>
                <table className="stats-table">
                    <thead>
                        <tr>
                            <th>Coffee name</th>
                            <th>Number of purchase</th>
                            <th> Percentage of Total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(globalData).map((coffee, coffeeIndex)=>{
                            return(
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}