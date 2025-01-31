class Api{
  constructor(url){
    this._url = url;
  }
  _getAllDocentes() {
    return fetch(`${this._url}/docente`)
  }
  _getDocenteById(id) {
    return fetch(`${this._url}/docente/${id}`)
  }
  _getTools() {
    return fetch(`${this._url}/herramienta`)
  }
  _getObjetive(id) {
    return fetch(`${this._url}/herramienta/${id}`);
  }

}


const api = new Api('http://localhost:5000/api/v1')

export default api;