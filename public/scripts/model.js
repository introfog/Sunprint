const initialPostsDate = [
  {
    id: '1',
    description: 'Женская сборная Беларуси выиграла эстафету.',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Денис',
    photoLink: 'Photos\\Photo1.png',
  },
  {
    id: '2',
    description: 'Сегодня очень снежно.',
    createdAt: new Date('2018-03-23T23:00:00'),
    author: 'Сергей',
    photoLink: 'Photos\\Photo2.png',
  },
  {
    id: '3',
    description: 'На улице жара неимоверная.',
    createdAt: new Date('2017-10-23T23:00:15'),
    author: 'Максим',
    photoLink: 'Photos\\Photo3.png',
  },
  {
    id: '4',
    description: 'Поеду в Питер завтра.',
    createdAt: new Date('2016-02-23T23:00:00'),
    author: 'Катя',
    photoLink: 'Photos\\Photo4.png',
  },
  {
    id: '5',
    description: 'Завтра собираюсь в путешествие, кто со мной?',
    createdAt: new Date('2018-05-23T23:00:00'),
    author: 'Ольга',
    photoLink: 'Photos\\Photo5.png',
  },
  {
    id: '6',
    description: 'Люблю гулять под дождем, очень бодрит кстати.',
    createdAt: new Date('2018-12-23T23:00:00'),
    author: 'Сергей3001',
    photoLink: 'Photos\\Photo6.png',
  },
  {
    id: '7',
    description: 'Не знаю что написать, идеи закончились.',
    createdAt: new Date('2018-02-13T23:00:00'),
    author: 'Киллер2007',
    photoLink: 'Photos\\Photo7.png',
  },
  {
    id: '8',
    description: 'Какое-то описание.',
    createdAt: new Date('2018-02-23T15:00:00'),
    author: 'Димончик',
    photoLink: 'Photos\\Photo8.png',
  },
  {
    id: '9',
    description: 'Это только 9-ое описание, а идей нет.',
    createdAt: new Date('2018-09-23T23:00:00'),
    author: 'Димка',
    photoLink: 'Photos\\Photo9.png',
  },
  {
    id: '10',
    description: 'Я родился.',
    createdAt: new Date('1999-04-27T10:30:01'),
    author: 'Дмитрий Михайлович',
    photoLink: 'Photos\\Photo10.png',
  },
  {
    id: '11',
    description: 'Я побывал в 3 странах за месяц летом.',
    createdAt: new Date('2010-10-23T23:00:00'),
    author: 'Митя',
    photoLink: 'Photos\\Photo11.png',
  },
  {
    id: '12',
    description: 'Вчера вечером я был в городе.',
    createdAt: new Date('2016-02-23T13:34:00'),
    author: 'Димка',
    photoLink: 'Photos\\Photo12.png',
  },
  {
    id: '13',
    description: 'Ребята, намечается тусовка 15 марта, кто пойдет?',
    createdAt: new Date('2018-03-25T13:00:00'),
    author: 'Димка',
    photoLink: 'Photos\\Photo13.png',
  },
  {
    id: '14',
    description: 'Вчера в Минске было очень много ДТП и снега было по колено.',
    createdAt: new Date('2017-01-23T23:00:00'),
    author: 'Дима',
    photoLink: 'Photos\\Photo14.png',
  },
  {
    id: '15',
    description: 'А какие книги читали вы? Какие любимые жанры?',
    createdAt: new Date('2018-04-23T13:00:00'),
    author: 'Платон',
    photoLink: 'Photos\\Photo15.png',
  },
  {
    id: '16',
    description: 'Можно ли сделать пустое описание?',
    createdAt: new Date('2018-03-12T23:00:00'),
    author: 'Аристарх',
    photoLink: 'Photos\\Photo16.png',
  },
  {
    id: '17',
    description: 'Моя фантазия на сиходе, а брать чьи-то реальные описания долго.',
    createdAt: new Date('2013-02-01T23:00:00'),
    author: 'Михаил',
    photoLink: 'Photos\\Photo17.png',
  },
  {
    id: '18',
    description: 'У меня еще куча дел, а времени не так уж и много.',
    createdAt: new Date('2011-02-23T12:43:00'),
    author: 'Евпатий',
    photoLink: 'Photos\\Photo18.png',
  },
  {
    id: '19',
    description: 'Завтра в универ, но греет душу что в четверг выходной.',
    createdAt: new Date('2018-03-24T16:00:00'),
    author: 'Марк',
    photoLink: 'Photos\\Photo19.png',
  },
  {
    id: '20',
    description: 'Фух, вот и закончил с описаниями.',
    createdAt: new Date('1998-01-26T23:00:00'),
    author: 'Игнатий',
    photoLink: 'Photos\\Photo20.png',
  },
];


