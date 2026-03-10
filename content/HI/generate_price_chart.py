import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# Try to find a font that supports CJK characters (specifically Traditional Chinese)
# Common fonts on macOS/Linux/Windows that might support it
font_names = ['Heiti TC', 'PingFang TC', 'Microsoft JhengHei', 'SimHei', 'Arial Unicode MS', 'WenQuanYi Zen Hei']
selected_font = None

for font in font_names:
    try:
        if len(fm.findfont(font)) > 0:
            selected_font = font
            break
    except:
        continue

if selected_font:
    plt.rcParams['font.family'] = selected_font
else:
    # Fallback to default, but characters might be boxes
    print("Warning: No CJK font found. Characters might not render correctly.")

# Data Preparation
# Prices are estimated based on public listings (New vs Refurbished/Used) in USD
# Categories: Microtome (切片機), Cryostat (冷凍切片機), Stainer (染色機)

products = [
    # Microtomes
    ('HistoCore BIOCUT', 10000, 18000, '切片機'), # Est based on Indiamart/Refurb
    ('HistoCore MULTICUT', 15000, 22000, '切片機'), # Est mid-range
    ('HistoCore AUTOCUT', 18000, 28000, '切片機'), # Est high-end rotary
    ('Leica RM2255', 25000, 65000, '切片機'), # Wide range due to "New" vs "Used" market prevalence

    # Cryostats
    ('Leica CM1860', 25000, 35000, '冷凍切片機'), # Est based on ~26k refurb
    ('Leica CM1950', 35000, 55000, '冷凍切片機'), # Est based on ~46k GBP new listing

    # Stainers
    ('Leica ST5010 (XL)', 40000, 60000, '染色機'), # Est workstation price
    ('HistoCore CHROMAX', 70000, 90000, '染色機'), # Newer, higher end. CV standalone is ~70k
    ('HistoCore SPECTRA ST', 88000, 110000, '染色機'), # Based on ~88k listing
]

# Separate data for plotting
names = [p[0] for p in products]
lows = [p[1] for p in products]
highs = [p[2] for p in products]
categories = [p[3] for p in products]
widths = [h - l for l, h in zip(lows, highs)]

# Color mapping for categories
colors_map = {'切片機': '#4e79a7', '冷凍切片機': '#f28e2b', '染色機': '#e15759'}
colors = [colors_map[c] for c in categories]

# Create Figure
plt.figure(figsize=(12, 8))

# Create Horizontal Bar Chart (Broken Bar style)
bars = plt.barh(names, widths, left=lows, color=colors, edgecolor='black', alpha=0.8)

# Add value labels
for bar, low, high in zip(bars, lows, highs):
    plt.text(high + 2000, bar.get_y() + bar.get_height()/2, 
             f'${low/1000:.1f}k - ${high/1000:.1f}k', 
             va='center', fontsize=10)

# Customization
plt.xlabel('預估市場價格區間 (USD)', fontsize=12)
plt.title('Leica Biosystems 產品價格區間分布圖 (估算值)', fontsize=16)
plt.grid(axis='x', linestyle='--', alpha=0.7)

# Create Legend
handles = [plt.Rectangle((0,0),1,1, color=colors_map[c]) for c in colors_map]
plt.legend(handles, colors_map.keys(), loc='lower right')

plt.tight_layout()

# Save the plot
output_path = 'HI/leica_product_price_distribution.png'
plt.savefig(output_path, dpi=300)
print(f"Chart saved to {output_path}")
