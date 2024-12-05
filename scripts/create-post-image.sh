#!/bin/bash

# Function to print usage information
print_usage() {
    echo "Usage: $0 -c 'Your caption text' [-o output.png]"
    echo "Options:"
    echo "  -c    Caption text (required)"
    echo "  -o    Output filename (optional, defaults to output.png)"
}

# Initialize variables
caption=""
output_file="output.png"

# Parse command line arguments
while getopts "c:o:h" opt; do
    case $opt in
        c)
            caption="$OPTARG"
            ;;
        o)
            output_file="$OPTARG"
            ;;
        h)
            print_usage
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            print_usage
            exit 1
            ;;
    esac
done

# Check if caption is provided
if [ -z "$caption" ]; then
    echo "Error: Caption is required"
    print_usage
    exit 1
fi

mkdir -p tmp

convert -background '#1e3fae' -size 1200x630 \
    -font "IBM-Plex-Sans-SmBld" -fill white \
    -gravity West \
    caption:"$caption" \
    -bordercolor '#1e3fae' -border 30x10 \
    "tmp/$output_file"

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "Image successfully created as '$output_file'"
else
    echo "Error: Failed to create image"
    exit 1
fi
