document.addEventListener("DOMContentLoaded", () => {
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden"; // Kaydırma çubuklarını tamamen kaldır

    window.addEventListener("resize", () => {
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
    });
    
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
});

let videos = [
    "Mainpage/Videos/1.mp4",
    "Mainpage/Videos/2.mp4",
    "Mainpage/Videos/3.mp4"
];

let currentVideoIndex = 0;
let modal;
let videoPlayer;

document.addEventListener("DOMContentLoaded", () => {
    modal = document.getElementById("videoModal");
    videoPlayer = document.getElementById("videoPlayer");

    // 📱 Mobil cihazlar için dokunma olayını ekleyelim
    videoPlayer.addEventListener("touchstart", () => {
        videoPlayer.play();
    });
});

function openVideo() {
    if (!videoPlayer || !modal) {
        console.error("Video elementi yüklenmedi!");
        return;
    }
    videoPlayer.src = videos[currentVideoIndex];
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // 📱 Mobilde video otomatik oynatılmıyorsa dokunma olayını tetikle
    setTimeout(() => {
        videoPlayer.play().catch(() => console.log("Otomatik oynatma engellendi!"));
    }, 500);
}

function closeVideo() {
    if (!modal || !videoPlayer) return;
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
