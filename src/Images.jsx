import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Images({result}) {
	console.log(result)
	return(
			<div className="gallery-grid">
				{
					result && result.length ? // result is passing and and result has length then it will do map
					result.map(data => {
						return (
							<Link target="_blank" to={`/image/${data.id}`}> <img className="gallery-img" src={data.src.medium} key={data.id} /> </Link>
						)
					})
					: ''
				}
				
			</div>
	)
}

export default Images;
