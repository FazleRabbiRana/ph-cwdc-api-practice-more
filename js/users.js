const loadUser= async () => {
	const url = `https://randomuser.me/api/`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayUsers(data.results[0]);
	} catch (err) {
		loadingErrorMessage(err);
	}
}

// load comments directly on page load
loadUser();

// loading error message
const loadingErrorMessage = (error) => {
	console.log(error);
	const errorMessage = document.createElement('p');
	errorMessage.innerHTML = `<span class="d-block text-danger my-3">Something went wrong. Try again later.</span>`;
	document.getElementById('user').appendChild(errorMessage);
	document.getElementById('load_user_btn').setAttribute('disabled', 'true');
}

// display users
const displayUsers = user => {
	console.log(user);
	const userContainer = document.getElementById('user');
	const dobFull = user.dob.date;
	const birthday =  new Date(dobFull).toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	userContainer.textContent = '';
	userContainer.innerHTML = `
		<div class="user-img mx-auto">
			<img src="${user.picture.large}" alt="${user.name.title} ${user.name.last}" class="img-fluid w-100">
		</div>
		<div class="tab-content my-4" id="nav-tabContent">
			<div class="tab-pane fade show active" id="nav_name" role="tabpanel">
				<p class="user-title mb-2">User <b>name</b> is</p>
				<p class="user-value h4">${user.name.title} ${user.name.first} ${user.name.last}</p>
			</div>
			<div class="tab-pane fade" id="nav_dob" role="tabpanel">
				<p class="user-title mb-2">User <b>birthday</b> is</p>
				<p class="user-value h4">${birthday}</p>
			</div>
			<div class="tab-pane fade" id="nav_contact" role="tabpanel">
				<p class="user-title mb-2">User <b>email address</b> is</p>
				<p class="user-value h4">${user.email}</p>
			</div>
			<div class="tab-pane fade" id="nav_location" role="tabpanel">
				<p class="user-title mb-2">User <b>location</b> is</p>
				<p class="user-value mb-0">${user.location.street.number}, ${user.location.street.name}, ${user.location.city}</p>
				<p class="user-value mb-0">${user.location.state}, ${user.location.country}</p>
			</div>
		</div>
		<nav class="mt-4 mb-2 mb-sm-0">
			<div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
				<button class="nav-link fw-bold active" id="nav_name_tab" data-bs-toggle="tab" data-bs-target="#nav_name" type="button" role="tab" aria-selected="true">Name</button>
				<button class="nav-link fw-bold" id="nav_dob_tab" data-bs-toggle="tab" data-bs-target="#nav_dob" type="button" role="tab" aria-selected="false">DOB</button>
				<button class="nav-link fw-bold" id="nav_contact_tab" data-bs-toggle="tab" data-bs-target="#nav_contact" type="button" role="tab" aria-selected="false">Email</button>
				<button class="nav-link fw-bold" id="nav_location_tab" data-bs-toggle="tab" data-bs-target="#nav_location" type="button" role="tab" aria-selected="false">Location</button>
			</div>
		</nav>
	`;

	// show api location
	const apiUrl = `https://randomuser.me/api/`;
	const apiLocationElement = document.getElementById('api_location');
	apiLocationElement.innerHTML = `API collected from: <a href="${apiUrl}" target="_blank"><cite>${apiUrl}</cite></a>`;
}