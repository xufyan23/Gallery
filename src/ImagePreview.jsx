import { useState, useRef, useEffect } from 'react';

function ImagePreview({match}) {
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchQuery()
	}, [])

	const fetchQuery = async () => {
			try {
			const data = await fetch(`https://api.pexels.com/v1/photos/${match.params.id}`, {
				method: 'GET',
				headers: {
					'Authorization': '563492ad6f91700001000001853f5d570a8044be9eea3302d626f9f2',
				},
			});
			const fetchImage = await data.json();
			const {src} = fetchImage;
			console.log(src)
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
		
		const fullImg= document.querySelector(".preview-img");
		if(fullImg.classList.contains("full-img")) {
			fullImg.classList.remove("full-img");
		}
		else {
			fullImg.classList.add("full-img");
		}
	}

	return (
		<div className="fullview-block">
			{
				loading ? <div className="loader"><span className="loader-icon"></span></div>
				:
				<div className="preview-img">
					<img src={result.original} onClick={zoomImg}/>
				</div>
			}
		</div>
	);
}

export default ImagePreview;
