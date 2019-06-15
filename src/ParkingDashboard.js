import React from 'react';

class ParkingDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      closest: "Calculating...",
    }
  }

  sortClosest() {
    //   3/0.1 Johnson
    //   5/0.2 Fluno
    //   5/0.3 N Park 
    //   5/0.3 State St Campus
    //   8/0.4 Grainger
    //   9/0.4 Overture
    //   12/0.6 HC White (up and down)
    //   13/0.7 State St Cap
    //   15/0.7 Union South
    //   16/0.8 Uni Ave
    //   18/0.9 Nancy Nicholas Hall
    //   18/0.9 Engineering Dr
    //   19/0.9 Cap North
    //   22/1.1 Brayton
    //   22/1.1 Gov East
    //   23/1.2 Observatory
    //   32/1.6 S Livingston
    //   42/2.1 Ubay
  }
 
  render() {
    return (
        <div>
            <h1>Closest available parking to the Kohl Center is: <span className="closest">{this.state.closest}</span></h1>
            
        </div>
    )
  }
}

export default ParkingDashboard;