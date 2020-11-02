import React from 'react';
import './index.css';

function ItemCard(props) {
    return (
        <div className="item-card">
            <img className="item-card__img" src={props.imgSrc} alt="" />
            <div className="item-card__info">
                <span className="info__name">
                    {
                        props.name
                    }
                </span>
                <span className="info__description">
                    {
                        props.description
                    }
                </span>
            </div>
        </div>
    );
};

export default ItemCard;