import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ImagePreview from './ImagePreview';

// import { Modal, Button } from 'react-bootstrap';

function Images({result}) {
	const [id, setId] = useState();
	const [show, setShow] = useState(false);

	const showImg = (imgId) => {
		setId(imgId)
		setShow(true);

	}
	console.log(id)
	return(
			<div className="gallery-grid">
				{
					result && result.length ? // result is passing and and result has length then it will do map
					result.map(data => {
						return (
							//set route for specific image
							//<Link to={`/image/${data.id}`><<img src={data.src.medium} key={data.id}</Link}
							<img className="gallery-img" src={data.src.medium} key={data.id} onClick={() => showImg(data.id)} />
						)
					})
					: ''
				}
			{/* <modal visible={show} id={ } /> */}
			{

					<ImagePreview id={id} showImg={show} setShowImg={setShow}/>

			}
			</div>
	)
}

export default Images;
