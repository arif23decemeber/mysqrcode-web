import React, {Component} from 'react';
import DataTable from 'react-data-table-component';

import {
  Link
} from "react-router-dom";

const uri = 'http://localhost:3000/';




class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading : true,
      users : [],
      columns : [],

      nama : "",
      email : "",
      phone : "",
      status : "",

      param : ""
    }
  }

  alertDelete(id) {
    fetch(uri+'users', {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      method : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      },
      body : JSON.stringify({
        id : id
      })
    }).then(response => response.json())
    .then(json => {
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

  componentDidMount() {
    this.getUsers();
    const columns = [
      {
        name: 'Nama Lengkap',
        selector: 'nama',
        sortable: true,
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true,
      },
      {
        name: 'Phone',
        cell : row => <a href={"tel:"+row.phone}>{row.phone}</a>,
        sortable: true,
      },
      {
        name: 'Status Activated',
        selector: 'status_active',
        sortable: true,
      },
      {
        name: 'QR Code',
        button: true,
        cell: row =>
        <div>
          <Link to={'/detail/'+row.id}><button className="btn btn-info btn-sm"><i className="fas fa-qrcode fa-sm"></i> QR Code</button></Link>
        </div>,
      },
      {
        name: 'Actions',
        button: true,
        cell: row =>
        <div>
          <div className="modal fade" id={"logoutModal"+row.id} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Hapus item ini dari daftar</h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Anda yakin ingin menghapus "{row.nama}"?</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
                  <button className="btn btn-danger" data-dismiss="modal" onClick={()=>this.alertDelete(row.id)}>Hapus</button>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-danger btn-sm" data-toggle="modal" data-target={'#logoutModal'+row.id}><i className="fas fa-trash fa-sm"></i> Hapus</button>
        </div>,
      },
    ];
    this.setState({ columns : columns })
  }

  getUsers() {
    fetch(uri+'users', {
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
      this.setState({ loading: false, users:json })
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
      fetch(uri+'users', {
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
        },
        body : JSON.stringify({
          nama : this.state.nama,
          email : this.state.email,
          phone : this.state.phone,
          status_active : this.state.status
        })
      }).then(response => response.json())
      .then(json => {
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

  param = (event) => {
    this.setState({ param : event.target.value });
  }

  search = (e) => {
    e.preventDefault();
    fetch(uri+'search/users', {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
      },
      body : JSON.stringify({
        param : this.state.param,
      })
    }).then(response => response.json())
    .then(json => {
      this.setState({ loading: false, users:json })
    });
  }

  handleSort = (column, sortDirection) => console.log(column.selector, sortDirection);

  render() {
    return (
      <div id="page-top">
        <div id="wrapper">
          <div id="content-wrapper">
            <div id="content">
              <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                <div className="container">
                  <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                      <input type="text" className="form-control bg-light border-0 small" placeholder="Cari user..." aria-label="Search" aria-describedby="basic-addon2" onChange={this.param}/>
                      <div className="input-group-append">
                        <button className="btn btn-primary" onClick={this.search}>
                          <i className="fas fa-search fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </nav>
              <div className="container-fluid bg-white" style={{paddingTop: 70}}>
                <div className="row">
                  <div className="col-md-2">
                  </div>
                  <div className="col-md-8">
                    <h3 style={{fontWeight: 'bold', color: '#111'}}>Daftar Users</h3>
                    <span style={{color: '#555', fontSize: '12px'}}>Pilih QR untuk melihat code</span>
                    <br/>
                    <br/>
                    <div className="modal fade" id={"logoutModal"} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{fontWeight: 'bold', color: '#111'}}>Tambahkan User</h5>
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
                    <button className="btn btn-sm btn-primary" data-toggle="modal" data-target={'#logoutModal'}><i className="fas fa-plus fa-sm"></i> Tambahkan User</button>&nbsp;
                    <Link to={'/attendance'}><button className="btn btn-sm btn-success"><i className="fas fa-list fa-sm"></i> Kehadiran </button></Link>
                    <DataTable
                      columns={this.state.columns}
                      data={this.state.users}
                      onSort={this.handleSort}
                      pagination // optionally, a hook to reset pagination to page 1
                      persistTableHead
                    />
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


export default Home;