const server = (function () {
  const readPostsJSON = function () {
    let result = [];
    const reqServer = new XMLHttpRequest();
    reqServer.open('GET', '/read', false);
    reqServer.onreadystatechange = () => {
      result = JSON.parse(reqServer.responseText);
    };
    reqServer.send();

    return result;
  };

  const initialPostsJSON = function () {
    const reqServer = new XMLHttpRequest();
    reqServer.open('POST', '/write', false);
    reqServer.setRequestHeader('Content-Type', 'application/json');

    reqServer.send(JSON.stringify(initialPostsDate));
  };

  const writePostsJSON = function (posts) {
    const reqServer = new XMLHttpRequest();
    reqServer.open('POST', '/write', false);
    reqServer.setRequestHeader('Content-Type', 'application/json');

    reqServer.send(JSON.stringify(posts));
  };


  const getMaxPostID = function () {
    const posts = readPostsJSON();
    let maxID = -1;
    posts.forEach((post) => {
      if (Number(post.id) > maxID) {
        maxID = Number(post.id);
      }
    });
    return maxID;
  };

  const getPhotoPost = function (id) {
    const data = `?id=${encodeURIComponent(id)}`;

    let post;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/getPhotoPost/${data}`, false);
    xhr.onreadystatechange = () => {
      if (xhr.status === 200) {
        post = xhr.responseText;
      }
    };
    xhr.send();

    post = JSON.parse(post);
    post.createdAt = new Date(post.createdAt);
    return post;
  };

  const getPhotoPostsPromise = function (skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const data = `?skip=${encodeURIComponent(visiblePosts + skip)}&top=${encodeURIComponent(visiblePosts + top)}`;
      const body = JSON.stringify(filterConfig);

      let posts;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `/getPhotoPosts/${data}`, false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject();
        }
      };
      xhr.send(body);
    });
  };

  const getPhotoPosts = function (skip, top, filterConfig) {
    skip = skip || 0;
    top = top || 10;


    const tempFunc = async (skip, top, filterConfig) => {
      let posts;
      await getPhotoPostsPromise(skip, top, filterConfig).then((result) => {
        posts = result;
        posts = JSON.parse(posts);
        posts.forEach((post) => {
          post.createdAt = new Date(post.createdAt);
        });
        DOMmodule.showPhotoPostsFromServer(posts);
      }, error => console.log('Error'));
    };

    tempFunc(skip, top, filterConfig);
  };

  const addPhotoPostPromise = post => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/addPhotoPost/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    xhr.send(JSON.stringify(post));
  });

  const addPhotoPost = function (post) {
    let flag = true;
    addPhotoPostPromise(post).then(response => flag = true, error => flag = false);
    return flag;
  };

  const removePhotoPostPromise = function (id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/removePhotoPost/?id=${id}`, true);
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject();
        }
      };
      xhr.send();
    });
  };

  const removePhotoPost = function (id) {
    let flag = true;
    removePhotoPostPromise(id).then(response => flag = true, error => flag = false);
    return flag;
  };

  const editPhotoPostPromise = function (id, photoPost) {
    return new Promise((resolve, reject) => {
      const data = `?id=${encodeURIComponent(id)}`;
      const body = JSON.stringify(photoPost);

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `/editPhotoPost/${data}`, false);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          resolve();
        } else {
          reject();
        }
      };
      xhr.send(body);
    });
  };

  const editPhotoPost = function (id, photoPost) {
    let flag = true;
    editPhotoPostPromise(id, photoPost).then(response => flag = true, error => flag = false);
    return flag;
  };

  return {
    readPostsJSON,
    initialPostsJSON,
    writePostsJSON,
    getMaxPostID,
    getPhotoPost,
    getPhotoPosts,
    addPhotoPost,
    removePhotoPost,
    editPhotoPost,
  };
}());
