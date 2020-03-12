import React, {Component} from 'react';
import DataTable from 'react-data-table-component';

import Moment from 'react-moment';

import {
  Link
} from "react-router-dom";

const uri = 'http://localhost:3000/';

class Kehadiran extends Component {
  constructor() {
    super();
    this.state = {
      loading : true,
      list : [],
      columns: [],
      param : ""
    }
  }

  alertDelete(id) {
    fetch(uri+'attendance', {
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
    this.getAttendance();
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
        name: 'Tanggal Attendance',
        cell : row => <Moment format="YYYY/MM/DD">{row.created_at}</Moment>,
        sortable: true,
      },
      {
        name: 'Jam Clock In',
        cell : row => <Moment format="HH:mm">{row.created_at}</Moment>,
        sortable: true,
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

  getAttendance() {
    fetch(uri+'attendance', {
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
      this.setState({ loading: false, list:json })
    });
  }


  param = (event) => {
    this.setState({ param : event.target.value });
  }

  search = (e) => {
    e.preventDefault();
    fetch(uri+'search/attendance', {
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
      this.setState({ loading: false, list:json })
    });
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
                  <div className="col-md-8">

                    <h3 style={{fontWeight: 'bold', color: '#111'}}>Daftar Kehadiran</h3>
                    <br/>
                    <br/>
                    <div className="row">
                      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 navbar-search">
                        <div className="input-group">
                          <input type="text" className="form-control bg-light border-0 small" placeholder="Cari kehadiran..." aria-label="Search" aria-describedby="basic-addon2" onChange={this.param}/>
                          <div className="input-group-append">
                            <button className="btn btn-danger" onClick={this.search}>
                              <i className="fas fa-search fa-sm"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                      <Link to={'/'}><button className="btn btn-sm btn-primary"><i className="fas fa-list fa-sm"></i> Daftar User </button></Link>
                    </div>
                    <DataTable
                      columns={this.state.columns}
                      data={this.state.list}
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

export default Kehadiran;
