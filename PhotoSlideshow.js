Module.register("PhotoSlideshow", {
  defaults: {
    imagePath: "/home/mote/MagicMirror/photos", // Local directory path
    slideInterval: 60000, // Change photo every 60 seconds
    width: "1080px",
    height: "900px",
    backgroundBlur: true
  },

  start: function () {
    this.images = [];
    this.currentIndex = 0;
    this.preloadedIndex = 1;
    this.sendSocketNotification("REQUEST_IMAGES");
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "IMAGES") {
      if (payload.length === 0) {
        Log.warn("[PhotoSlideshow] No images found in directory.");
        return;
      }
      this.images = this.shuffleArray(payload);
      this.updateDom(0);
      setInterval(() => {
        this.currentIndex = this.preloadedIndex;
        this.preloadedIndex = (this.preloadedIndex + 1) % this.images.length;
        this.updateDom(1000); // Smooth transition
      }, this.config.slideInterval);
    }
  },

  shuffleArray: function (array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    wrapper.className = "photo-slideshow-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.width = this.config.width;
    wrapper.style.height = this.config.height;
    wrapper.style.margin = "0 auto";
    wrapper.style.overflow = "hidden";

    if (!this.images || this.images.length === 0) {
      wrapper.innerHTML = "No images found.";
      return wrapper;
    }

    const imageUrl = this.images[this.currentIndex] + "?t=" + new Date().getTime();
    const preloadUrl = this.images[this.preloadedIndex] + "?t=" + new Date().getTime();

    if (this.config.backgroundBlur) {
      const bgImg = document.createElement("img");
      bgImg.src = imageUrl;
      bgImg.className = "photo-background";
      bgImg.style.position = "absolute";
      bgImg.style.top = "50%";
      bgImg.style.left = "50%";
      bgImg.style.transform = "translate(-50%, -50%)";
      bgImg.style.width = "115%";
      bgImg.style.height = "auto";
      bgImg.style.objectFit = "contain";
      bgImg.style.filter = "blur(20px) brightness(0.5)";
      bgImg.style.zIndex = "0";
      wrapper.appendChild(bgImg);
    }

    const fgImg = document.createElement("img");
    fgImg.src = imageUrl;
    fgImg.className = "photo-foreground";
    fgImg.style.position = "relative";
    fgImg.style.maxWidth = "100%";
    fgImg.style.maxHeight = "100%";
    fgImg.style.objectFit = "contain";
    fgImg.style.display = "block";
    fgImg.style.margin = "auto";
    fgImg.style.top = "50%";
    fgImg.style.transform = "translateY(-50%)";
    fgImg.style.zIndex = "1";
    fgImg.style.boxShadow = "0 0 15px rgba(0,0,0,0.4)";
    fgImg.style.transition = "opacity 1s ease-in-out";
    fgImg.style.opacity = "1";

    wrapper.appendChild(fgImg);

    // Preload next image
    const preloadImg = new Image();
    preloadImg.src = preloadUrl;

    return wrapper;
  }
});
