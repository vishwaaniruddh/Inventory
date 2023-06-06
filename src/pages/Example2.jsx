import React, { useState, useEffect } from 'react'

export default function Example2() {
    const [countryItems, initCountry] = useState([])
    const fetchData = async () => {
        const response = await fetch('https://restcountries.com/v3.1/all')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            return response.json()
        }
    }
    useEffect(() => {
        fetchData()
            .then((res) => {
                initCountry(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])
    return (

        <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <div className="pcoded-content">
                    <div className="pcoded-inner-content">
                        <div className="main-body">
                            <div className="page-wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className='card-block'>
                                            <div className="row">
                                                <h2 className="mb-3">React HTTP Reqeust with Async Await Example</h2>
                                                {countryItems.map((item, idx) => {
                                                    return (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={idx}>
                                                            <div className="card h-100">
                                                                <div className="img-block">
                                                                    <img
                                                                        src={item.flags.svg}
                                                                        className="card-img-top"
                                                                        alt={item.name.common}
                                                                    />
                                                                </div>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{item.name.common}</h5>
                                                                </div>
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item">
                                                                        <strong>Capital:</strong> {item.capital}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        <strong>Population:</strong> {item.population}
                                                                    </li>
                                                                    <li className="list-group-item">
                                                                        <strong>Continent:</strong> {item.continents[0]}
                                                                    </li>
                                                                </ul>
                                                                <div className="card-body">
                                                                    <div className="d-grid">
                                                                        <a
                                                                            className="btn btn-dark"
                                                                            href="{item.maps.googleMaps}"
                                                                            target="_blank"
                                                                        >
                                                                            View Map
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
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
        </div >
    )
}