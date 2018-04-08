var module = (function () {
    let getPhotoPosts = function (skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;

        let result = [];
        if (filterConfig !== undefined && "author" in filterConfig) {
            photoPostsDate.forEach(function (value) {
                if (value.author === filterConfig.author) {
                    result.push(value);
                }
            });
        }
        else if (filterConfig !== undefined && "createdAt" in filterConfig){
            photoPostsDate.forEach(function (value) {
                if (value.createdAt > filterConfig.createdAt) {
                    result.push(value);
                }
            });
        }
        else {
            result = photoPostsDate.slice();
        }

        result.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });
        result = result.slice(skip, top);

        return result;
    };

    let getPhotoPost = function (id) {
        return photoPostsDate.find(function (item) {
            return item.id === id;
        });
    };

    let validatePhotoPost = function (post) {
        if (post === undefined) {
            return false;
        }
        if (!("id" in post && (typeof post.id === "string"))) {
            return false;
        }
        if (!("description" in post && (typeof post.description === "string") && post.description.length < 200)) {
            return false;
        }
        if (!("createdAt" in post && post.createdAt instanceof Date)) {
            return false;
        }
        if (!("author" in post && (typeof post.author === "string"))) {
            return false;
        }
        if (!("photoLink" in post && (typeof post.author === "string"))) {
            return false;
        }

        return true;
    };

    let addPhotoPost = function (post) {
        if (validatePhotoPost(post)) {
            photoPostsDate.push(post);
            photoPostsDate.sort(function (a, b) {
                return b.createdAt - a.createdAt;
            });
            return true;
        }
        return false;
    };

    let editPhotoPost = function (id, photoPost) {
        if (!photoPost) {
            return false;
        }

        let result = photoPostsDate.find(function (item) {
            return item.id === id;
        });

        if (result === null) {
            return false;
        }
        else {
            if ("description" in photoPost && (typeof photoPost.description === "string") && photoPost.description.length < 200) {
                result.description = photoPost.description;
            }
            if ("photoLink" in photoPost && (typeof photoPost.photoLink === "string")) {
                result.photoLink = photoPost.photoLink;
            }
            return true;
        }
    };

    let removePhotoPost = function (id) {
        let result = null;
        photoPostsDate.forEach(function (item) {
            if (item.id === id) {
                result = item;
            }
        });

        if (result === null) {
            return false;
        }
        else {
            photoPostsDate.splice(photoPostsDate.indexOf(result), 1);
            return true;
        }
    };

    return {getPhotoPosts, getPhotoPost, validatePhotoPost, addPhotoPost, editPhotoPost, removePhotoPost};
})();

var photoPostsDate = [];

