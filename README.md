# PhotoSlideshow
Magic Mirror Photo Slideshow

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror).

****You must create a fold name photos in your /MagicMirror folder**

## Installation

1. Clone this repository inside your MagicMirror's `modules` folder

```bash
cd ~/MagicMirror/modules
git clone https://github.com/puitsfraw/PhotoSlideshow
cd PhotoSlideshow
npm install
```

2. Create photos folder in your /MagicMirror folder

Open Terminal on your Raspberry Pi.

Navigate to the MagicMirror folder (usually in your home directory):

cd ~/MagicMirror

mkdir photos

Navigate to file folder and add photos to album

## Config

{
  module: "PhotoSlideshow", 
  position: "top_center", // Aligns at the top of the screen
  config: {
    imagePath: "/home/(your magic mirror name)/MagicMirror/photos",
    slideInterval: 60000,              // Change photo every 60 seconds
    width: "1080px",                   // Width constraint (optional)
    height: "900px",                   // Max height of the image
    backgroundBlur: true              // Custom flag to enable blurred background (used in your JS/CSS logic)
  }
},

```
