import React from 'react';


function Home(props) {
  return (
    <div className="pcoded-main-container">
      <div className="pcoded-wrapper">
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <div className="main-body">
              <div className="page-wrapper">
                <div className="row">
                  <div className="col-md-6 col-xl-4">
                    <div className="card">
                      <div className="card-block">
                        <h6 className="mb-4">Daily Sales</h6>
                        <div className="row d-flex align-items-center">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$249.95</h3>
                          </div>
                          <div className="col-3 text-end">
                            <p className="m-b-0">67%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-xl-4">
                    <div className="card">
                      <div className="card-block">
                        <h6 className="mb-4">Monthly Sales</h6>
                        <div className="row d-flex align-items-center">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-10"></i>$2.942.32</h3>
                          </div>
                          <div className="col-3 text-end">
                            <p className="m-b-0">36%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="col-md-12 col-xl-4">
                    <div className="card">
                      <div className="card-block">
                        <h6 className="mb-4">Yearly Sales</h6>
                        <div className="row d-flex align-items-center">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-10"></i>$8.638.32</h3>
                          </div>
                          <div className="col-3 text-end">
                            <p className="m-b-0">80%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;







