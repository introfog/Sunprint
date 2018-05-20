const EventsHandlers = (function () {
  let isEditPost = false;

  const handleRemovePhotoPost = function () {
    DOMmodule.removePhotoPost(this.getAttribute('id'));
  };

  const handleSearchAuthor = function () {
    DOMmodule.showPhotoPosts(true, 0, 10, { author: this.value });
  };

  const handleSearchDate = function () {
    DOMmodule.showPhotoPosts(true, 0, 10, { createdAt: new Date(this.value) });
  };

  const handleResetSettings = function () {
    DOMmodule.showPhotoPosts(true);
    const searchAuthor = document.getElementById('search_author');
    searchAuthor.value = '';
    const searchDate = document.getElementById('search_date');
    searchDate.value = '';
  };

  const handleShowMorePosts = function () {
    DOMmodule.showPhotoPosts(false, 0, 10);
  };

  const handleLogIn = function () {
    if (user === null) {
      const modalWindow = document.getElementById('modal_window');
      modalWindow.style.display = 'block';
      const content = document.getElementById('log_in_modal_content');
      content.style.display = 'block';
    } else {
      user = null;
      localStorage.setItem('userName', user);
      const logInBut = document.getElementById('log_in_button');
      logInBut.innerText = 'Log in';
      DOMmodule.checkAuthorization();
      DOMmodule.showPhotoPosts();
    }
  };

  const handleCloseModalWin = function () {
    const modalWindow = document.getElementById('modal_window');
    modalWindow.style.display = 'none';
    const logInContent = document.getElementById('log_in_modal_content');
    logInContent.style.display = 'none';
    const addPhotoContent = document.getElementById('add_edit_modal_content');
    addPhotoContent.style.display = 'none';
    document.getElementById('input_description').value = '';
    document.getElementById('drag_drop_photo').textContent = 'Drop photo here';
  };

  const handleConfirmLogIn = function () {
    const nickname = document.getElementById('log_in_nickname');
    const password = document.getElementById('log_in_password');
    if (nickname.value === 'null') {
      alert('Change other name');
      return;
    }
    if (nickname.value !== '') {
      user = nickname.value;
      localStorage.setItem('userName', user);
      const logInBut = document.getElementById('log_in_button');
      logInBut.innerText = user;
      DOMmodule.checkAuthorization();
      DOMmodule.showPhotoPosts();
      handleCloseModalWin();
      nickname.value = '';
      password.value = '';
    }
  };

  const handleAddPhotoPost = function () {
    const modalWindow = document.getElementById('modal_window');
    modalWindow.style.display = 'block';
    const content = document.getElementById('add_edit_modal_content');
    content.style.display = 'block';
    isEditPost = false;
    newPost.photoLink = 'Photos\\';
  };

  const handleFileSelect = function (event) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer.files; // FileList object.
    const file = files[0];
    if (file.type.indexOf('image') !== -1) {
      newPost.photoLink = `Photos\\${file.name}`;
      const dragDropPhoto = document.getElementById('drag_drop_photo');
      dragDropPhoto.textContent = file.name;
    } else {
      alert('You can drop only image.');
    }
  };

  const handleDragOver = function (event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleConfirmAddEdit = function () {
    if (newPost.photoLink === 'Photos\\') {
      alert('Drop photo!');
    } else {
      if (!isEditPost) {
        newPost.id = `${server.getMaxPostID() + 1}`;
        newPost.author = user;
        newPost.createdAt = new Date();
        newPost.description = document.getElementById('input_description').value;

        const clone = {}; // новый пустой объект
        for (const key in newPost) {
          clone[key] = newPost[key];
        }
        DOMmodule.addPhotoPost(clone);
      } else {
        newPost.description = document.getElementById('input_description').value;
        DOMmodule.editPhotoPost(newPost.id, newPost);
      }
      handleCloseModalWin();
    }
  };

  const handleEditPhotoPost = function (id) {
    const modalWindow = document.getElementById('modal_window');
    modalWindow.style.display = 'block';
    const content = document.getElementById('add_edit_modal_content');
    content.style.display = 'block';

    isEditPost = true;

    newPost = server.getPhotoPost(id);
    document.getElementById('input_description').value = newPost.description;
    document.getElementById('drag_drop_photo').textContent = newPost.photoLink;
  };

  return {
    handleRemovePhotoPost,
    handleSearchAuthor,
    handleResetSettings,
    handleSearchDate,
    handleShowMorePosts,
    handleLogIn,
    handleCloseModalWin,
    handleConfirmLogIn,
    handleAddPhotoPost,
    handleFileSelect,
    handleDragOver,
    handleConfirmAddEdit,
    handleEditPhotoPost,
  };
}());
