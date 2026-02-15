import os
from PIL import Image, ImageDraw, ImageFilter
import math

# Configuration
OUTPUT_DIR = "public/moon"
NUM_FRAMES = 120
WIDTH, HEIGHT = 1920, 1080
MOON_RADIUS_START = 100
MOON_RADIUS_END = 400
MOON_COLOR = (200, 180, 255) # Light violet
GLOW_COLOR = (124, 58, 237) # Violet 500

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def create_frame(frame_index):
    # Create black background with transparency
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calculate progress 0.0 to 1.0
    progress = frame_index / (NUM_FRAMES - 1)
    
    # Moon properties
    current_radius = MOON_RADIUS_START + (MOON_RADIUS_END - MOON_RADIUS_START) * progress
    center_x, center_y = WIDTH // 2, HEIGHT // 2
    
    # Base Moon Position (slight rise effect)
    rise_offset = (1 - progress) * 200
    center_y += rise_offset
    
    # Draw Glow (Simulated)
    # We draw multiple semi-transparent circles
    num_glow_layers = 10
    for i in range(num_glow_layers, 0, -1):
        glow_radius = current_radius + (i * 20 * (progress + 0.5))
        alpha = int(10 * (1 - i/num_glow_layers) * progress)
        draw.ellipse(
            (center_x - glow_radius, center_y - glow_radius, center_x + glow_radius, center_y + glow_radius),
            fill=(*GLOW_COLOR, alpha)
        )
        
    # Draw Moon
    draw.ellipse(
        (center_x - current_radius, center_y - current_radius, center_x + current_radius, center_y + current_radius),
        fill=(*MOON_COLOR, 255)
    )
    
    # Add "craters" (simple circles)
    # Rotating slightly based on progress
    craters = [
        (0.3, 0.3, 0.15),
        (-0.2, -0.4, 0.1),
        (0.5, -0.2, 0.08),
        (-0.4, 0.2, 0.2),
         (0.1, 0.6, 0.12)
    ]
    
    for cx_rel, cy_rel, cr_rel in craters:
         # Rotate
         angle = progress * 0.5 # radians
         rx = cx_rel * math.cos(angle) - cy_rel * math.sin(angle)
         ry = cx_rel * math.sin(angle) + cy_rel * math.cos(angle)
         
         cx = center_x + rx * current_radius
         cy = center_y + ry * current_radius
         cr = cr_rel * current_radius
         
         draw.ellipse(
             (cx - cr, cy - cr, cx + cr, cy + cr),
             fill=(180, 160, 240, 200) # Slightly darker
         )

    # Cloud Overlay (Simple noise simulation using circles)
    # Drifting clouds
    num_clouds = 20
    for i in range(num_clouds):
        cloud_x = (i * 200 + frame_index * 5) % (WIDTH + 400) - 200
        cloud_y = (i * 137) % HEIGHT
        cloud_size = 100 + (i * 50) % 300
        
        # Determine opacity based on index to create depth (some in front, some behind - simplified here to just overlay)
        # We only want "drifting clouds" blocking the view partially
        
        # Simple cloud blob
        img_cloud = Image.new("RGBA", (WIDTH, HEIGHT), (0,0,0,0))
        draw_cloud = ImageDraw.Draw(img_cloud)
        
        # Cloud color (dark purple/grey with low alpha)
        cloud_color = (20, 10, 40, int(50 + 50 * math.sin(i)))
        
        draw_cloud.ellipse(
             (cloud_x - cloud_size, cloud_y - cloud_size/2, cloud_x + cloud_size, cloud_y + cloud_size/2),
             fill=cloud_color
        )
        
        # Apply blur to cloud
        img_cloud = img_cloud.filter(ImageFilter.GaussianBlur(radius=20))
        
        # Composite
        img = Image.alpha_composite(img, img_cloud)
        

    # Save
    filename = f"{frame_index + 1}.webp"
    img.save(os.path.join(OUTPUT_DIR, filename), "WEBP")
    if frame_index % 10 == 0:
        print(f"Generated frame {frame_index + 1}/{NUM_FRAMES}")

ensure_dir(OUTPUT_DIR)
for i in range(NUM_FRAMES):
    create_frame(i)
print("Done!")
