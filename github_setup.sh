#!/bin/bash

# यह स्क्रिप्ट आपके प्रोजेक्ट को एक नई GitHub रिपॉजिटरी से जोड़ने में मदद करेगी।
# इसे अपने टर्मिनल में चलाएं।

# --- महत्वपूर्ण ---
# 1. इस स्क्रिप्ट को चलाने से पहले, GitHub पर एक नई, खाली रिपॉजिटरी बनाएं।
# 2. नीचे दिए गए VARIABLE में अपनी GitHub रिपॉजिटरी का URL डालें।

# --- अपना URL यहाँ डालें ---
GITHUB_URL="https://github.com/आपका-यूजरनेम/आपकी-रिपॉजिटरी-का-नाम.git"

echo "Step 1: Git रिपॉजिटरी को इनिशियलाइज़ किया जा रहा है..."
git init -b main
echo "Git रिपॉजिटरी तैयार है।"
echo "-----------------------------------"

echo "Step 2: सभी फाइलों को स्टेज किया जा रहा है..."
# .gitignore फ़ाइल बनाई जा रही है ताकि node_modules जैसी अनावश्यक फाइलें अपलोड न हों
echo "node_modules
.next
.env.local
*.log
.DS_Store" > .gitignore
git add .
echo "सभी फाइलें जोड़ दी गई हैं।"
echo "-----------------------------------"

echo "Step 3: पहला कमिट (commit) बनाया जा रहा है..."
git commit -m "Initial commit: Local Buddy Pro App"
echo "कमिट सफलतापूर्वक बन गया है।"
echo "-----------------------------------"

echo "Step 4: रिमोट GitHub रिपॉजिटरी को जोड़ा जा रहा है..."
if [ "$GITHUB_URL" == "https://github.com/आपका-यूजरनेम/आपकी-रिपॉजिटरी-का-नाम.git" ]; then
    echo "त्रुटि: कृपया स्क्रिप्ट में GITHUB_URL को अपनी वास्तविक GitHub रिपॉजिटरी URL से बदलें।"
    exit 1
fi
git remote add origin $GITHUB_URL
echo "रिमोट रिपॉजिटरी सफलतापूर्वक जुड़ गई है।"
echo "-----------------------------------"

echo "Step 5: कोड को GitHub पर पुश किया जा रहा है..."
git push -u origin main
echo "-----------------------------------"
echo "बधाई हो! आपका कोड सफलतापूर्वक GitHub पर अपलोड हो गया है।"
echo "आपकी रिपॉजिटरी यहाँ देखें: ${GITHUB_URL%.git}"
