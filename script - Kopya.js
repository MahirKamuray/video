document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg",
        "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg"
    ];
    const heartImage = "kalp.png";
    const imagePath = "Mainpage/Others/";

    function createFallingImage(isHeart = false) {
        const img = document.createElement("img");
        img.src = imagePath + (isHeart ? heartImage : images[Math.floor(Math.random() * images.length)]);
        img.classList.add("falling-image");
        if (isHeart) img.classList.add("falling-heart");

        img.style.left = Math.random() * window.innerWidth + "px";
        img.style.top = "-10vh"; 
        img.style.setProperty("--random-x", (Math.random() * 100 - 50) + "px"); 
        img.style.animation = `fall ${6 + Math.random() * 4}s linear`;

        document.body.appendChild(img);

        setTimeout(() => {
            img.remove();
        }, 10000);
    }

    function startRain() {
        setInterval(() => {
            for (let i = 0; i < 5; i++) { 
                createFallingImage();
                if (Math.random() < 0.75) createFallingImage(true);
            }
        }, 200);
    }

    startRain();

    // 📌 Video modal işlevlerini sayfa yüklendikten sonra tanımla
    let videos = [
        "Mainpage/Videos/1.mp4",
        "Mainpage/Videos/2.mp4",
        "Mainpage/Videos/3.mp4"
    ];
    
    let currentVideoIndex = 0;
    const modal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");

    function openVideo() {
        if (!videoPlayer || !modal) {
            console.error("Hata: Video öğesi bulunamadı!");
            return;
        }

        videoPlayer.src = videos[currentVideoIndex];
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    function closeVideo() {
        if (!videoPlayer || !modal) return;

        modal.style.display = "none";
        videoPlayer.pause();
        document.body.style.overflow = "auto";
    }

    function changeVideo(direction) {
        if (!videoPlayer) return;

        currentVideoIndex = (currentVideoIndex + direction + videos.length) % videos.length;
        videoPlayer.src = videos[currentVideoIndex];
        videoPlayer.play();
    }

    document.querySelector(".bounce-button").addEventListener("click", openVideo);
    document.querySelector(".close-button").addEventListener("click", closeVideo);
    document.querySelector(".prev").addEventListener("click", () => changeVideo(-1));
    document.querySelector(".next").addEventListener("click", () => changeVideo(1));
});
