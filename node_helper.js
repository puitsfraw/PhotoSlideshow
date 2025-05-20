const NodeHelper = require("node_helper");
const express = require("express");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
  start: function () {
    // Local photo directory (not USB)
    const photoDir = "/home/mote/MagicMirror/photos";
    this.photoDir = photoDir;

    // Serve images from the local photo directory at /usbphotos
    this.expressApp.use("/usbphotos", express.static(photoDir));
    console.log(`[PhotoSlideshow] Serving ${photoDir} at /usbphotos`);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "REQUEST_IMAGES") {
      try {
        const files = fs.readdirSync(this.photoDir);
        const imageFiles = files.filter(file =>
          /\.(jpg|jpeg|png|gif)$/i.test(file)
        );
        const imageUrls = imageFiles.map(file => `/usbphotos/${file}`);
        this.sendSocketNotification("IMAGES", imageUrls);
      } catch (err) {
        console.error("[PhotoSlideshow] Error reading image directory:", err);
        this.sendSocketNotification("IMAGES", []);
      }
    }
  }
});

