import React from 'react';
const axios = require('axios');

class ParkingDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      closest: "Calculating...",
      allJson: {0:""},
      jsonArr: [],
    }
    this.mergeJson = this.mergeJson.bind(this)

  }

  mergeJson(smallObj, numKey=false) {
    var bigObj = this.state.allJson;
    var newJsonArr = [];
    var padding = "";
    if(numKey) {
      padding = " ";
    }
    for (var key in smallObj) {
      Object.assign(bigObj[key+padding], smallObj[key])
      
    };
    for (var key in bigObj) {
      newJsonArr.push(bigObj[key])
      
    };
    this.setState({
      allJson: bigObj,
      jsonArr: newJsonArr
    });
    this.findClosest();
  }
  componentDidMount() {
    this.sortClosest();
    var uwData = axios.get('https://gates.transportation.wisc.edu/occupancy/', { 
      // crossdomain: true,
      // headers: { 
      //   "Content-Type": "application/x-www-form-urlencoded"
      // }
    })
    .then((response) => {
      // handle success
      // var uwJson = response.data['Central Campus'] + response.data['East Campus'] + response.data['West Campus'] + response.data['South Campus'];
      var uwJson = Object.assign(response.data['Central Campus'], response.data['East Campus'], response.data['West Campus'], response.data['South Campus']);
      this.mergeJson(uwJson);
    })
    .catch(function (error) {
      // handle error
    });

    var proxyURL = "https://cors-anywhere.herokuapp.com/";
    // var madisonData = axios.get('localhost:4000/cityparking', { 
    var madisonData = axios.get(proxyURL + 'https://www.cityofmadison.com/parking-utility/data/ramp-availability.json', { 
      // crossdomain: true,
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then( (response) => {
      // handle success
      var madisonJson = response.data;
      this.mergeJson(response.data,true);

    })
    .catch(function (error) {
      // handle error
    })
    // fetch('https://www.cityofmadison.com/parking-utility/data/ramp-availability.json', {
    //   mode: 'no-cors'
    // })
    //   // .then(function(response) {
    //   //   return response.json();
    //   // })
    //   .then(function(myJson) {
    //   })
  }

  findClosest() {
    var allJson = this.state.allJson;
    for (var key in allJson) {
      var vacancies = allJson[key].vacancies || allJson[key].vacant_stalls
      if(vacancies > 10) {
        this.setState({
          closest: allJson[key].name
        });
        break;
      }
      
    };
  }
  sortClosest() {
    var sortedJson = {
        "046  LAKE & JOHNSON RAMP" : { name: "Johnson", min: "3", distance: "0.1" },
        "083  FLUNO CENTER GARAGE" : { name: "Fluno", min: "5", distance: "0.2" },
        "029  N PARK STREET RAMP" : { name: "N Park", min: "5", distance: "0.3" },
        "5 " : { name: "State St Campus", min: "5", distance: "0.3" },
        "007  GRAINGER HALL GARAGE" : { name: "Grainger", min: "8", distance: "0.4" },
        "3 " : { name: "Overture", min: "9", distance: "0.4" },
        "006U HC WHITE GARAGE UPPR" : { name: "HC White Upper", min: "12", distance: "0.6" },
        "006L HC WHITE GARAGE LOWR" : { name: "HC White Lower", min: "12", distance: "0.6" },
        "6 " : { name: "State St Cap", min: "13", distance: "0.7" },
        "080  UNION SOUTH GARAGE" : { name: "Union South", min: "15", distance: "0.7" },
        "020  UNIVERSITY AVE RAMP" : { name: "Uni Ave", min: "16", distance: "0.8" },
        "027  NANCY NICHOLAS HALL GARAGE" : { name: "Nancy Nicholas Hall", min: "18", distance: "0.9" },
        "017 ENGINEERING DR RAMP" : { name: "Engineering Dr", min: "18", distance: "0.9" },
        "1 " : { name: "Cap North", min: "19", distance: "0.9" },
        "0 " : { name: "Brayton", min: "22", distance: "1.1" },
        "2 " : { name: "Gov East", min: "22", distance: "1.1" },
        "036  OBSERVATORY DR RAMP" : { name: "Observatory", min: "23", distance: "1.2" },
        "4 " : { name: "S Livingston", min: "32", distance: "1.6" },
        "076  UNIV BAY DRIVE RAMP" : { name: "Ubay", min: "42", distance: "2.1" },
    }
    this.setState({
      allJson: sortedJson
    })

  }
 
  render() {
    return (
        <div>
            <h1>Closest available parking to the Kohl Center is: <span className="closest">{this.state.closest}</span></h1>
            {this.state.jsonArr.map((garage, i) => {     
                // Return the element. Also pass key     
                return (
                  <div>
                    {garage.name} ({garage.vacant_stalls || garage.vacancies} Spots open / {garage.distance} mi walk)
                  </div>
                ) 
              })
            }
        </div>
    )
  }
}

export default ParkingDashboard;