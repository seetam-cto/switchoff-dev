import { Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

const SearchResultCard = ({property}) => {
    const colorOptions = ['green', 'blue', 'red', 'yellow'];
    return (
        <div className="result-property-card">
            <div className="result-property-card-image">
                <Image src={property.image} width={300} height={100} objectFit='cover' alt={property.name} />
            </div>
            <div className="result-property-card-content">
                <h2 className='card-title'>{property.name}</h2>
                <p className="card-address">
                    {property.address.split(", ").slice(1).join(', ').slice(0,80)}{property.address.split(", ").slice(1).join(', ').length > 80 && "..."}
                </p>
                <div className="card-labels">
                    {property.matched_phrases?.map((ph, i) =>
                        <Tag color={colorOptions[i % colorOptions.length]} key={i}>
                            {ph.replace(/^\w/, (match) => match.toUpperCase())}
                        </Tag>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchResultCard