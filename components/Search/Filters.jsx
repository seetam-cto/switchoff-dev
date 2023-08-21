import React from 'react'

const Filters = ({res, filters, setFilter}) => {
  return (
    <div className="search-filters">
        {res && res.query != res.did_you_mean && <div className="search-filters-correction">
            Did you mean: <span>{res?.did_you_mean ?? ''}</span>
        </div>}
        <h3>Sort the results</h3>
        <div className="search-filters-filter">
            <div className="option">
                <span className="material-icons">
                    recommend
                </span>
                Recommended
            </div>
            <div onClick={() => setFilter({...filters, sort: 'low_to_high'})} className="option">
                <span className="material-icons">
                    trending_up
                </span>
                Price: Low to High
            </div>
            <div className="option">
                <span className="material-icons">
                    trending_down
                </span>
                Price: High to Low
            </div>
            <div className="option">
                <span className="material-icons">
                    stars
                </span>
                Guest Ratings
            </div>
            <div className="option">
                <span className="material-icons">
                    hotel_class
                </span>
                Property Class
            </div>
        </div>
        <h3>Select your budget</h3>
        <div className="search-filters-filter">
            <div className="option">
                <span className="material-icons">
                    chevron_left
                </span>
                ₹10,000
            </div>
            <div className="option">
                ₹10,000 - ₹30,000
            </div>
            <div className="option">
                ₹30,000 - ₹50,000
            </div>
            <div className="option">
                <span className="material-icons">
                chevron_right
                </span>
                ₹50,000
            </div>
        </div>
    </div>
  )
}

export default Filters