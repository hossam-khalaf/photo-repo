const PEXELS_KEY = '563492ad6f9170000100000109cf945da43148efb5a7c30d748f9fc5'
const mainContent = document.querySelector('.main-content')

// fetch('https://api.pexels.com/v1/curated?per_page=15')

// API Handling
const apiHandle = async (url) => {
	const data = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: PEXELS_KEY,
		},
	})

	return data.json()
}

// Data to => HTML
const insertHTNL = (data) => {
	const gallery = document.createElement('div')
	gallery.classList.add('gallery')
	data.forEach((photo) => {
		const photoBox = document.createElement('div')
		photoBox.classList.add('photo-box')
		photoBox.innerHTML = `
      <img src=${photo.src.medium} />
      <div class="profile">
        <a href=${photo.photographer_url}>${photo.photographer}</a>
        <a href=${photo.src.original}><i class="fas fa-download"></i></a>
      </div>`
		gallery.appendChild(photoBox)
	})
	mainContent.appendChild(gallery)
}

const curatedPhotos = async () => {
	const response = await apiHandle(
		'https://api.pexels.com/v1/curated?per_page=15'
	)
	insertHTNL(response.photos)
	console.log(response.photos)
}

curatedPhotos()
