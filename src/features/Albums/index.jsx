import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

Albums.propTypes = {
    album : PropTypes.object.isRequired,
};

function Albums({ album }) {
    return (
        <div className="album album--active album--special">
            <div className="album__thumbnal album__thumbnail--active">
                <img className="album_image" src={album.thumbnailUrl} alt={album.name} />
            </div>

            <p className="album__name">{ album.name }</p>
        </div>
        
    );
}

export default Albums;