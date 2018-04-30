let EventsHandlers = (function (){
    let isEditPost = false;


    let handleRemovePhotoPost = function () {
        DOMmodule.removePhotoPost(this.getAttribute("id"));
    };

    let handleSearchAuthor = function () {
        DOMmodule.showPhotoPosts(true, 0, 10, {author: this.value});
    };

    let handleSearchDate = function () {
        DOMmodule.showPhotoPosts(true, 0, 10, {createdAt: new Date (this.value)});
    };

    let handleResetSettings = function () {
        DOMmodule.showPhotoPosts(true);
        let searchAuthor = document.getElementById("search_author");
        searchAuthor.value="";
        let searchDate = document.getElementById("search_date");
        searchDate.value="";
    };

    let handleShowMorePosts = function () {
        DOMmodule.showPhotoPosts(false, 0, 10);
    };

    let handleLogIn = function () {
        if (user === null){
            let modalWindow = document.getElementById("modal_window");
            modalWindow.style.display = "block";
            let content = document.getElementById("log_in_modal_content");
            content.style.display = "block";
        }
        else{
            user = null;
            localStorage.setItem("userName", user);
            let logInBut = document.getElementById("log_in_button");
            logInBut.innerText = "Log in";
            DOMmodule.checkAuthorization();
            DOMmodule.showPhotoPosts();
        }
    };

    let handleCloseModalWin = function () {
        let modalWindow = document.getElementById("modal_window");
        modalWindow.style.display = "none";
        let logInContent = document.getElementById("log_in_modal_content");
        logInContent.style.display = "none";
        let addPhotoContent = document.getElementById("add_edit_modal_content");
        addPhotoContent.style.display = "none";
        document.getElementById("input_description").value = "";
        document.getElementById("drag_drop_photo").textContent = "Drop photo here";
    };

    let handleConfirmLogIn = function () {
        let nickname = document.getElementById("log_in_nickname");
        let password = document.getElementById("log_in_password");
        if (nickname.value === "null"){
            alert("Change other name");
            return;
        }
        if (nickname.value !== ""){
            user = nickname.value;
            localStorage.setItem("userName", user);
            let logInBut = document.getElementById("log_in_button");
            logInBut.innerText = user;
            DOMmodule.checkAuthorization();
            DOMmodule.showPhotoPosts();
            handleCloseModalWin();
            nickname.value = "";
            password.value = "";
        }
    };

    let handleAddPhotoPost = function () {
        let modalWindow = document.getElementById("modal_window");
        modalWindow.style.display = "block";
        let content = document.getElementById("add_edit_modal_content");
        content.style.display = "block";
        isEditPost = false;
        newPost.photoLink = 'Photos\\';
    };

    let handleFileSelect = function (event){
        event.stopPropagation();
        event.preventDefault();

        let files = event.dataTransfer.files; // FileList object.
        let file = files[0];
        if (file.type.indexOf("image") !== -1) {
            newPost.photoLink = 'Photos\\' + file.name;
            let dragDropPhoto = document.getElementById("drag_drop_photo");
            dragDropPhoto.textContent = file.name;
        }
        else{
            alert("You can drop only image.");
        }
    };

    let handleDragOver = function (event){
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    };

    let handleConfirmAddEdit = function () {
        if (newPost.photoLink === 'Photos\\'){
            alert("Drop photo!");
        }
        else{
            if (!isEditPost) {
                newPost.id = "" + (server.getMaxPostID () + 1);
                newPost.author = user;
                newPost.createdAt = new Date();
                newPost.description = document.getElementById("input_description").value;

                let clone = {}; // новый пустой объект
                for (let key in newPost) {
                    clone[key] = newPost[key];
                }
                DOMmodule.addPhotoPost(clone);
            }
            else{
                newPost.description = document.getElementById("input_description").value;
                DOMmodule.editPhotoPost(newPost.id, newPost);
            }
            handleCloseModalWin();
        }
    };

    let handleEditPhotoPost = function (id) {
        let modalWindow = document.getElementById("modal_window");
        modalWindow.style.display = "block";
        let content = document.getElementById("add_edit_modal_content");
        content.style.display = "block";

        isEditPost = true;

        newPost = server.getPhotoPost(id);
        document.getElementById("input_description").value = newPost.description;
        document.getElementById("drag_drop_photo").textContent = newPost.photoLink;
    };

    return {handleRemovePhotoPost, handleSearchAuthor, handleResetSettings, handleSearchDate, handleShowMorePosts,
    handleLogIn, handleCloseModalWin, handleConfirmLogIn, handleAddPhotoPost, handleFileSelect, handleDragOver,
    handleConfirmAddEdit, handleEditPhotoPost};
})();