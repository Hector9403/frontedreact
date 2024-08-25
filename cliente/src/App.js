import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-dark-purple/theme.css";

import { ClienteService } from './services/ClienteService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { MessageSeverity } from 'primereact/api';
        
              
                

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      visible:false,
      cliente:{
        iduser:null,
        nombre:null,
        apellido:null,
        celular:null,
        email:null
      },
      selectedCliente:{

      }
    };

    this.items=[ // Definición de los elementos del menú
      {
        label:"Nuevo",
        icon:"pi pi-fw pi-user-plus",
        command: ()=>{this.showSaveDialog()}
      },
      {
        label:"Editar",
        icon:"pi pi-fw pi-user-edit",
        command: ()=>{alert("Edited")}
      },
      {
        label:"Eliminar",
        icon:"pi pi-fw pi-user-minus",
        command: ()=>{this.delete()}
      }
    ];
    this.clienteService = new ClienteService();
    this.save= this.save.bind(this);
    this.footer =( // Footer del diálogo
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
      </div>
    )
    this.Toast = React.createRef();
  }

  componentDidMount(){ // Carga inicial de clientes al montar el componente
    this.clienteService.getAll().then(data => this.setState({clientes: data})) 

  }

  save(){ // Guarda un nuevo cliente y actualiza la lista
    this.clienteService.save(this.state.cliente).then(data =>{ // Guarda un nuevo cliente y actualiza la lista
      this.setState({
        visible:false,
        cliente:{
          iduser:null,
          nombre:null,
          apellido:null,
          celular:null,
          email:null
        }
      });
      this.Toast.current.show({severity:"success", summary:"Atencion", detail:"Se guardo correctamente el registro",});
      this.clienteService.getAll().then(data => this.setState({clientes: data}))
    })
    
  }

  delete(){ // Elimina un cliente seleccionado
    if(window.confirm("¿Desea eliminar el registro?")){
      this.clienteService.delete(this.state.selectedCliente.iduser).then(data=>{
        this.Toast.current.show({severity:"success", summary:"Atencion", detail:"Se elimino el registro correctamenet",});
        this.clienteService.getAll().then(data => this.setState({clientes: data}))
      })
    }
  }

  update() {  // Actualiza un cliente existente
    this.clienteService.update(this.state.cliente).then(data => {
      this.setState({
        visible: false,
        cliente: {
          iduser: null,
          nombre: null,
          apellido: null,
          celular: null,
          email: null
        }
      });
      this.Toast.current.show({ severity: "success", summary: "Atención", detail: "Se actualizó correctamente el registro" });
      this.clienteService.getAll().then(data => this.setState({ clientes: data }));
    });
  }

  render(){
    return(
   <div style={{width:"80%", margin:"20px auto 0px"}}>
    <Menubar model={this.items} />
    <br/>
      <Panel header="Clientes Asmevet" >
      <DataTable value={this.state.clientes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectionMode="single" selection={this.state.selectedCliente}
      onSelectionChange={(e)=> this.setState({selectedCliente: e.value})}>
        <Column field='iduser' header= "ID"></Column>
        <Column field='nombre' header= "Nombres"></Column>
        <Column field='apellido' header= "Apellidos"></Column>
        <Column field='celular' header= "Celular"></Column>
        <Column field='email' header= "Email"></Column>
     </DataTable>
    </Panel>

    <Dialog header="Clientes" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({visible:false})}>
    
    <FloatLabel>
    <InputText style={{width:"100%"}} value={this.state.value} id="iduser" onChange={(e) => {
      let val = e.target.value;
      
      this.setState(prevState => {
      let cliente=Object.assign({}, prevState.cliente);
      cliente.iduser= val;
      return {cliente};
    })}
    }/>
    <label for="iduser">Id usuario</label>
    </FloatLabel> <br/>

    <FloatLabel>
    <InputText style={{width:"100%"}} value={this.state.value} id="nombre" onChange={(e) => {
      let val = e.target.value;
      
      this.setState(prevState => {
      let cliente=Object.assign({}, prevState.cliente);
      cliente.nombre= val;
      return {cliente};
    })}
    }/>
    <label for="nombre">Nombres</label>
    </FloatLabel> <br/>

    <FloatLabel>
    <InputText style={{width:"100%"}} value={this.state.value} id="apellido" onChange={(e) => {
      let val = e.target.value;
      
      this.setState(prevState => {
      let cliente=Object.assign({}, prevState.cliente);
      cliente.apellido= val;
      return {cliente};
    })}
    }/>
    <label for="apellido">Apellidos</label>
    </FloatLabel> <br/>

    <FloatLabel>
    <InputText style={{width:"100%"}} value={this.state.value} id="celular" onChange={(e) => {
      let val = e.target.value;
      
      this.setState(prevState => {
      let cliente=Object.assign({}, prevState.cliente);
      cliente.celular= val;
      return {cliente};
    })}
    }/>
    <label for="celular">Celular</label>
    </FloatLabel> <br/>

    <FloatLabel>
    <InputText style={{width:"100%"}} value={this.state.value} id="email" onChange={(e) => {
      let val = e.target.value;
      
      this.setState(prevState => {
      let cliente=Object.assign({}, prevState.cliente);
      cliente.email= val;
      return {cliente};
    })}
    }/>
    <label for="email">Email</label>
    </FloatLabel> <br/>
    </Dialog>
    <Toast ref={this.Toast}/>
    </div>


    );
  }
showSaveDialog(){  // Actualiza un cliente existente
  this.setState({
    visible:true,
    cliente:{
      iduser:null,
      nombre:null,
      apellido:null,
      celular:null,
      email:null
    }
  });
}

}