var initialPostsDate = [
    {
         id: "1",
         description: 'Женская сборная Беларуси выиграла эстафету.',
         createdAt: new Date('2018-02-23T23:00:00'),
         author: 'Денис',
         photoLink: 'Photos\\Photo1.png'
     },
     {
         id: "2",
         description: 'Сегодня очень снежно.',
         createdAt: new Date('2018-03-23T23:00:00'),
         author: 'Сергей',
         photoLink: 'Photos\\Photo2.png'
     },
     {
         id: "3",
         description: 'На улице жара неимоверная.',
         createdAt: new Date('2017-10-23T23:00:15'),
         author: 'Максим',
         photoLink: 'Photos\\Photo3.png'
     },
     {
         id: "4",
         description: 'Поеду в Питер завтра.',
         createdAt: new Date('2016-02-23T23:00:00'),
         author: 'Катя',
         photoLink: 'Photos\\Photo4.png'
     },
     {
         id: "5",
         description: 'Завтра собираюсь в путешествие, кто со мной?',
         createdAt: new Date('2018-05-23T23:00:00'),
         author: 'Ольга',
         photoLink: 'Photos\\Photo5.png'
     },
     {
         id: "6",
         description: 'Люблю гулять под дождем, очень бодрит кстати.',
         createdAt: new Date('2018-12-23T23:00:00'),
         author: 'Сергей3000',
         photoLink: 'Photos\\Photo6.png'
     },
     {
         id: "7",
         description: 'Не знаю что написать, идеи закончились.',
         createdAt: new Date('2018-02-13T23:00:00'),
         author: 'Киллер2007',
         photoLink: 'Photos\\Photo7.png'
     },
     {
         id: "8",
         description: 'Какое-то описание.',
         createdAt: new Date('2018-02-23T15:00:00'),
         author: 'Димончик',
         photoLink: 'Photos\\Photo8.png'
     },
     {
         id: "9",
         description: 'Это только 9-ое описание, а идей нет.',
         createdAt: new Date('2018-09-23T23:00:00'),
         author: 'Димка',
         photoLink: 'Photos\\Photo9.png'
     },
     {
         id: "10",
         description: 'Я родился.',
         createdAt: new Date('1999-04-27T10:30:01'),
         author: 'Дмитрий Михайлович',
         photoLink: 'Photos\\Photo10.png'
     },
     {
         id: "11",
         description: 'Я побывал в 3 странах за месяц летом.',
         createdAt: new Date('2010-10-23T23:00:00'),
         author: 'Митя',
         photoLink: 'Photos\\Photo11.png'
     },
     {
         id: "12",
         description: 'Вчера вечером я был в городе.',
         createdAt: new Date('2016-02-23T13:34:00'),
         author: 'Димка',
         photoLink: 'Photos\\Photo12.png'
     },
     {
         id: "13",
         description: 'Ребята, намечается тусовка 15 марта, кто пойдет?',
         createdAt: new Date('2018-03-25T13:00:00'),
         author: 'Димка',
         photoLink: 'Photos\\Photo13.png'
     },
     {
         id: "14",
         description: 'Вчера в Минске было очень много ДТП и снега было по колено.',
         createdAt: new Date('2017-01-23T23:00:00'),
         author: 'Дима',
         photoLink: 'Photos\\Photo14.png'
     },
     {
         id: "15",
         description: 'А какие книги читали вы? Какие любимые жанры?',
         createdAt: new Date('2018-04-23T13:00:00'),
         author: 'Платон',
         photoLink: 'Photos\\Photo15.png'
     },
     {
         id: "16",
         description: 'Можно ли сделать пустое описание?',
         createdAt: new Date('2018-03-12T23:00:00'),
         author: 'Аристарх',
         photoLink: 'Photos\\Photo16.png'
     },
     {
         id: "17",
         description: 'Моя фантазия на сиходе, а брать чьи-то реальные описания долго.',
         createdAt: new Date('2013-02-01T23:00:00'),
         author: 'Михаил',
         photoLink: 'Photos\\Photo17.png'
     },
     {
         id: "18",
         description: 'У меня еще куча дел, а времени не так уж и много.',
         createdAt: new Date('2011-02-23T12:43:00'),
         author: 'Евпатий',
         photoLink: 'Photos\\Photo18.png'
     },
     {
         id: "19",
         description: 'Завтра в универ, но греет душу что в четверг выходной.',
         createdAt: new Date('2018-03-24T16:00:00'),
         author: 'Марк',
         photoLink: 'Photos\\Photo19.png'
     },
     {
         id: "20",
         description: 'Фух, вот и закончил с описаниями.',
         createdAt: new Date('1998-01-26T23:00:00'),
         author: 'Игнатий',
         photoLink: 'Photos\\Photo20.png'
     }
];

var EventsHandlers = (function (){
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
                newPost.id = "" + (photoPostsDate.length + 1);
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

        newPost = module.getPhotoPost(id);
        document.getElementById("input_description").value = newPost.description;
        document.getElementById("drag_drop_photo").textContent = newPost.photoLink;
    };

    return {handleRemovePhotoPost, handleSearchAuthor, handleResetSettings, handleSearchDate, handleShowMorePosts,
    handleLogIn, handleCloseModalWin, handleConfirmLogIn, handleAddPhotoPost, handleFileSelect, handleDragOver,
    handleConfirmAddEdit, handleEditPhotoPost};
})();


let user;
let visiblePosts = 0;
let isEditPost = false;
let newPost = {
        id: '',
        description: '',
        createdAt: new Date(),
        author: '',
        photoLink: 'Photos\\'
};

