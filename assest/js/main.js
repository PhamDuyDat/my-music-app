const heading = document.querySelector("h2");
const Cdthumd = document.querySelector(".img_song img");
const audio = document.querySelector(".audio");
const cd = document.querySelector(".img_song");
const playBtn = document.querySelector(".stop_song");
const playBtt = document.querySelector(".stop_song ion-icon");
const progress = document.querySelector("#progress");
const nextBtn = document.querySelector(".next_song");
const prevBtn = document.querySelector(".reverse_song");
const randomBtn = document.querySelector(".random_song");
const repeatBtn = document.querySelector(".return_song");
const playList = document.querySelector(".play-list");
const app = {
  isPlaying: false,
  currentIndex: 0,
  isRandom: false,
  isRepeat: false,
  song: [
    {
      name: "How To Love",
      singger: "Sofia Reyes",
      path: "./assest/music/How To Love.mp3",
      image: "./assest/img/How to love.png",
    },
    {
      name: "3LAU - Touch",
      singger: "Carly Paige",
      path: "./assest/music/3LAU - Touch.mp3",
      image: "./assest/img/3LAU_touch.jpg",
    },
    {
      name: "Hero",
      singger: "Christina Perri",
      path: "./assest/music/Hero feat.mp3",
      image: "./assest/img/Hero.jpg",
    },
    {
      name: "All We Know",
      singger: "Phoebe Ryan",
      path: "./assest/music/All We Know.mp3",
      image: "./assest/img/All we know.jpg",
    },
    {
      name: "Head In The Cloud",
      singger: "Hayd",
      path: "./assest/music/Head In The Clouds.mp3",
      image: "./assest/img/Head in the clouds.jpg",
    },
    {
      name: "Jonas Blue",
      singger: "Rise ft. Jack & Jack",
      path: "./assest/music/Jonas Blue.mp3",
      image: "./assest/img/Jonas Blue.jpg",
    },
    {
      name: "The Ocean",
      singger: "Shy Martin",
      path: "./assest/music/The Ocean.mp3",
      image: "./assest/img/The Ocean.jpg",
    },
    {
      name: "Normal No More",
      singger: "TYSM ",
      path: "./assest/music/Normal No More.mp3",
      image: "./assest/img/Normal No more.jpg",
    },
    {
      name: "Way Back Home",
      singger: "SHAUN",
      path: "./assest/music/Way Back Home.mp3",
      image: "./assest/img/Way Back Home.jpg",
    },
    {
      name: "Something Just Like This",
      singger: "The Chainsmoker",
      path: "./assest/music/Some Thing Just Like This.mp3",
      image: "./assest/img/Some Thing Just Like This.jpg",
    },
    {
      name: "So Far Away",
      singger: "Martin Garrix & David Guetta",
      path: "./assest/music/So Far Away.mp3",
      image: "./assest/img/So Far Away.jpg",
    },
    {
      name: "On My Way",
      singger: "The Chainsmoker",
      path: "./assest/music/On My Way.mp3",
      image: "./assest/img/On My Way.jpg",
    },
    {
      name: "Nevada",
      singger: "The Chainsmoker",
      path: "./assest/music/Nevada.mp3",
      image: "./assest/img/Nevada.jpg",
    },
  ],

  // th??m b??i h??t
  render: function () {
    const html = this.song.map((songs, index) => {
      return `
      <div class="song ${
        index === this.currentIndex ? "active" : " "
      }" data-index="${index}"> <div class="img-option">
          <img src="${songs.image}" alt="" />
        </div>
        <div class="name_song">
          <h3>${songs.name}</h3>
          <h4>${songs.singger}</h4>
        </div>
      </div>
      </div>
      `;
    });
    playList.innerHTML = html.join(" ");
  },

  // ?????nh ngh??a thu???c t??nh
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.song[this.currentIndex];
      },
    });
  },

  // k??o th??? gi???m CD
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    // l???y k??ch th?????c CD

    // x??? l?? CD quay
    const cdThumbAnimate = Cdthumd.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // x??? l?? phongd to thu nh??? CD
    document.onscroll = function () {
      const scrollTop = Window.scrollY || document.documentElement.scrollTop;

      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.height = newCdWidth > 0 ? newCdWidth + "px" : 0;
    };

    //X??? l?? n??t play pause

    playBtn.onclick = function () {
      app.isPlaying = !app.isPlaying;
      if (app.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    };

    // khi song ??c play
    audio.onplay = function () {
      app.isPlaying = true;
      playBtt.name = "pause";
      cdThumbAnimate.play();
    };
    // khi song ??c pause
    audio.onpause = function () {
      app.isPlaying = false;
      playBtt.name = "play";
      cdThumbAnimate.pause();
    };

    // khi ti???n ????? thay ?????i
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // x??? l?? khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // khi next song
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };

    // khi perv song
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };

    // x??? l?? b???t t???t ramdom song

    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("change", app.isRandom);
    };

    // x??? l?? l???p l???i 1 song
    repeatBtn.onclick = function (e) {
      app.isRepeat = !app.isRepeat;
      repeatBtn.classList.toggle("change", app.isRepeat);
    };

    // x??? l?? next song khi audio ended
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // l???ng nghe ??nh vi khi click v??o playList
    playList.onclick = function (e) {
      const songNote = e.target.closest(".song:not(.active");
      // x??? l?? khi click v??o song
      if (songNote) {
        app.currentIndex = Number(songNote.dataset.index);
        app.loadCurrentSong();
        audio.play();
        app.render();
      }
    };
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.song.length);
    } while (newIndex == this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    Cdthumd.src = this.currentSong.image;
    audio.src = this.currentSong.path;
    // console.log(heading, Cdthumd, audio);
  },
  //Hello
  // next b??i
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.song.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // Prev b??i
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.song.length - 1;
    }
    this.loadCurrentSong();
  },

  start: function () {
    // ?????nh ngh??a c??c thu???c t??nh cho object
    this.defineProperties();

    // l???ng nghe s??? l?? c??c s??? ki???n
    this.handleEvents();

    // t???i th??ng tin b??i h??t ?????u ti??n v??o Ui khi ch???y ???ng d???ng
    this.loadCurrentSong();

    // render l???i c??c b??i h??t
    this.render();

    // this.scrollToActiveSong();
  },
};
app.start();
