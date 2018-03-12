var module = (function () {
    let photoPosts = [
        {
            id: '1',
            description: 'Женская сборная Беларуси выиграла эстафету.',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Денис',
            photoLink: 'Photos\\Empty photo 1.png'
        },
        {
            id: '2',
            description: 'Сегодня очень снежно.',
            createdAt: new Date('2018-03-23T23:00:00'),
            author: 'Сергей',
            photoLink: 'Photos\\Empty photo 2.png'
        },
        {
            id: '3',
            description: 'На улице жара неимоверная.',
            createdAt: new Date('2017-10-23T23:00:15'),
            author: 'Максим',
            photoLink: 'Photos\\Empty photo 3.png'
        },
        {
            id: '4',
            description: 'Поеду в Питер завтра.',
            createdAt: new Date('2016-02-23T23:00:00'),
            author: 'Катя',
            photoLink: 'Photos\\Empty photo 4.png'
        },
        {
            id: '5',
            description: 'Завтра собираюсь в путешествие, кто со мной?',
            createdAt: new Date('2018-05-23T23:00:00'),
            author: 'Ольга',
            photoLink: 'Photos\\Empty photo 5.png'
        },
        {
            id: '6',
            description: 'Люблю гулять под дождем, очень бодрит кстати.',
            createdAt: new Date('2018-12-23T23:00:00'),
            author: 'Сергей3000',
            photoLink: 'Photos\\Empty photo 6.png'
        },
        {
            id: '7',
            description: 'Не знаю что написать, идеи закончились.',
            createdAt: new Date('2018-02-13T23:00:00'),
            author: 'Киллер2007',
            photoLink: 'Photos\\Empty photo 7.png'
        },
        {
            id: '8',
            description: 'Какое-то описание.',
            createdAt: new Date('2018-02-23T15:00:00'),
            author: 'Димончик',
            photoLink: 'Photos\\Empty photo 8.png'
        },
        {
            id: '9',
            description: 'Это только 9-ое описание, а идей нет.',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'Димка',
            photoLink: 'Photos\\Empty photo 9.png'
        },
        {
            id: '10',
            description: 'Я родился.',
            createdAt: new Date('1999-04-27T10:30:01'),
            author: 'Дмитрий Михайлович',
            photoLink: 'Photos\\Empty photo 10.png'
        },
        {
            id: '11',
            description: 'Я побывал в 3 странах за месяц летом.',
            createdAt: new Date('2010-10-23T23:00:00'),
            author: 'Митя',
            photoLink: 'Photos\\Empty photo 11.png'
        },
        {
            id: '12',
            description: 'Вчера вечером я был в городе.',
            createdAt: new Date('2016-02-23T13:34:00'),
            author: 'Дима',
            photoLink: 'Photos\\Empty photo 12.png'
        },
        {
            id: '13',
            description: 'Ребята, намечается тусовка 15 марта, кто пойдет?',
            createdAt: new Date('2018-03-25T13:00:00'),
            author: 'Дима',
            photoLink: 'Photos\\Empty photo 13.png'
        },
        {
            id: '14',
            description: 'Вчера в Минске было очень много ДТП и снега было по колено.',
            createdAt: new Date('2017-01-23T23:00:00'),
            author: 'Дима',
            photoLink: 'Photos\\Empty photo 14.png'
        },
        {
            id: '15',
            description: 'А какие книги читали вы? Какие любимые жанры?',
            createdAt: new Date('2018-04-23T13:00:00'),
            author: 'Платон',
            photoLink: 'Photos\\Empty photo 15.png'
        },
        {
            id: '16',
            description: 'Можно ли сделать пустое описание?',
            createdAt: new Date('2018-03-12T23:00:00'),
            author: 'Аристарх',
            photoLink: 'Photos\\Empty photo 16.png'
        },
        {
            id: '17',
            description: 'Моя фантазия на сиходе, а брать чьи-то реальные описания долго.',
            createdAt: new Date('2013-02-01T23:00:00'),
            author: 'Михаил',
            photoLink: 'Photos\\Empty photo 17.png'
        },
        {
            id: '18',
            description: 'У меня еще куча дел, а времени не так уж и много.',
            createdAt: new Date('2011-02-23T12:43:00'),
            author: 'Евпатий',
            photoLink: 'Photos\\Empty photo 18.png'
        },
        {
            id: '19',
            description: 'Завтра в универ, но греет душу что в четверг выходной.',
            createdAt: new Date('2018-03-24T16:00:00'),
            author: 'Марк',
            photoLink: 'Photos\\Empty photo 19.png'
        },
        {
            id: '20',
            description: 'Фух, вот и закончил с описаниями.',
            createdAt: new Date('1998-01-26T23:00:00'),
            author: 'Игнатий',
            photoLink: 'Photos\\Empty photo 20.png'
        }
    ];


    let getPhotoPosts = function (skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;

        let result = [];
        if (filterConfig !== undefined && "author" in filterConfig) {
            photoPosts.forEach(function (value) {
                if (value.author === filterConfig.author) {
                    result.push(value);
                }
            });
        }
        else {
            result = photoPosts.slice();
        }

        result.sort(function (a, b) {
            return b.createdAt - a.createdAt;
        });
        result = result.slice(skip, top);

        return result;
    };

    let getPhotoPost = function (id) {
        return photoPosts.find(function (item) {
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
            photoPosts.push(post);
            photoPosts.sort(function (a, b) {
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

        let result = photoPosts.find(function (item) {
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
        photoPosts.forEach(function (item) {
            if (item.id === id) {
                result = item;
            }
        });

        if (result === null) {
            return false;
        }
        else {
            photoPosts.splice(photoPosts.indexOf(result), 1);
            return true;
        }
    };

    return {getPhotoPosts, getPhotoPost, validatePhotoPost, addPhotoPost, editPhotoPost, removePhotoPost};
})();


function run() {
    console.log("\ngetPhotoPosts():\n");
    module.getPhotoPosts().forEach(function (value) {
        console.log(value.id + " \t" + value.createdAt);
    });

    console.log("\ngetPhotoPosts(0, 10, {author: 'Дима'}):\n");
    module.getPhotoPosts(0, 10, {author: 'Дима'}).forEach(function (value) {
        console.log(value.author + " " + value.createdAt);
    });

    console.log("\ngetPhotoPost('1')\n");
    let result = module.getPhotoPost('1');
    console.log(result.id + " " + result.author + " " + result.createdAt);

    console.log("\nvalidatePhotoPost\n");
    console.log(module.validatePhotoPost({
        id: '21',
        description: 'Женская сборная',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 'Денис',
        photoLink: 'Photos\\Empty photo 1'
    }));
    console.log(module.validatePhotoPost({
        id: '21',
        description: 'Женская сборная',
        createdAt: new Date('2018-02-23T23:00:00'),
        author: 2,
        photoLink: 'Photos\\Empty photo 1'
    }));

    console.log("\nadd photo post\n");
    module.addPhotoPost({
        id: '21',
        description: 'Женская сборная',
        createdAt: new Date('1890-02-23T23:00:00'),
        author: 'Денис',
        photoLink: 'Photos\\Empty photo 1'
    });
    console.log("After post adding");
    module.getPhotoPosts().forEach(function (value) {
        console.log(value.id + " \t" + value.createdAt);
    });

    console.log("\nedit photo post\n");
    module.editPhotoPost('21', {
        description: "измененное описание."
    });
    module.getPhotoPosts(0, 1).forEach(function (value) {
        console.log(value.id + " " + value.description);
    });

    console.log("\nremove post\n");
    module.removePhotoPost('4');
}

//run();


var user = "Dima Chubrick";

var DOMmodule = (function () {
    let photoThreadHalf = document.getElementById("photo_thread_half");

    let photoPosts = [];

    function createPost(value) {
        let finder = photoPosts.find(function (item) {
            return item.getAttribute("id") === value.id;
        });
        if (finder !== undefined) {
            return finder;
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
        author.textContent = value.createdAt.getDate().toString() + "." + value.createdAt.getMonth().toString() + "." + value.createdAt.getFullYear().toString();
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
            button.setAttribute("class", "post_control_button");
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

    let showPhotoPosts = function () {
        clear();
        module.getPhotoPosts().forEach(function (value) {
            photoThreadHalf.appendChild(createPost(value));
        });
    };

    let addPhotoPost = function (post) {
        if (module.addPhotoPost(post)) {
            showPhotoPosts();
        }
    };

    let removePhotoPost = function (id) {
        if (module.removePhotoPost(id)) {
            let remove = photoPosts.find(function (item) {
                return item.getAttribute("id") === id;
            });
            for (let i = 0; i < photoThreadHalf.childNodes.length; ++i) {
                if (photoThreadHalf.childNodes[i] === remove) {
                    photoThreadHalf.removeChild(remove);
                }
            }
            photoPosts.splice(photoPosts.indexOf(remove), 1);
        }
    };

    let editPhotoPost = function (id, photoPost) {
        if (module.editPhotoPost(id, photoPost)) {
            let edit = photoPosts.find(function (item) {
                return item.getAttribute("id") === id;
            });
            if ("description" in photoPost && (typeof photoPost.description === "string") && photoPost.description.length < 200) {
                edit.childNodes[4].textContent = photoPost.description;
            }
            if ("photoLink" in photoPost && (typeof photoPost.photoLink === "string")) {
                edit.childNodes[2].setAttribute("src", photoPost.photoLink);
            }
        }
    };

    let checkAuthorization = function (){
        if (user !== null && (typeof user === "string")){
            let logInButton = document.getElementById("log_in_button");
            logInButton.textContent = user;
            showPhotoPosts();
        }
    };


    return {showPhotoPosts, addPhotoPost, removePhotoPost, editPhotoPost, checkAuthorization};
})();

function testDOM() {
    DOMmodule.checkAuthorization();

    DOMmodule.showPhotoPosts();

    /*DOMmodule.addPhotoPost({
            id: '21',
            description: 'Тестовый текст.',
            createdAt: new Date('2019-02-23T23:00:00'),
            author: 'Денис',
            photoLink: 'Photos\\Empty photo 1.png'
        });*/

    /*DOMmodule.removePhotoPost('6');*/

    /*DOMmodule.editPhotoPost('9', {
        description: "измененное описание.",
		photoLink: 'Photos\\Empty photo 1.png'
    });*/
}

testDOM();