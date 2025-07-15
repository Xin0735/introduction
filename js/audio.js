// 音乐播放器功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const volumeSlider = document.getElementById('volumeSlider');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const toggleLyricsBtn = document.getElementById('toggleLyrics');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const audioSource = document.getElementById('audioSource');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const coverImage = document.getElementById('coverImage');
    const albumCover = document.getElementById('albumCover');

    // 歌曲列表
    const songs = [
        {
            id: '1',
            title: '相见恨晚',
            artist: '彭佳慧',
            cover: 'https://p1.music.126.net/jW0CyklPo0eE-CAPi5_zdA==/109951167500678796.jpg?param=300x300',
            url: 'https://music.163.com/song/media/outer/url?id=1412958458.mp3',
            lyrics: [
                "你有一张好陌生的脸",
                "到今天才看见",
                "有点心酸在我们之间",
                "如此短暂的情缘",
                "看着天空不让泪流下",
                "不说一句埋怨",
            ]
        },
        {
            id: '2',
            title: '天真的橡皮',
            artist: 'DJ',
            cover: 'https://p1.music.126.net/E22EMm9DvMbcKKWa3Z4LSA==/109951170955243581.jpg?param=300x300',
            url: 'https://music.163.com/song/media/outer/url?id=2701986913.mp3',
            lyrics: [
                "词：王小帅",
                "人生呐 能不能放过我这一次",
                "下辈子我只想做个 不会长大的孩子",
                "有人取暖有人依靠 不会有太多心事",
                "用最天真的橡皮",
                "就能擦去生活的争执",
            ]
        },
        {
            id: '3',
            title: '起风了',
            artist: '买辣椒也用券',
            cover: 'https://p2.music.126.net/LpFu9pWQ3tzldjhkLwh4Vw==/109951165291444752.jpg?param=300x300',
            url: 'https://music.163.com/song/media/outer/url?id=1475596788.mp3',
            lyrics: [
                "起风了",
                "演唱：买辣椒也用券",
                "这一路上走走停停",
                "顺着少年漂流的痕迹",
                "迈出车站的前一刻",
                "竟有些犹豫",
                "不禁笑这近乡情怯",
                "仍无可避免",
                "而长野的天",
                "依旧那么暖",
                "风吹起了从前",
                "从前初识这世间",
                "万般流连",
                "看着天边似在眼前",
                "也甘愿赴汤蹈火去走它一遍",
                "如今走过这世间",
                "万般流连",
                "翻过岁月不同侧脸",
                "措不及防闯进你的笑颜"
            ]
        },
        {
            id: '4',
            title: '像我这样的人',
            artist: '毛不易',
            cover: 'https://p2.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg?param=300y300',
            url: 'https://music.163.com/song/media/outer/url?id=1376142151.mp3',
            lyrics: [
                "像我这样的人",
                "演唱：毛不易",
                "像我这样优秀的人",
                "本该灿烂过一生",
                "怎么二十多年到头来",
                "还在人海里浮沉",
                "像我这样聪明的人",
                "早就告别了单纯",
                "怎么还是用了一段情",
                "去换一身伤痕",
                "像我这样迷茫的人",
                "像我这样寻找的人",
                "像我这样碌碌无为的人",
                "你还见过多少人",
                "像我这样庸俗的人",
                "从不喜欢装深沉",
                "怎么偶尔听到老歌时",
                "忽然也晃了神",
                "像我这样懦弱的人",
                "凡事都要留几分",
                "怎么曾经也会为了谁",
                "想过奋不顾身"
            ]
        },
        {
            id: '5',
            title: '罗生门',
            artist: '梨冻紧/Wiz_H张子豪',
            cover: 'https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg?param=130y130',
            url: 'https://music.163.com/song/media/outer/url?id=1413863166.mp3',
            lyrics: [
                "罗生门",
                "演唱：梨冻紧/Wiz_H张子豪",
                "生命要继续 流浪在风雨",
                "日记在更替 人生情系何地",
                "望穿整个夜 清醒到破晓时",
                "爱恨情欲中 哪个能相伴到底",
                "罗生门在谎言面前",
                "所有的犹豫都成了伪善",
                "有些秘密大概只是说给风听",
                "有些回忆只是说与泪听",
                "那些年究竟是谁带谁走过冗长的旅行",
                "我迷了路 忘了心",
                "回望过往 欲言又止"
            ]
        },
    ];

    let currentSongIndex = 0;

    // 获取歌曲列表容器
    const songListContainer = document.getElementById('songList');

    // 生成歌曲列表函数
    function generateSongList() {
        // 清空容器
        songListContainer.innerHTML = '';

        // 为每首歌创建列表项
        songs.forEach((song, index) => {
            const listItem = document.createElement('button');
            listItem.className = 'list-group-item list-group-item-action';
            if (index === currentSongIndex) {
                listItem.classList.add('active');
            }
            listItem.dataset.id = song.id;

            const content = `
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${song.title}</h5>
                <small>${song.artist}</small>
            </div>
        `;

            listItem.innerHTML = content;

            // 添加点击事件
            listItem.addEventListener('click', function() {
                currentSongIndex = index;
                loadAndPlaySong(currentSongIndex);
            });

            songListContainer.appendChild(listItem);
        });
    }

    // 加载并播放当前索引的歌曲
    function loadAndPlaySong(index) {
        const song = songs[index];

        // 确保audioSource元素存在并正确更新
        if (audioSource) {
            audioSource.src = song.url;
        } else {
            console.error('audioSource元素不存在');
            // 如果元素不存在，直接设置audio的src
            audio.src = song.url;
        }

        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        coverImage.src = song.cover;

        // 更新歌词
        lyricsContainer.innerHTML = '';
        song.lyrics.forEach(line => {
            const p = document.createElement('p');
            p.textContent = line;
            lyricsContainer.appendChild(p);
        });

        // 更新歌曲列表选中状态，使用重新生成的方式
        generateSongList();

        // 重要：确保完成音频加载和播放
        audio.load();

        // 使用Promise处理播放，避免自动播放策略问题
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // 播放成功
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                coverImage.classList.add('rotate-album');
                coverImage.classList.add('rounded-album');
            })
                .catch(error => {
                    // 播放失败（可能是浏览器自动播放策略）
                    console.error("播放失败:", error);
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                });
        }
    }

    // 初始化音量
    audio.volume = 0.5;
    volumeSlider.value = 0.5;

    // 播放/暂停切换功能
    playPauseBtn.addEventListener('click', togglePlayPause);

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            coverImage.classList.add('rotate-album');
            coverImage.classList.add('rounded-album');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            coverImage.classList.remove('rotate-album');
        }
    }

    // 音量控制
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value;
    });

    // 进度条控制
    audio.addEventListener('timeupdate', updateProgress);

    function updateProgress() {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percent + '%';
        }
    }

    progressContainer.addEventListener('click', setProgress);

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        if (duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    }

    // 上一曲/下一曲
    prevBtn.addEventListener('click', playPrevSong);
    nextBtn.addEventListener('click', playNextSong);

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadAndPlaySong(currentSongIndex);
    }

    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadAndPlaySong(currentSongIndex);
    }

    // 歌词显示/隐藏
    toggleLyricsBtn.addEventListener('click', function() {
        if (lyricsContainer.style.display === 'none' || lyricsContainer.style.display === '') {
            lyricsContainer.style.display = 'block';
            toggleLyricsBtn.innerHTML = '隐藏歌词 <i class="fas fa-chevron-up"></i>';
        } else {
            lyricsContainer.style.display = 'none';
            toggleLyricsBtn.innerHTML = '显示歌词 <i class="fas fa-chevron-down"></i>';
        }
    });

    // 歌曲结束自动播放下一首
    audio.addEventListener('ended', playNextSong);

    // 自定义函数：通过 URL 播放歌曲
    window.playMusic = function(url) {
        // 查找对应的歌曲索引
        for (let i = 0; i < songs.length; i++) {
            if (songs[i].url.includes(url)) {
                currentSongIndex = i;
                loadAndPlaySong(currentSongIndex);
                return;
            }
        }

        // 如果在列表中找不到，就只更新URL
        if (audioSource) {
            audioSource.src = url;
        } else {
            audio.src = url;
        }
        audio.load();
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.error("播放失败:", error);
        });
    };

    // 初始加载第一首歌
    loadAndPlaySong(currentSongIndex);
});