import { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ImagePreview({match, id, showImg, setShowImg}) {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isZoomed, setZoom] = useState(false);
	const handleClose = () => setShowImg(false);

	useEffect(() => {
		if(id) {
			fetchQuery()
		}
	}, [id])

	const fetchQuery = async () => {
			try {
			const data = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
				method: 'GET',
				headers: {
					'Authorization': '563492ad6f91700001000001853f5d570a8044be9eea3302d626f9f2',
				},
			});
			const fetchImage = await data.json();
			const {src} = fetchImage;
			console.log(id)
			setResult(src);
			setLoading(false);
			// if (src) {
			// 	setOriginal(src.original);
			// 	setTiny(src.tiny);
			// }
			}
			catch(err) {
				setLoading(false);
				setError(err);
			}
		}

	const zoomImg = () => {
		// setLoading(true)
		// if(result === original) {
		// 	setResult(original)
		// }
		// else {
		// 	setResult(original)
		// }
		// setLoading(false)
		setZoom(prev => !prev);
		const fullImg= document.querySelector(".preview-img");
		if(fullImg.classList.contains("full-img")) {
			fullImg.classList.remove("full-img");
		}
		else {
			fullImg.classList.add("full-img");
		}
	}
	console.log(isZoomed);
	return (
		<div className="fullview-block">
			
			<Modal dialogClassName={isZoomed?'full-img': ''} show={showImg} onHide={handleClose}>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					{
						loading ? <div className="loader"><span className="loader-icon"></span></div>
							:
							<div className="preview-img">
								<img src={result.original} onClick={zoomImg} />
							</div>
					}
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default ImagePreview;
