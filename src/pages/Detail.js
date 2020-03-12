import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";

const uri = 'http://localhost:3000/';


class Detail extends Component {
  constructor(props) {
    super();
    this.state = {
      loading : true,
      detail : "",

      nama : "",
      email : "",
      phone : "",
      status : ""
    }
  }

  componentDidMount() {
    this.getDetail();
  }

  getDetail() {
    const { id } = this.props.match.params;
    fetch(uri+'users/'+id, {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      method : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      },
    }).then(response => response.json())
    .then(json => {
      setTimeout(()=>{
        this.setState({ details:json, loading : false });
      }, 1000);
    });
  }

  nama = (event) => {
    this.setState({ nama : event.target.value });
  }

  email = (event) => {
    this.setState({ email : event.target.value });
  }

  phone = (event) => {
    this.setState({ phone : event.target.value });
  }

  status = (event) => {
    this.setState({ status : event.target.value });
  }

  submit = (e) => {
    e.preventDefault();
    if(this.state.nama.trim() == ""){
      alert("Nama harus diisi!")
    } else if(this.state.email.trim() == ""){
      alert("Email harus diisi!")
    } else if (this.state.phone.trim() == "") {
      alert("Phone harus diisi!");
    } else if (this.state.status.trim() == "") {
      alert("Status harus diisi!");
    } else {
      const { id } = this.props.match.params;
      fetch(uri+'users/', {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        method : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          id : this.state.details.id,
        	nama : this.state.nama,
        	email : this.state.email,
        	phone : this.state.phone,
        	status_active : this.state.status
        })
      }).then(response => response.json())
      .then(json => {
        console.log(json);
        if(json.status == "success") {
          window.location.reload();
        } else if(json.status == "failed"){
          window.location.reload();
          setTimeout(()=> {
            alert(json.message);
          }, 1000)
        }
      });
    }
  }

  render() {
    return (
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
              </nav>
              <div className="container-fluid bg-white" style={{paddingTop: 70}}>
                <div className="row">
                  <div className="col-md-2">
                  </div>
                  <div className="col-md-5">
                    <h3 style={{fontWeight: 'bold', color: '#111'}}>Detail Pemegang saham</h3>
                    <br/>
                    {
                      (!this.state.loading) &&
                      <button className="btn btn-sm btn-primary" data-toggle="modal" data-target={'#logoutModal'} ><i className="fas fa-edit fa-sm"></i> Perbarui User</button>
                    }
                    <br/><br/>

                    {
                      (this.state.loading) &&
                      <div>Sedang mengambil data...</div>
                    }
                    {
                      (!this.state.loading) &&
                      <div className="card shadow">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-7">
                              <h4>PROFILE</h4>
                              <table>
                                <tbody>
                                  <tr>
                                    <td style={{color: '#111', fontWeight: 'bold'}}>Name</td><td>:</td><td style={{color: '#111'}}>{this.state.details.nama}</td>
                                  </tr>
                                  <tr>
                                    <td style={{color: '#111', fontWeight: 'bold'}}>Email</td><td>:</td><td style={{color: '#111'}}>{this.state.details.email}</td>
                                  </tr>
                                  <tr>
                                    <td style={{color: '#111', fontWeight: 'bold'}}>Phone</td><td>:</td><td style={{color: '#111'}}>{this.state.details.phone}</td>
                                  </tr>
                                  <tr>
                                    <td style={{color: '#111', fontWeight: 'bold'}}>Status</td><td>:</td><td style={{color: '#111'}}>{this.state.details.status_keaktifan}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-5">
                              <img className="img-responsive" src={this.state.details.qr_code}/>
                            </div>
                          </div>
                          <div className="modal fade" id={"logoutModal"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel" style={{fontWeight: 'bold', color: '#111'}}>Perbarui data user</h5>
                                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="form-group">
                                      <label style={{fontWeight: 'bold'}}>Nama</label>
                                      <input className="form-control" onChange={this.nama}/>
                                    </div>
                                    <div className="form-group">
                                      <label style={{fontWeight: 'bold'}}>Email</label>
                                      <input className="form-control" onChange={this.email}/>
                                    </div>
                                    <div className="form-group">
                                      <label style={{fontWeight: 'bold'}}>Phone</label>
                                      <input className="form-control" onChange={this.phone}/>
                                    </div>
                                    <div className="form-group">
                                      <label style={{fontWeight: 'bold'}}>Status Active</label>
                                      <select className="form-control" onChange={this.status}>
                                        <option value="">Pilih</option>
                                        <option value="TRUE">TRUE</option>
                                        <option value="FALSE">FALSE</option>
                                      </select>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
                                  <button className="btn btn-primary" onClick={this.submit}>Perbarui</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                  <div className="col-md-2">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Detail;
