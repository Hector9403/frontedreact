import axios from "axios"; // Clase que maneja las operaciones relacionadas con los clientes


export class ClienteService{
    baseUrl = "http://localhost:8080/cliente";  // URL base para las peticiones a la API del cliente

    
    getAll(){ // Método para obtener todos los clientes
        return axios.get(this.baseUrl + "/mostrar").then(res=>res.data); // Realiza una solicitud GET a la API y retorna los datos de la respuesta
    }

    save(cliente){  // Método para guardar un nuevo cliente
        return axios.post(this.baseUrl + "/nuevo", cliente).then(res =>res.data);  // Realiza una solicitud POST para agregar un nuevo cliente y retorna los datos de la respuesta

    }

    update(cliente) { // Método para actualizar un cliente existente
        return axios.put(this.baseUrl + "/modificar", cliente).then(res => res.data);  // Realiza una solicitud PUT para modificar un cliente y retorna los datos de la respuesta
    }

    delete(iduser){ // Método para eliminar un cliente por ID
        return axios.post(this.baseUrl + "/delete/" + iduser).then(res=>res.data); // Realiza una solicitud POST para eliminar un cliente según su ID y retorna los datos de la respuesta
    }
    
}

