magick convert -size 1200x630 xc:#1e3fae \
    -font "Helvetica" -pointsize 48 -fill white \
    -gravity center \
    -draw "text 0,0 'Your Text Here'" output.png
