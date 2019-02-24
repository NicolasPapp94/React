import React, { Component } from 'react';
import './App.css';
import videos from '../../my-app/src/video.mp4';
import firebase from 'firebase';
var config = {
 <HERE GOES FIREBASE CONFIG>
};
var valores=[];
var valores_nuevo=[];
var fire = firebase.initializeApp(config);
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      datos: [],
      nuevo_registro:true,
      datos_nuevo: []
    };
    var ref = firebase.database().ref();
    var ref = firebase.database().ref().limitToLast(3);
      ref.on('value', function(snapshot) {
      var valores=[];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        valores.push(childData);
      });
      this.setState({
        datos: valores
      })
    }.bind(this));


    var ref = firebase.database().ref().limitToLast(1);
    ref.on('value', function(snapshot) {
      this.setState({
        nuevo_registro:true,
        datos_nuevo: []
      });
      valores_nuevo=[];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        valores_nuevo.push(childData);
        this.setState({
          datos_nuevo: valores_nuevo
        });
        setTimeout(
          function() {
            this.setState({
              nuevo_registro:false
            });
          }.bind(this),3000);
      }.bind(this));
    }.bind(this));



  }


  render() {
    if (!this.state.nuevo_registro){
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
                          <h1>{dato.nombre}</h1>
                          <h1>{dato.apellido}</h1>
                          <div className="LugarTurno">  
                            <h3> Dirigirse a: </h3>
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
  } else {
    return (
    <div className="App">
      {
        this.state.datos_nuevo.map((dato,index) =>
        <div className="ContenedorDatos" key={index}>
              <div className="DatosNuevos">                
                <h1>{dato.nombre} {dato.apellido}</h1>
                <h3> Dirigirse a: </h3>
                <h2> {dato.sala} </h2>
              </div>

        </div>
        )
      }  
    </div>
    );
  }
  }
}

export default App;
