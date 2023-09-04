# Overleaf Image Paste for Firefox
## Description
This is a heavily modified and somewhat expanded fork of the great project [cmprmsd/Overleaf-Image-Helper](https://github.com/cmprmsd/Overleaf-Image-Helper), turned into a native Firefox addon.

## Original Description
Overleaf currently does allow you to upload images only with their upload button.

The purpose of this project is to provide a convenient way to insert images into Overleaf without menus by just using `ctrl+v`.  
I wrote this as Tampermonkey script for Chrome/Chromium and Firefox. The script will create an asset folder in your project root folder and reference images in as LaTeX figures with captions, which you can directly edit after pasting the image.


## Installation

1. Clone the project
2. ```$ yarn install```
3. ```$ yarn build```
4. Go to about:debugging -> This Firefox
5. Load the temporary addon from the manifest file in dist/
6. Reload the addon when needed

### Donate to the original project
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate?hosted_button_id=UPTPRDZGCRPJ8)