var DOMmodule = (function () {
    let photoThreadHalf = document.getElementById("photo_thread_half");
    let photoPosts = [];


    function createPost(value) {
        let finder = photoPosts.find(function (item) {
            return null;
        });
        if (finder !== undefined) {
            return null;
        }

        let photoPost = document.createElement("div");
        photoPost.setAttribute("class", "photo_post");
        photoPost.setAttribute("id", value.id);

        let header = document.createElement("div");
        header.setAttribute("class", "photo_post_header");
        let author = document.createElement("div");
        author.setAttribute("class", "author_name");
        author.textContent = value.author;
        header.appendChild(author);
        photoPost.appendChild(header);

        header = document.createElement("div");
        header.setAttribute("class", "photo_post_header");
        author = document.createElement("div");
        author.setAttribute("class", "data");
        author.textContent = value.createdAt.getDate().toString() + "." + (value.createdAt.getMonth() + 1).toString() + "." + value.createdAt.getFullYear().toString();
        header.appendChild(author);
        photoPost.appendChild(header);

        let img = document.createElement("img");
        img.setAttribute("src", value.photoLink);
        img.setAttribute("alt", "Sorry! No photo.");
        img.setAttribute("width", "100%");
        photoPost.appendChild(img);

        let div = document.createElement("div");
        div.setAttribute("class", "post_control");
        let button = document.createElement("button");
        button.setAttribute("class", "post_control_button");
        img = document.createElement("img");
        img.setAttribute("src", "Like.png");
        img.setAttribute("alt", "Sorry! No photo.");
        img.setAttribute("height", "100%");
        button.appendChild(img);
        div.appendChild(button);
        photoPost.appendChild(div);

        if (user !== null && (typeof user === "string")){
            div = document.createElement("div");
            div.setAttribute("class", "post_control");
            button = document.createElement("button");
            button.setAttribute("class", "post_control_button");
            button.addEventListener('click', function (event) {
                EventsHandlers.handleEditPhotoPost (value.id + "");
            });
            img = document.createElement("img");
            img.setAttribute("src", "Edit.png");
            img.setAttribute("alt", "Sorry! No photo.");
            img.setAttribute("height", "100%");
            button.appendChild(img);
            div.appendChild(button);
            photoPost.appendChild(div);

            div = document.createElement("div");
            div.setAttribute("class", "post_control");
            button = document.createElement("button");
            button.addEventListener('click', EventsHandlers.handleRemovePhotoPost);
            button.setAttribute("class", "post_control_button");
            button.setAttribute("id", value.id);
            img = document.createElement("img");
            img.setAttribute("src", "Remove.png");
            img.setAttribute("alt", "Sorry! No photo.");
            img.setAttribute("height", "100%");
            button.appendChild(img);
            div.appendChild(button);
            photoPost.appendChild(div);
        }

        let description = document.createElement("div");
        description.setAttribute("class", "description_hashtags");
        description.textContent = value.description;
        photoPost.appendChild(description);


        photoPosts.push(photoPost);
        return photoPost;
    }

    function clear(){
        photoPosts = [];
        let length = photoThreadHalf.childNodes.length;
        for (let i = length - 1; i > -1; --i) {
            photoThreadHalf.removeChild(photoThreadHalf.childNodes[i]);
        }
    }

    function initialUI() {
        let searchDate = document.getElementById("search_date");
        searchDate.addEventListener('change', EventsHandlers.handleSearchDate);

        let searchAuthor = document.getElementById("search_author");
        searchAuthor.addEventListener('change', EventsHandlers.handleSearchAuthor);

        let resetSettings = document.getElementById("reset_settings_button");
        resetSettings.addEventListener('click', EventsHandlers.handleResetSettings);

        let showMore = document.getElementById("show_more_posts");
        showMore.addEventListener('click', EventsHandlers.handleShowMorePosts);

        let logInBut = document.getElementById("log_in_button");
        logInBut.addEventListener('click', EventsHandlers.handleLogIn);


        let closeModalWin = document.getElementsByClassName("close_modal_window");
        let arrayCloseModalWim = Array.prototype.slice.call (closeModalWin);
        arrayCloseModalWim.forEach((node)=>{node.addEventListener('click', EventsHandlers.handleCloseModalWin);});

        let confirmLogIn = document.getElementById("confirm_log_in");
        confirmLogIn.addEventListener('click', EventsHandlers.handleConfirmLogIn);

        let addPhotoButton = document.getElementById("add_photo_button");
        addPhotoButton.addEventListener('click', EventsHandlers.handleAddPhotoPost);

        let dragDropPhoto = document.getElementById("drag_drop_photo");
        dragDropPhoto.addEventListener('dragover', EventsHandlers.handleDragOver, false);
        dragDropPhoto.addEventListener('drop', EventsHandlers.handleFileSelect, false);

        let confirmEditPost = document.getElementById("confirm_add_edit_post");
        confirmEditPost.addEventListener('click', EventsHandlers.handleConfirmAddEdit);
    }

    function saveDataInLocalStorage() {
        localStorage.setItem("photoPosts", JSON.stringify(initialPostsDate));
    }

    function initialDataFromLocalStorage() {
        user = localStorage.getItem("userName");
        if (user === "null"){
            user = null;
        }

        photoPostsDate = JSON.parse(localStorage.getItem("photoPosts"));
        if (photoPostsDate === null){
            saveDataInLocalStorage();
            initialDataFromLocalStorage();
        }
        photoPostsDate = photoPostsDate.slice();
        photoPostsDate.forEach((post)=>{
            post.createdAt = new Date (post.createdAt);
        });
    }


    let checkAuthorization = function (){
        let addPhotoButton = document.getElementById("add_photo_button");
        if (user !== null && (typeof user === "string")){
            let logInButton = document.getElementById("log_in_button");
            logInButton.textContent = user;
            addPhotoButton.style.display = "block";
        }
        else{
            addPhotoButton.style.display = "none";
        }
    };

    let showPhotoPosts = function (clearFeed, skip, top, filterConfig) {
        if (clearFeed !== false) {
            clear();
            visiblePosts = 0;
        }
        skip = skip || 0;
        top = top || 10;

        module.getPhotoPosts(visiblePosts + skip, visiblePosts + top, filterConfig).forEach(function (value) {
            let newPost = createPost(value);
            if (newPost !== null) {
                photoThreadHalf.appendChild(newPost);
                visiblePosts++;
            }
        });
    };

    let addPhotoPost = function (post) {
        if (module.addPhotoPost(post)) {
            showPhotoPosts(true);
            saveDataInLocalStorage();
        }
    };

    let removePhotoPost = function (id) {
        if (module.removePhotoPost(id)) {
            let remove = photoPosts.find(function (item) {
                return item.getAttribute("id") === id;
            });
            visiblePosts--;
            for (let i = 0; i < photoThreadHalf.childNodes.length; ++i) {
                if (photoThreadHalf.childNodes[i] === remove) {
                    photoThreadHalf.removeChild(remove);
                }
            }
            photoPosts.splice(photoPosts.indexOf(remove), 1);
            saveDataInLocalStorage();
        }
    };

    let editPhotoPost = function (id, photoPost) {
        if (module.editPhotoPost(id, photoPost)) {
            let edit = photoPosts.find(function (item) {
                return item.getAttribute("id") === id;
            });
            if ("description" in photoPost && (typeof photoPost.description === "string") && photoPost.description.length < 200) {
                if (user === null) {
                    edit.childNodes[4].textContent = photoPost.description;
                }
                else{
                    edit.childNodes[6].textContent = photoPost.description;
                }
            }
            if ("photoLink" in photoPost && (typeof photoPost.photoLink === "string")) {
                edit.childNodes[2].setAttribute("src", photoPost.photoLink);
            }
            saveDataInLocalStorage();
        }
    };

    let initialActions = function () {
        initialDataFromLocalStorage();
        checkAuthorization();
        initialUI();
    };

    return {showPhotoPosts, addPhotoPost, removePhotoPost, editPhotoPost, initialActions, checkAuthorization};
})();

function runDOM() {
    DOMmodule.initialActions();
    DOMmodule.showPhotoPosts();
}

runDOM();