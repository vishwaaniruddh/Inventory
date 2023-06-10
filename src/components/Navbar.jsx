import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { getToken, getUser, removeUserSession, getUserName } from '../Utils/Common';
import swal from 'sweetalert';
import cssimg from '../css.png';

function Navbar(props) {
  const username = getUserName();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [collapse, setCollapse] = useState(false);
  const [rightSetting, setRightSetting] = useState(false);
  const userid = getUser();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://sarmicrosystems.in/react_inventory/API/admin/getMenu.php`, {
      method: 'POST',
      body: JSON.stringify({
        userid: userid,
      })
    })
      .then(res => res.json())
      .then((response) => {
        setData(response);
        setLoading(false);
      });
  }, []);

  const handleClick = (e) => {
    e.currentTarget.classList.toggle('pcoded-trigger');
  };

  const mobileCollapseHandle = () => {
    setCollapse(!collapse);
  };

  const rightSettingHandle = () => {
    setRightSetting(!rightSetting);
  };

  const handleLogout = () => {
    removeUserSession();
    swal("Good job", "Logout successfully!", "success").then(function () {
      window.location.reload();
      props.history.push('/login');
    });
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!getToken()) {
    return null;
  } else {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <header className="pcoded-header navbar-expand-lg navbar-light">
            <div className="m-header">
              <button className="mobile-menu" id="mobile-collapse1" onClick={mobileCollapseHandle}>
                <span></span>
              </button>
              <a href="/" className="b-brand">
                <div className="" style={{ background: 'white', borderRadius: '50px' }}>
                  <img src={cssimg} style={{ width: '60px' }} alt="Logo" />
                  <i className="feather icon-trending-up"></i>
                </div>
                <span className="b-title">Inventory</span>
              </a>
            </div>

            <button className="mobile-menu" id="mobile-header">
              <i className="feather icon-more-horizontal"></i>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li>
                  <div className="dropdown">
                    <a href="#" className={rightSetting ? 'dropdown-toggle show' : 'dropdown-toggle'} onClick={rightSettingHandle} data-bs-toggle="dropdown" aria-expanded="true">
                      <i className="fa-solid fa-gear"></i>
                    </a>
                    <div className={rightSetting ? 'dropdown-menu dropdown-menu-end profile-notification show' : 'dropdown-menu dropdown-menu-end profile-notification'} data-bs-popper="none">
                      <div className="pro-head">
                        <span>{username}</span>
                        <a href="#" onClick={handleLogout} className="dud-logout" title="Logout">
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </header>

          <nav className={`pcoded-navbar menupos-fixed ${isMobile && collapse === true ? 'mob-open' : ''} ${isMobile ? 'menupos-fixed' : ''} ${collapse ? 'menupos-fixed' : ''} ${collapse ? 'navbar-collapsed' : ''}`}>
            <div className="navbar-wrapper">
              <div className="navbar-brand header-logo">
                <a href="/dashboard" className="b-brand">
                  <img src={cssimg} style={{ width: '60px', background: 'white', borderRadius: '50px' }} alt="Logo" />
                  <span className="b-title">Inventory</span>
                </a>
                <button className={`mobile-menu ${collapse ? 'on' : ''}`} id="mobile-collapse" onClick={mobileCollapseHandle}>
                  <span></span>
                </button>
              </div>
              <div className="navbar-content scroll-div active pcoded-trigger ps ps--active-y">
                <ul className="nav pcoded-inner-navbar" style={{ display: 'block' }}>
                  {loading ? (
                    <li>Loading...</li>
                  ) : (data &&
                    data.map((item, index) => (
                      <li
                        key={index}
                        className={item?.child === "1" ? "nav-item pcoded-hasmenu" : "nav-item"}
                        onClick={handleClick}
                      >
                        {item?.child === "1" ? (
                          item.href ? (
                            <NavLink to={item.href} activeClassName="active" className="nav-link">
                              {item?.title === 'Masteradmin' ? (
                                <AiIcons.AiFillHome />
                              ) : item?.title === 'Material' ? (
                                <AiIcons.AiFillProject />
                              ) : item?.title === 'Inventory' ? (
                                <AiIcons.AiFillShop />
                              ) : item?.title === 'Data' ? (
                                <AiIcons.AiFillProject />
                              ) : (
                                ''
                              )}
                              <span className="pcoded-mtext">{item?.title}</span>
                            </NavLink>
                          ) : (
                            <button className="nav-link" style={{
                              background: 'transparent',
                              border: 'none',
                              color: 'white',
                              fontSize: '13px'
                            }}  >
                              {item?.title === 'Masteradmin' ? (
                                <AiIcons.AiFillHome />
                              ) : item?.title === 'Material' ? (
                                <AiIcons.AiFillProject />
                              ) : item?.title === 'Inventory' ? (
                                <AiIcons.AiFillShop />
                              ) : item?.title === 'Data' ? (
                                <AiIcons.AiFillProject />
                              ) : (
                                ''
                              )}
                              <span className="pcoded-mtext">{item?.title}</span>
                            </button>
                          )
                        ) : (
                          item.href ? (
                            <Link to={item.href} className="nav-link">
                              {item?.title === 'Masteradmin' ? (
                                <AiIcons.AiFillHome />
                              ) : item?.title === 'Material' ? (
                                <AiIcons.AiFillProject />
                              ) : item?.title === 'Inventory' ? (
                                <AiIcons.AiFillShop />
                              ) : item?.title === 'Data' ? (
                                <AiIcons.AiFillProject />
                              ) : (
                                ''
                              )}
                              <span className="pcoded-mtext">{item?.title}</span>
                            </Link>
                          ) : (
                            <button className="nav-link">
                              {item?.title === 'Masteradmin' ? (
                                <AiIcons.AiFillHome />
                              ) : item?.title === 'Material' ? (
                                <AiIcons.AiFillProject />
                              ) : item?.title === 'Inventory' ? (
                                <AiIcons.AiFillShop />
                              ) : item?.title === 'Data' ? (
                                <AiIcons.AiFillProject />
                              ) : (
                                ''
                              )}
                              <span className="pcoded-mtext">{item?.title}</span>
                            </button>
                          )
                        )}

                        {item?.child === '1' ? (
                          <ul className="pcoded-submenu" style={{ boxSizing: 'border-box' }}>
                            {item.submenu.map((sub, subindex) => (
                              <li className="" key={subindex}>
                                {sub.path ? (
                                  <NavLink to={sub.path}>{sub.title}</NavLink>
                                ) : (
                                  <button>{sub.title}</button>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>

                    ))

                  )
                  }



                  <li>
                    <button className="nav-link" style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      fontSize: '13px'
                    }} onClick={handleLogout} >
                      <AiIcons.AiOutlineLogout />
                      <span>
                        Logout
                      </span>


                    </button>
                  </li>



                </ul>



                <div className="ps__rail-x">
                  <div className="ps__thumb-x" tabIndex="0"></div>
                </div>
                <div className="ps__rail-y">
                  <div className="ps__thumb-y" tabIndex="0"></div>
                </div>
              </div>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;
