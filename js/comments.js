// load comments
const loadComments = async () => {
	const url = `https://jsonplaceholder.typicode.com/comments`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayComments(data);
	} catch (err) {
		errorMessage(err);
	}
};

// load comments directly on page load
loadComments();

// loading error message
const errorMessage = (error) => {
	console.log(error);
	const errorMessage = document.createElement('p');
	errorMessage.innerHTML = `<span class="d-block text-danger my-3">Something went wrong. Try again later.</span>`;
	document.getElementById('all_comments').appendChild(errorMessage);
	// document.getElementById('load_comments_btn').style.display = 'none';
}

// display comments
const displayComments = comments => {
	// console.log(comments);
	// show comments
	const commentsContainer = document.getElementById('all_comments');
	comments.slice(0, 50).forEach(comment => {
		// console.log(comment);
		const singleComment = document.createElement('div');
		singleComment.classList.add('col', 'comment', 'py-3');
		singleComment.setAttribute('onclick', `loadDetailsById(${comment.id})`);
		singleComment.innerHTML = `
			<div class="h-100 p-4 rounded-3 shadow-sm">
				<p class="d-flex text-left">
					<span class="comment-serial flex-shrink-0 d-inline-block px-2 me-3 fw-bold">${comment.id}</span> 
					<span class="comment-text d-inline-block text-truncate">${comment.body}</span>
				</p>
				<p class="text-success mb-0">${comment.email}</p>
			</div>
		`;
		commentsContainer.appendChild(singleComment);
	});

	// show api location
	const apiUrl = `https://jsonplaceholder.typicode.com/comments`;
	const apiLocationElement = document.getElementById('api_location');
	apiLocationElement.innerHTML = `API collected from: <a href="${apiUrl}" target="_blank"><cite>${apiUrl}</cite></a>`;
};

// load comment details by id
const loadDetailsById = async commentId => {
	const url = `https://jsonplaceholder.typicode.com/comments?id=${commentId}`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		showCommentDetails(data[0]);
	} catch (err) {
		detailLoadingErrorMessage(err);
	}
};

// details loading error message
const detailLoadingErrorMessage = (error) => {
	console.log(error);
	const detailsContainer = document.getElementById('comment_details');
	detailsContainer.classList.add('opened');
	detailsContainer.innerHTML = `
		<div class="comment rounded-3 position-relative">
			<button id="comment_details_close" class="text-white border-0" onclick="closeCommentDetails()">X</button>
			<div class="inner px-3 px-lg-4 pb-4 pb-lg-5">
				<p class="text-danger">Something went wrong. Try again later.</p>
			</div>
		</div>
	`;
}

// show comment details
const showCommentDetails = comment => {
	console.log(comment);
	const detailsContainer = document.getElementById('comment_details');
	detailsContainer.classList.add('opened');
	detailsContainer.innerHTML = `
		<div class="comment rounded-3 position-relative">
			<button id="comment_details_close" class="text-white border-0" onclick="closeCommentDetails()">X</button>
			<div class="inner px-3 px-lg-4 pb-4 pb-lg-5">
				<p class="comment-serial fw-bold mx-auto">${comment.id}</p>
				<p class="comment-text text-white">${comment.body}</p>
				<p class="text-success fw-bold mb-0">${comment.email}</p>
			</div>
		</div>
	`;
};

// close comment details
const closeCommentDetails = () => {
	const detailsContainer = document.getElementById('comment_details');
	detailsContainer.classList.remove('opened');
	detailsContainer.textContent = '';
};
