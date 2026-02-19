# Profile Photo

Add your professional photo here as:

**mahdi-profile.jpg**

## Specifications:
- Square aspect ratio (1:1)
- At least 800x800px
- JPG format
- High quality (professional headshot)
- Target file size: 50-150KB

## Example optimization:
```bash
# Using ImageMagick to create square crop and optimize
convert input.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 85 mahdi-profile.jpg
```

The website will automatically use this image once you add it. If the file is missing, a placeholder with your initials (MS) will be shown instead.
