let user;
let visiblePosts = 0;

let newPost = {
  id: '',
  description: '',
  createdAt: new Date(),
  author: '',
  photoLink: 'Photos\\',
};


const DOMmodule = (function () {
  const photoThreadHalf = document.getElementById('photo_thread_half');
  let photoPosts = [];


  function createPost(value) {
    const finder = photoPosts.find(item => null);
    if (finder !== undefined) {
      return null;
    }

    const photoPost = document.createElement('div');
    photoPost.setAttribute('class', 'photo_post');
    photoPost.setAttribute('id', value.id);

    let header = document.createElement('div');
    header.setAttribute('class', 'photo_post_header');
    let author = document.createElement('div');
    author.setAttribute('class', 'author_name');
    author.textContent = value.author;
    header.appendChild(author);
    photoPost.appendChild(header);

    header = document.createElement('div');
    header.setAttribute('class', 'photo_post_header');
    author = document.createElement('div');
    author.setAttribute('class', 'data');
    author.textContent = `${value.createdAt.getDate().toString()}.${(value.createdAt.getMonth() + 1).toString()}.${value.createdAt.getFullYear().toString()}`;
    header.appendChild(author);
    photoPost.appendChild(header);

    let img = document.createElement('img');
    img.setAttribute('src', value.photoLink);
    img.setAttribute('alt', 'Sorry! No photo.');
    img.setAttribute('width', '100%');
    photoPost.appendChild(img);

    let div = document.createElement('div');
    div.setAttribute('class', 'post_control');
    let button = document.createElement('button');
    button.setAttribute('class', 'post_control_button');
    img = document.createElement('img');
    img.setAttribute('src', 'image/Like.png');
    img.setAttribute('alt', 'Sorry! No photo.');
    img.setAttribute('height', '100%');
    button.appendChild(img);
    div.appendChild(button);
    photoPost.appendChild(div);

    if (user !== null && (typeof user === 'string')) {
      div = document.createElement('div');
      div.setAttribute('class', 'post_control');
      button = document.createElement('button');
      button.setAttribute('class', 'post_control_button');
      button.addEventListener('click', (event) => {
        EventsHandlers.handleEditPhotoPost(`${value.id}`);
      });
      img = document.createElement('img');
      img.setAttribute('src', 'image/Edit.png');
      img.setAttribute('alt', 'Sorry! No photo.');
      img.setAttribute('height', '100%');
      button.appendChild(img);
      div.appendChild(button);
      photoPost.appendChild(div);

      div = document.createElement('div');
      div.setAttribute('class', 'post_control');
      button = document.createElement('button');
      button.addEventListener('click', EventsHandlers.handleRemovePhotoPost);
      button.setAttribute('class', 'post_control_button');
      button.setAttribute('id', value.id);
      img = document.createElement('img');
      img.setAttribute('src', 'image/Remove.png');
      img.setAttribute('alt', 'Sorry! No photo.');
      img.setAttribute('height', '100%');
      button.appendChild(img);
      div.appendChild(button);
      photoPost.appendChild(div);
    }

    const description = document.createElement('div');
    description.setAttribute('class', 'description_hashtags');
    description.textContent = value.description;
    photoPost.appendChild(description);


    photoPosts.push(photoPost);
    return photoPost;
  }

  function clear() {
    photoPosts = [];
    const length = photoThreadHalf.childNodes.length;
    for (let i = length - 1; i > -1; --i) {
      photoThreadHalf.removeChild(photoThreadHalf.childNodes[i]);
    }
  }

  function initialUI() {
    const searchDate = document.getElementById('search_date');
    searchDate.addEventListener('change', EventsHandlers.handleSearchDate);

    const searchAuthor = document.getElementById('search_author');
    searchAuthor.addEventListener('change', EventsHandlers.handleSearchAuthor);

    const resetSettings = document.getElementById('reset_settings_button');
    resetSettings.addEventListener('click', EventsHandlers.handleResetSettings);

    const showMore = document.getElementById('show_more_posts');
    showMore.addEventListener('click', EventsHandlers.handleShowMorePosts);

    const logInBut = document.getElementById('log_in_button');
    logInBut.addEventListener('click', EventsHandlers.handleLogIn);


    const closeModalWin = document.getElementsByClassName('close_modal_window');
    const arrayCloseModalWim = Array.prototype.slice.call(closeModalWin);
    arrayCloseModalWim.forEach((node) => { node.addEventListener('click', EventsHandlers.handleCloseModalWin); });

    const confirmLogIn = document.getElementById('confirm_log_in');
    confirmLogIn.addEventListener('click', EventsHandlers.handleConfirmLogIn);

    const addPhotoButton = document.getElementById('add_photo_button');
    addPhotoButton.addEventListener('click', EventsHandlers.handleAddPhotoPost);

    const dragDropPhoto = document.getElementById('drag_drop_photo');
    dragDropPhoto.addEventListener('dragover', EventsHandlers.handleDragOver, false);
    dragDropPhoto.addEventListener('drop', EventsHandlers.handleFileSelect, false);

    const confirmEditPost = document.getElementById('confirm_add_edit_post');
    confirmEditPost.addEventListener('click', EventsHandlers.handleConfirmAddEdit);
  }

  function initialDataFromServer() {
    user = localStorage.getItem('userName');
    if (user === 'null') {
      user = null;
    }

    // server.initialPostsJSON ();
  }


  const checkAuthorization = function () {
    const addPhotoButton = document.getElementById('add_photo_button');
    if (user !== null && (typeof user === 'string')) {
      const logInButton = document.getElementById('log_in_button');
      logInButton.textContent = user;
      addPhotoButton.style.display = 'block';
    } else {
      addPhotoButton.style.display = 'none';
    }
  };

  const showPhotoPosts = function (clearFeed, skip, top, filterConfig) {
    if (clearFeed !== false) {
      clear();
      visiblePosts = 0;
    }

    server.getPhotoPosts(skip, top, filterConfig);
  };

  const showPhotoPostsFromServer = function (posts) {
    // добавил вспомогательную функцию, которую вызывает функция server.getPhotoPosts, т.к. если server.getPhotoPosts возвращает значение,
    // то оно приходит позже чем возвращается значение, и получается ошибка, которую я так и не решил
    posts.forEach((value) => {
      const newPost = createPost(value);
      if (newPost !== null) {
        photoThreadHalf.appendChild(newPost);
        visiblePosts++;
      }
    });
  };

  const addPhotoPost = function (post) {
    if (server.addPhotoPost(post)) {
      showPhotoPosts(true);
    }
  };

  const removePhotoPost = function (id) {
    if (server.removePhotoPost(id)) {
      const remove = photoPosts.find(item => item.getAttribute('id') === id);
      visiblePosts--;
      for (let i = 0; i < photoThreadHalf.childNodes.length; ++i) {
        if (photoThreadHalf.childNodes[i] === remove) {
          photoThreadHalf.removeChild(remove);
        }
      }
      photoPosts.splice(photoPosts.indexOf(remove), 1);
    }
  };

  const editPhotoPost = function (id, photoPost) {
    if (server.editPhotoPost(id, photoPost)) {
      const edit = photoPosts.find(item => item.getAttribute('id') === id);
      if ('description' in photoPost && (typeof photoPost.description === 'string') && photoPost.description.length < 200) {
        if (user === null) {
          edit.childNodes[4].textContent = photoPost.description;
        } else {
          edit.childNodes[6].textContent = photoPost.description;
        }
      }
      if ('photoLink' in photoPost && (typeof photoPost.photoLink === 'string')) {
        edit.childNodes[2].setAttribute('src', photoPost.photoLink);
      }
    }
  };

  const initialActions = function () {
    initialDataFromServer();
    checkAuthorization();
    initialUI();
  };

  return {
    showPhotoPosts, addPhotoPost, removePhotoPost, editPhotoPost, initialActions, checkAuthorization, showPhotoPostsFromServer,
  };
}());

function runDOM() {
  DOMmodule.initialActions();
  DOMmodule.showPhotoPosts();
}

runDOM();
