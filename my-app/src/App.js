import React, { Component } from 'react';
import './App.css';
import videos from '../../my-app/src/video.mp4';
import firebase from 'firebase';
var config = {
 <HERE GOES FIREBASE CONFIG>
};
var valores=[];
var fire = firebase.initializeApp(config);
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos: []
    };
  }

  componentDidMount(){
    var ref = firebase.database().ref().limitToLast(3);
      ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        valores.push(childData);
      });
      this.setState({
        datos: valores
      })
    }.bind(this));

  }








  render() {
    console.log(this.state);
    return (
      <div className="App">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8 VideoInicio">
                <video loop autoPlay muted className="ReproductorVideo">
                      <source src={videos} type="video/mp4"/>
                </video>
              </div>
              <div className="col-sm-4 PersonasInicio">
                    <div className="col-sm-12 ContenedorPersonas">
                        {
                        this.state.datos.map((dato,index) =>
                        <div className="col-sm-4 ContenedorPersona" key={index}>
                          <h2>{dato.nombre}</h2>
                          <h2>{dato.apellido}</h2>
                          <div className="LugarTurno">  
                            <h4> Dirigirse a: </h4>
                            <h2> {dato.sala} </h2>
                          </div>
                        </div>
                        )
                        }
                    </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
